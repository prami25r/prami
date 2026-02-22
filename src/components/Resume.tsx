export default function Resume() {
  return (
    <section id="resume" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Resume</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <div className="space-y-4">
            <div className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-medium">Senior Full-Stack Engineer</h4>
              <p className="text-gray-600">Company Name • 2022 - Present</p>
              <p className="text-gray-600 mt-2">
                Led development of scalable microservices architecture,
                implemented CI/CD pipelines, and mentored junior developers.
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-medium">Full-Stack Developer</h4>
              <p className="text-gray-600">Company Name • 2020 - 2022</p>
              <p className="text-gray-600 mt-2">
                Built and maintained multiple client projects using React,
                Node.js, and PostgreSQL.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          <div className="border-l-2 border-gray-200 pl-4">
            <h4 className="font-medium">Bachelor's in Computer Science</h4>
            <p className="text-gray-600">University Name • 2016 - 2020</p>
          </div>
        </div>
      </div>
    </section>
  );
}
