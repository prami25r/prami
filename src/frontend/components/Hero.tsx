import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 border-b border-gray-200">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-black">
        Pramithi
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed">
        Full‑stack engineer with AI/ML, SaaS, backend infrastructure, database,
        and distributed systems expertise.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="https://drive.google.com/file/d/1l00XRJfQfI0q4d_vzPrISNT8hnaVNjHh/view?usp=sharing"
          className="inline-flex items-center rounded border border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black transition"
        >
          Resume
        </Link>
        <Link
          href="https://www.linkedin.com/in/pramithi-r-3b0b47211/"
          className="inline-flex items-center rounded border border-gray-400 px-4 py-2 text-black hover:bg-gray-100 transition"
        >
          LinkedIn
        </Link>
        <Link
          href="https://github.com/prami25r"
          className="inline-flex items-center rounded border border-gray-400 px-4 py-2 text-black hover:bg-gray-100 transition"
        >
          GitHub
        </Link>
      </div>
    </section>
  );
}

