export default function Skills() {
  const skills = [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "AI/ML",
  ];

  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
