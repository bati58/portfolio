import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

describe("contactSchema", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse({ name: "Bati Jano", email: "bati@example.com", subject: "Hello", message: "A message with enough detail.", website: "" }).success).toBe(true);
  });
  it("rejects invalid email and short content", () => {
    expect(contactSchema.safeParse({ name: "A", email: "invalid", subject: "Hi", message: "short" }).success).toBe(false);
  });
});
