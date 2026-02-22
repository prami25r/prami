const mask = (val: string | undefined) => {
  if (!val) return "(not set)";
  if (val.length <= 4) return "*".repeat(val.length);
  return `${val.slice(0, 2)}${"*".repeat(Math.max(0, val.length - 4))}${val.slice(-2)}`;
};

const g = globalThis as Record<string, unknown> & { __env_logged__?: boolean };
const started = g.__env_logged__;
if (!started) {
  g.__env_logged__ = true;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const contact = process.env.CONTACT_EMAIL || "pramithiravikumar@gmail.com";
  const debug =
    String(process.env.EMAIL_DEBUG).toLowerCase() === "true" ||
    process.env.NODE_ENV !== "production";
  console.info(
    "[email-env]",
    JSON.stringify(
      {
        SMTP_HOST: host ?? "(not set)",
        SMTP_PORT: port ?? "(default 587)",
        SMTP_USER: user ?? "(not set)",
        SMTP_PASS: mask(pass),
        CONTACT_EMAIL: contact,
        EMAIL_DEBUG: debug ? "on" : "off",
        NODE_ENV: process.env.NODE_ENV,
      },
      null,
      2
    )
  );
  if (host?.includes("gmail.com") || user?.includes("gmail.com")) {
    console.warn(
      "[email-env] Using Gmail SMTP. Ensure App Password is configured if 2FA is enabled."
    );
  }
}

