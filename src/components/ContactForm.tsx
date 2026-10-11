"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type FormState = { status: "idle" | "loading" | "success" | "error"; message?: string };
type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "loading") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: "loading" });
    setFieldErrors({});
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) {
        if (result.fields) setFieldErrors(result.fields as FieldErrors);
        throw new Error(result.error ?? "Please review the fields marked below.");
      }
      setState({ status: "success", message: result.message ?? "Your message was saved successfully. Thank you." });
      form.reset();
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Unable to send your message." });
    }
  }
  const field = (name: FieldName) => fieldErrors[name] && <span className="field-error" id={`${name}-error`}>{fieldErrors[name]}</span>;
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-grid">
      <label>Name<input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} />{field("name")}</label>
      <label>Email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} />{field("email")}</label>
    </div>
    <label>Subject<input name="subject" required minLength={3} maxLength={160} placeholder="What would you like to build?" aria-invalid={Boolean(fieldErrors.subject)} aria-describedby={fieldErrors.subject ? "subject-error" : undefined} />{field("subject")}</label>
    <label>Message<textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Tell me a little about your project or idea." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "message-error" : undefined} />{field("message")}</label>
    <button className="button button-primary" disabled={state.status === "loading"}>{state.status === "loading" ? "Saving message..." : "Send message"}</button>
    {state.message && <p className={state.status === "error" ? "form-feedback error" : "form-feedback"} role="status">{state.message}</p>}
  </form>;
}
