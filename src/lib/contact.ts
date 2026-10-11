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

  constructor(status: number) {
    super(`Email provider returned ${status}.`);
    this.name = "EmailProviderError";
    this.status = status;
  }
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  subject: z.string().trim().min(3, "Please add a subject.").max(160, "Subject is too long."),
  message: z.string().trim().min(10, "Please share a little more detail.").max(5000, "Message is too long."),
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
  if (!response.ok) throw new EmailProviderError(response.status);
}
