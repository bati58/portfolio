import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  checkRateLimit,
  contactSchema,
  EmailConfigurationError,
  EmailNotConfiguredError,
  EmailProviderError,
  sendContactNotification,
} from "@/lib/contact";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ accepted: true }, { status: 202 });

  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "Contact service is not configured yet." }, { status: 503 });

  const message = {
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  };
  let saved;
  try {
    saved = await prisma.contactMessage.create({ data: message });
  } catch {
    return NextResponse.json({ error: "We could not save your message. Please try again." }, { status: 503 });
  }

  try {
    await sendContactNotification(message);
    await prisma.contactMessage.update({ where: { id: saved.id }, data: { notificationStatus: "delivered", deliveredAt: new Date(), deliveryAttempts: { increment: 1 } } });
    return NextResponse.json({ accepted: true, notification: "delivered" }, { status: 201 });
  } catch (error) {
    const emailNotConfigured = error instanceof EmailNotConfiguredError;
    const emailConfigurationError = error instanceof EmailConfigurationError;
    await prisma.contactMessage.update({
      where: { id: saved.id },
      data: {
        notificationStatus: emailNotConfigured || emailConfigurationError ? "pending" : "failed",
        deliveryAttempts: { increment: 1 },
        lastDeliveryError: emailNotConfigured
          ? "Email provider is not configured."
          : emailConfigurationError
            ? "Email provider configuration is incomplete."
            : "Notification provider unavailable.",
      },
    });
    const message = emailNotConfigured || emailConfigurationError
      ? "Your message was saved, but email notifications are not configured yet. It has not been lost."
      : error instanceof EmailProviderError
        ? "Your message was saved, but the email provider rejected the notification. Please verify the sender configuration."
        : "Your message was saved, but email notification is pending. It has not been lost.";
    return NextResponse.json({ accepted: true, notification: "pending", message }, { status: 202 });
  }
}
