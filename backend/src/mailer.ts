import nodemailer from "nodemailer";

function fromEnv() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function getTransport() {
  const t = fromEnv();
  if (t) return t;
  try {
    const account = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
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
  const url = nodemailer.getTestMessageUrl(info);
  if (url) {
    console.log("Preview email:", url);
  }
  return info;
}
