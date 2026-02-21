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
    <section
      id="skills"
      className="max-w-5xl mx-auto px-6 py-16 border-b border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-black">Skills</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {groups.map((g) => (
          <div
            key={g.title}
            className="rounded border border-gray-200 p-4 bg-white"
          >
            <h3 className="font-medium text-black">{g.title}</h3>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
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
