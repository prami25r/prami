import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

vi.mock("@/backend/mailer", async () => {
  return {
    sendContactEmail: vi.fn().mockResolvedValue({ messageId: "test" }),
  };
});

describe("contact route", () => {
  beforeEach(() => {
    delete process.env.CONTACT_EMAIL;
    process.env.SMTP_USER = "pramithiravikumar@gmail.com";
  });

  it("calls sendContactEmail with the correct to address", async () => {
    const { POST } = await import("../../../frontend/api/route");
    const { sendContactEmail } = await import("@/backend/mailer");
    const payload = {
      name: "Alice",
      email: "alice@example.com",
      message: "Hello from test",
    };
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const res = await POST(req as unknown as Request);
    expect(res.ok).toBe(true);
    type FirstArg = { to: string };
    const mocked = sendContactEmail as unknown as Mock;
    const firstCallArg = mocked.mock.calls[0][0] as FirstArg;
    expect(firstCallArg.to).toBe(
      "pramithiravikumar@gmail.com"
    );
  });
});
