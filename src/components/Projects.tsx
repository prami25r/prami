export default function Projects() {
  const projects = [
    {
      title: "Project One",
      description:
        "A full-stack application built with Next.js and PostgreSQL.",
      tags: ["Next.js", "PostgreSQL", "TypeScript"],
    },
    {
      title: "Project Two",
      description:
        "AI-powered analytics dashboard with real-time data processing.",
      tags: ["React", "Python", "AWS"],
    },
    {
      title: "Project Three",
      description: "E-commerce platform with microservices architecture.",
      tags: ["Node.js", "MongoDB", "Docker"],
    },
  ];

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
