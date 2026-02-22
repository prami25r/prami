const payload = {
  name: "E2E Tester",
  email: "tester@example.com",
  message: "Hello from automated E2E test",
};

async function main() {
  const res = await fetch("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  console.log("status", res.status, "body", text);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

