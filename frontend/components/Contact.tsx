"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type State = { status: "idle" | "submitting" | "success" | "error"; message?: string };

export default function Contact() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [mounted, setMounted] = useState(false);
  const startedAtRef = useRef<number | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  useEffect(() => {
    setMounted(true);
    startedAtRef.current = Date.now();
  }, []);

  const validEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit = useMemo(() => {
    const e = errors;
    return !e.name && !e.email && !e.message;
  }, [errors]);

  function validate(form: HTMLFormElement) {
    const d = new FormData(form);
    const name = String(d.get("name") ?? "");
    const email = String(d.get("email") ?? "");
    const message = String(d.get("message") ?? "");
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!validEmail(email)) e.email = "Please enter a valid email.";
    if (message.trim().length < 10) e.message = "Please write a longer message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) {
      setState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: "", // honeypot
      startedAt: startedAtRef.current ?? Date.now(),
    };
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Failed to send");
      }
      form.reset();
      setState({ status: "success", message: "Message sent. Thank you!" });
    } catch (err: unknown) {
      const m = err instanceof Error ? err.message : "Failed to send";
      setState({ status: "error", message: m });
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 scroll-mt-24">
      <h2>Contact</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-2xl" noValidate>
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm">Name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            className="rounded-[14px] border border-[var(--border)] px-3 py-3 bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-white transition"
            placeholder="Your name"
          />
          {errors.name ? <p className="text-red-600 text-sm">{errors.name}</p> : null}
        </div>
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-[14px] border border-[var(--border)] px-3 py-3 bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-white transition"
            placeholder="you@example.com"
          />
          {errors.email ? <p className="text-red-600 text-sm">{errors.email}</p> : null}
        </div>
        <div className="grid gap-1">
          <label htmlFor="message" className="text-sm">Message</label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            className="rounded-[14px] border border-[var(--border)] px-3 py-3 bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-white transition"
            placeholder="How can I help?"
          />
          {errors.message ? <p className="text-red-600 text-sm">{errors.message}</p> : null}
        </div>
        <div aria-hidden="true" className="hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={state.status === "submitting" || !canSubmit}
          className="inline-flex w-fit items-center btn-primary px-5 py-3 disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending…" : "Send message"}
        </button>
        {state.status === "success" ? (
          <p className="text-green-600">{state.message}</p>
        ) : null}
        {state.status === "error" ? (
          <p className="text-red-600">{state.message}</p>
        ) : null}
      </form>
    </section>
  );
}
