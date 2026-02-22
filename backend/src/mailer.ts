import nodemailer from "nodemailer";

function fromEnv() {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT?.trim()
    ? Number(String(process.env.SMTP_PORT).trim())
    : 587;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;
  const enableDebug =
    String(process.env.EMAIL_DEBUG).toLowerCase() === "true" ||
    process.env.NODE_ENV !== "production";
  const isGmail = /gmail\.com$/i.test(host) || /gmail\.com$/i.test(user);
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    authMethod: isGmail ? "LOGIN" : undefined,
    tls: { minVersion: "TLSv1.2" },
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
    const withMeta = <T extends Error>(
      base: T,
      meta: Record<string, unknown>
    ) => Object.assign(base, meta);
    if (code === "EAUTH") {
      throw withMeta(new Error("EMAIL_AUTH_FAILED"), { code, cause: e });
    }
    if (code === "ECONNECTION" || code === "ETIMEDOUT") {
      throw withMeta(new Error("EMAIL_SERVICE_UNAVAILABLE"), {
        code,
        cause: e,
      });
    }
    throw withMeta(new Error("EMAIL_SEND_FAILED"), {
      code: code ?? "UNKNOWN",
      cause: e,
    });
  }
}
