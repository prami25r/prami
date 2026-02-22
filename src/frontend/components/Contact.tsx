"use client";

import { useEffect, useState } from "react";

type State = { status: "idle" | "submitting" | "success" | "error"; message?: string };

export default function Contact() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
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
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
      <h2>Contact</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-2xl">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm">Name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            className="rounded-[14px] border border-[var(--border)] px-3 py-2 bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-white transition"
            placeholder="Your name"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-[14px] border border-[var(--border)] px-3 py-2 bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-white transition"
            placeholder="you@example.com"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="message" className="text-sm">Message</label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            className="rounded-[14px] border border-[var(--border)] px-3 py-2 bg-[var(--bg-card)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-white transition"
            placeholder="How can I help?"
          />
        </div>
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="inline-flex w-fit items-center btn-primary px-5 py-2.5 disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending…" : "Send message"}
        </button>
        {state.status === "success" ? (
          <p className="text-[#cfcfcf]">{state.message}</p>
        ) : null}
        {state.status === "error" ? (
          <p className="text-[#cfcfcf]">{state.message}</p>
        ) : null}
      </form>
    </section>
  );
}
