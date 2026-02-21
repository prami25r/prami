import Hero from "@/frontend/components/Hero";
import About from "@/frontend/components/About";
import Skills from "@/frontend/components/Skills";
import Projects from "@/frontend/components/Projects";
import Contact from "@/frontend/components/Contact";
import Resume from "@/frontend/components/Resume";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </>
  );
}
