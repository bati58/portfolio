import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasAdminToken, isAuthorizedAdmin } from "@/lib/admin";
import { getContactDeliveryError, sendContactNotification } from "@/lib/contact";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!hasAdminToken()) return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) return NextResponse.json({ error: "Message not found." }, { status: 404 });

  try {
    await sendContactNotification({
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
    });

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        notificationStatus: "delivered",
        deliveredAt: new Date(),
        lastDeliveryError: null,
        deliveryAttempts: { increment: 1 },
      },
    });

    return NextResponse.json({ ok: true, message: { id: updated.id, notificationStatus: updated.notificationStatus } });
  } catch (error) {
    await prisma.contactMessage.update({
      where: { id },
      data: {
        notificationStatus: "failed",
        deliveryAttempts: { increment: 1 },
        lastDeliveryError: getContactDeliveryError(error),
      },
    });
    return NextResponse.json({ error: "Retry failed." }, { status: 502 });
  }
}
