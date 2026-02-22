import { NextResponse } from "next/server";
import { contactSchema } from "@/backend/validators";
import "@/backend/initEnv";
import { sendContactEmail } from "@/backend/mailer";

function tooFast(startedAt?: number) {
  if (!startedAt) return false;
  const now = Date.now();
  return now - startedAt < 1500;
}

const lastByIp = new Map<string, number>();
function tooFrequent(ip: string) {
  const now = Date.now();
  const last = lastByIp.get(ip) ?? 0;
  if (now - last < 30000) {
    return true;
  }
  lastByIp.set(ip, now);
  return false;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const isObj = (v: unknown): v is Record<string, unknown> =>
      v !== null && typeof v === "object";
    if (
      isObj(body) &&
      typeof body.website === "string" &&
      body.website.trim().length > 0
    ) {
      return NextResponse.json({ success: true });
    }
    const result = contactSchema.safeParse(body as unknown);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }
    const { startedAt } = result.data as { startedAt?: number };
    let { name, email, message } = result.data as {
      name: string;
      email: string;
      message: string;
    };
    name = name.trim().slice(0, 100);
    email = email.trim();
    message = message.trim();

    if (tooFast(startedAt)) {
      return NextResponse.json({ success: true });
    }
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "local";
    if (tooFrequent(ip)) {
      return NextResponse.json({ success: true });
    }

    const to = process.env.CONTACT_EMAIL || "pramithiravikumar@gmail.com";
    const from = process.env.SMTP_USER || "pramithiravikumar@gmail.com";
    await sendContactEmail({
      to,
      from,
      replyTo: email,
      name,
      message,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    const e = error as { code?: string; cause?: { code?: string } };
    const code = e?.code || e?.cause?.code;
    if (code === "EAUTH") {
      return NextResponse.json(
        { error: "Email authentication failed. Please contact the site owner." },
        { status: 502 }
      );
    }
    if (code === "ECONNECTION" || code === "ETIMEDOUT") {
      return NextResponse.json(
        { error: "Email service unavailable. Please try again later." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
