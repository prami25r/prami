import "dotenv/config";
import { getTransport } from "@/backend/mailer";

async function main() {
  const to = process.env.CONTACT_EMAIL || "pramithiravikumar@gmail.com";
  const from = process.env.SMTP_USER || "pramithiravikumar@gmail.com";
  const transport = await getTransport();
  if (!transport) {
    console.error("No transport. Check SMTP_* env vars.");
    process.exit(1);
  }
  try {
    const info = await transport.sendMail({
      to,
      from,
      subject: "Test email",
      text: "This is a test email.",
    });
    console.log("Sent OK", { messageId: info.messageId });
  } catch (err) {
    console.error("Failed", err);
    process.exit(1);
  }
}

main();
