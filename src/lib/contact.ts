import { z } from "zod";

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Email provider is not configured.");
    this.name = "EmailNotConfiguredError";
  }
}

export class EmailConfigurationError extends Error {
  constructor() {
    super("Email provider configuration is incomplete.");
    this.name = "EmailConfigurationError";
  }
}

export class EmailProviderError extends Error {
  readonly status: number;
  readonly providerMessage?: string;

  constructor(status: number, providerMessage?: string) {
    super(`Email provider returned ${status}.`);
    this.name = "EmailProviderError";
    this.status = status;
    this.providerMessage = providerMessage;
  }
}

function providerErrorMessage(error: EmailProviderError) {
  return error.providerMessage
    ? `Email provider rejected the notification: ${error.providerMessage}`.slice(0, 500)
    : "Email provider rejected the notification.";
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters for your name.").max(120, "Your name must be 120 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  subject: z.string().trim().min(3, "Please enter a subject with at least 3 characters.").max(160, "Your subject must be 160 characters or fewer."),
  message: z.string().trim().min(10, "Please enter at least 10 characters so I can understand your message.").max(5000, "Your message must be 5,000 characters or fewer."),
  website: z.string().max(0).optional(),
});

const windows = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const limit = Number(process.env.CONTACT_RATE_LIMIT ?? 5);
  const current = windows.get(identifier);
  if (!current || current.resetAt <= now) {
    windows.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export async function sendContactNotification(input: { name: string; email: string; subject: string; message: string }) {
  const apiKey = process.env.EMAIL_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) throw new EmailNotConfiguredError();
  if (
    from.includes("your-verified-sender@example.com") ||
    apiKey === "re_your_resend_api_key"
  ) {
    throw new EmailConfigurationError();
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `Portfolio contact: ${input.subject}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    }),
  });
  if (!response.ok) {
    let providerMessage: string | undefined;
    try {
      const body: unknown = await response.json();
      if (typeof body === "object" && body !== null && "message" in body && typeof body.message === "string") {
        providerMessage = body.message;
      }
    } catch {
      providerMessage = undefined;
    }
    console.error("Email provider rejected contact notification.", {
      status: response.status,
      message: providerMessage,
    });
    throw new EmailProviderError(response.status, providerMessage);
  }
}

export function getContactDeliveryError(error: unknown) {
  if (error instanceof EmailProviderError) return providerErrorMessage(error);
  if (error instanceof EmailConfigurationError) return "Email provider configuration is incomplete.";
  if (error instanceof EmailNotConfiguredError) return "Email provider is not configured.";
  return "Notification provider unavailable.";
}
