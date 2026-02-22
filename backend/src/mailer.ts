import nodemailer from "nodemailer";

function fromEnv() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const enableDebug =
    String(process.env.EMAIL_DEBUG).toLowerCase() === "true" ||
    process.env.NODE_ENV !== "production";
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    logger: enableDebug ? true : undefined,
    debug: enableDebug,
  });
}

export async function getTransport() {
  const t = fromEnv();
  if (t) return t;
  try {
    const account = await nodemailer.createTestAccount();
    const enableDebug =
      String(process.env.EMAIL_DEBUG).toLowerCase() === "true" ||
      process.env.NODE_ENV !== "production";
    const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    if (enableDebug) {
      transport.set("logger", console);
    }
    return transport;
  } catch {
    return null;
  }
}

export async function sendContactEmail(params: {
  to: string;
  from: string;
  replyTo: string;
  name: string;
  message: string;
}) {
  const transport = await getTransport();
  if (!transport) {
    throw new Error(
      "Email transport not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS or use an SMTP provider."
    );
  }
  try {
    const info = await transport.sendMail({
      to: params.to,
      from: `"Portfolio Contact" <${params.from}>`,
      replyTo: params.replyTo,
      subject: `New message from ${params.name}`,
      text: params.message,
      html: `<p><strong>Name:</strong> ${params.name}</p>
<p><strong>Email:</strong> ${params.replyTo}</p>
<p>${params.message.replace(/\n/g, "<br/>")}</p>`,
    });
    console.info("[email] messageId:", info.messageId);
    const url = nodemailer.getTestMessageUrl(info);
    if (url) {
      console.log("Preview email:", url);
    }
    return info;
  } catch (err: unknown) {
    const e = err as { code?: string; response?: unknown; command?: string };
    const code = e?.code;
    const response = e?.response;
    const command = e?.command;
    console.error("[email-error]", { code, response, command, error: e });
    throw new Error("Failed to send email. Please try again later.");
  }
}
