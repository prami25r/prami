type Project = {
  title: string;
  blurb: string;
  highlights: string[];
  github: string;
};

const projects: Project[] = [
  {
    title: "ML Algorithm Benchmark",
    blurb:
      "Performance comparison framework evaluating ML algorithms across datasets with benchmarking metrics and visualization.",
    highlights: ["Flask app", "Automated EDA", "Model comparison", "Feature importance", "Secure previews"],
    github: "https://github.com/prami25r/ml-algorithm-benchmark",
  },
  {
    title: "Multilingual Student Assistant",
    blurb:
      "AI‑driven assistant supporting multilingual academic queries with retrieval and contextual learning support.",
    highlights: ["FastAPI backend", "RAG pipeline", "ChromaDB", "Gemini + Ollama", "React UI"],
    github: "https://github.com/prami25r/multilingual-student-assistant",
  },
  {
    title: "Stock Market Simulator",
    blurb:
      "Interactive trading simulation with virtual portfolio management and market behavior emulation.",
    highlights: ["MERN stack", "Mock live prices", "Portfolio tracking", "JWT auth", "Responsive UI"],
    github: "https://github.com/prami25r/STOCK-MARKET-SIMULTAOR",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 scroll-mt-24">
      <h2>Featured Projects</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.title}
            className="card accent-border p-6 h-full flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
          >
            <h3 className="leading-snug">{p.title}</h3>
            <p className="mt-2 subtle leading-relaxed">{p.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <span key={h} className="pill text-xs font-medium px-3 py-1">
                  {h}
                </span>
              ))}
            </div>
            <a
              className="mt-6 inline-flex w-fit btn-primary px-5 py-2.5 self-start"
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
