export default function Resume() {
  return (
    <section
      id="resume"
      className="max-w-5xl mx-auto px-6 py-16 border-b border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-black">Resume</h2>
      <p className="mt-4 text-gray-700">
        Concise summary of core strengths and tools.
      </p>
      <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-1">
        <li>Full‑stack development with Next.js, Node, and TypeScript</li>
        <li>AI/ML integration and evaluation for product features</li>
        <li>Backend architecture, APIs, and distributed systems fundamentals</li>
        <li>Database schema design, query optimization, and performance</li>
        <li>Production-readiness: testing, CI/CD, observability, Docker</li>
      </ul>
      <a
        className="mt-6 inline-flex rounded border border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black transition"
        href="https://drive.google.com/file/d/1l00XRJfQfI0q4d_vzPrISNT8hnaVNjHh/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download PDF
      </a>
    </section>
  );
}

