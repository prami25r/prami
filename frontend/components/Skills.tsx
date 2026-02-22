type Group = {
  title: string;
  items: string[];
};

const groups: Group[] = [
  {
    title: "Frontend",
    items: [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Server Components",
      "SEO",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express/Next API", "REST", "gRPC", "Auth", "Caching"],
  },
  {
    title: "Data & DB",
    items: ["PostgreSQL", "Prisma", "Migrations", "Query tuning", "ETL"],
  },
  {
    title: "AI/ML",
    items: ["Python", "Pipelines", "Model serving", "Evaluation", "Vector DB"],
  },
  {
    title: "Infra & DevOps",
    items: ["Docker", "CI/CD", "Observability", "CDN", "Edge runtimes"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 scroll-mt-24">
      <h2>Skills</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {groups.map((g) => (
          <div
            key={g.title}
            className="card accent-border p-5"
          >
            <h3>{g.title}</h3>
            <ul className="mt-2 subtle space-y-1">
              {g.items.map((it) => (
                <li key={it} className="leading-6">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
