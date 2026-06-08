"use client";

import { useState } from "react";

type Note = { text: string; color: string } | null;

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState<Note>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/admin@lanceflows.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.success === "true" || data.success === true)) {
        throw new Error(data.message || "Submission failed");
      }
      setNote({ text: "Thanks! We'll be in touch soon. ✓", color: "var(--brand)" });
      form.reset();
    } catch (err) {
      console.error("Contact form / FormSubmit error:", (err as Error).message);
      setNote({
        text: "Sorry — something went wrong. Please email admin@lanceflows.com directly.",
        color: "#c0455f",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="contact-form" noValidate onSubmit={onSubmit}>
      {/* FormSubmit config */}
      <input type="hidden" name="_subject" value="New contact — Lanceflows website" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {/* honeypot: bots fill this, humans never see it */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
      />
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="msg">Message</label>
        <textarea id="msg" name="message" rows={4} placeholder="How can we help?" required></textarea>
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </button>
      {note && (
        <p style={{ marginTop: 12, fontWeight: 600, color: note.color }}>{note.text}</p>
      )}
    </form>
  );
}
