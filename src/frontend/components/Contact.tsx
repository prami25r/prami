"use client";

import { useState } from "react";

type State = { status: "idle" | "submitting" | "success" | "error"; message?: string };

export default function Contact() {
  const [state, setState] = useState<State>({ status: "idle" });

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

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold text-black">Contact</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-2xl">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm text-black">Name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            className="rounded border border-gray-300 px-3 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Your name"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm text-black">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded border border-gray-300 px-3 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="message" className="text-sm text-black">Message</label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            className="rounded border border-gray-300 px-3 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="How can I help?"
          />
        </div>
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="inline-flex w-fit items-center rounded border border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending…" : "Send message"}
        </button>
        {state.status === "success" ? (
          <p className="text-green-700">{state.message}</p>
        ) : null}
        {state.status === "error" ? (
          <p className="text-red-700">{state.message}</p>
        ) : null}
      </form>
    </section>
  );
}
