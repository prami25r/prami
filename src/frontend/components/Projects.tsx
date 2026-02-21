type Project = {
  slug: string;
  title: string;
  problem: string;
  stack: string[];
  architecture: string;
  github?: string;
};

const projects: Project[] = [
  {
    slug: "ml-algorithm-benchmark",
    title: "ml-algorithm-benchmark",
    problem:
      "Scientific benchmarking of ML algorithms with visualization and performance comparisons across datasets and metrics.",
    stack: ["Python", "Pandas", "scikit-learn", "Matplotlib/Seaborn", "Jupyter"],
    architecture:
      "Data ingestion → preprocessing → model runners → metrics registry → visualization layer; reproducible runs with config.",
    github: "https://github.com/prami25r/ml-algorithm-benchmark",
  },
  {
    slug: "multilingual-student-assistant",
    title: "multilingual-student-assistant",
    problem:
      "Assistant enabling multilingual academic support: Q&A, summarization, and task help across languages.",
    stack: ["Node/TS", "Next.js", "LLM API", "Vector DB", "i18n"],
    architecture:
      "Content loader → embedding pipeline → vector search → LLM orchestration → multilingual UX with streaming responses.",
    github: "https://github.com/prami25r/multilingual-student-assistant",
  },
  {
    slug: "usage-analytics-saas",
    title: "usage-analytics-saas",
    problem:
      "Production-ready sample SaaS for product usage analytics with organizations, projects, events, and dashboards.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "tRPC/REST", "Docker"],
    architecture:
      "Multi-tenant RBAC → ingestion API → event warehouse (Postgres) → aggregation jobs → dashboards via RSC.",
    github: "https://github.com/prami25r/SQL-Portfolio-Projects",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-5xl mx-auto px-6 py-16 border-b border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-black">Projects</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="rounded border border-gray-200 bg-white p-5 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-black">{p.title}</h3>
            <p className="mt-2 text-gray-700">{p.problem}</p>
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium text-black">Stack:</span>{" "}
              {p.stack.join(" • ")}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-black">Architecture:</span>{" "}
              {p.architecture}
            </div>
            {p.github ? (
              <a
                className="mt-4 inline-flex w-fit rounded border border-gray-400 px-3 py-1.5 text-black hover:bg-gray-100"
                href={p.github}
              >
                GitHub
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
