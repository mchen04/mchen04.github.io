import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Awards } from "@/components/Awards";
import { Resume } from "@/components/Resume";
import Certifications from "@/components/Certifications";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Hero />
        <Projects />
        <Skills />
        <Awards />
        <Certifications />
        <Resume />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
