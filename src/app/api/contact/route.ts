import { NextResponse } from "next/server";
import { contactSchema } from "@/backend/validators";
import { tryGetPrisma } from "@/backend/db";
import { sendContactEmail } from "@/backend/mailer";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const prisma = tryGetPrisma();

    const record =
      prisma
        ? await prisma.message.create({
            data: { name, email, body: message },
          })
        : null;

    try {
      await sendContactEmail({
        to: process.env.CONTACT_TO_EMAIL ?? "pramithiravikumar@gmail.com",
        from: process.env.CONTACT_FROM_EMAIL ?? "no-reply@example.com",
        replyTo: email,
        name,
        message,
      });
      if (prisma && record) {
        await prisma.message.update({
          where: { id: record.id },
          data: { status: "SENT" },
        });
      }
    } catch (err: unknown) {
      if (prisma && record) {
        await prisma.message.update({
          where: { id: record.id },
          data: { status: "FAILED" },
        });
      }
      return NextResponse.json(
        {
          error: "Failed to send email",
          detail: err instanceof Error ? err.message : undefined,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: "Server error", detail: msg },
      { status: 500 }
    );
  }
}
