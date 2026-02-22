import { NextResponse } from "next/server";
import { contactSchema } from "@/validators";
import { sendContactEmail } from "@/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }

    const { name, email, message } = result.data;

    await sendContactEmail({
      to: process.env.CONTACT_EMAIL || "pramithi@example.com",
      from: process.env.SMTP_USER || "noreply@example.com",
      replyTo: email,
      name,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
