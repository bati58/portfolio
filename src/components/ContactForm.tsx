"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type FormState = { status: "idle" | "loading" | "success" | "error"; message?: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "loading") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: "loading" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Something went wrong.");
      setState({ status: "success", message: result.message ?? "Your message was saved successfully. Thank you." });
      form.reset();
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Unable to send your message." });
    }
  }
  return <form className="contact-form" onSubmit={submit} noValidate><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div><div className="form-grid"><label>Name<input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" /></label><label>Email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" /></label></div><label>Subject<input name="subject" required minLength={3} maxLength={160} placeholder="What would you like to build?" /></label><label>Message<textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Tell me a little about your project or idea." /></label><button className="button button-primary" disabled={state.status === "loading"}>{state.status === "loading" ? "Saving message..." : "Send message"}</button>{state.message && <p className={state.status === "error" ? "form-feedback error" : "form-feedback"} role="status">{state.message}</p>}</form>;
}
