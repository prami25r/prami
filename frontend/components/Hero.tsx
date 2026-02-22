import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <h1 className="tracking-tight hero-name">
        Pramithi
      </h1>
      <p className="mt-5 max-w-2xl">
        Full‑stack engineer focused on minimal, high‑performance builds. AI/ML integration,
        backend architecture, and production‑ready delivery.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="https://drive.google.com/file/d/1l00XRJfQfI0q4d_vzPrISNT8hnaVNjHh/view?usp=sharing"
          className="btn-primary px-5 py-2.5"
        >
          View Resume
        </Link>
        <Link
          href="https://www.linkedin.com/in/pramithi-r-3b0b47211/"
          className="btn-ghost px-5 py-2.5"
        >
          LinkedIn
        </Link>
        <Link
          href="https://github.com/prami25r"
          className="btn-ghost px-5 py-2.5"
        >
          GitHub
        </Link>
      </div>
    </section>
  );
}
