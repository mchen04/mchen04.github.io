import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CardGrid from "./ui/card-grid";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "PHiLIP",
      description: "Developed an AI-powered suite for text-to-image generation, iterative refinement, and style enhancements. Won AMD Pervasive AI University Contest and showcased live at AMD Advancing AI Event.",
      tags: ["Python", "Flask", "PyTorch", "Stable Diffusion", "React", "Node.js", "TypeScript", "AMD Cloud"],
      image: "../images/projects/philip.jpg",
      projectPage: "https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-b90133",
      demo: "https://www.youtube.com/embed/lK-Dw5Fcrds?vq=hd1080"
    },
    {
      title: "News Genie",
      description: "AI-powered news aggregator with personalized recommendations, summaries, and anti-hallucination mechanisms.",
      tags: ["React.js", "Next.js", "Python", "Flask", "Firebase", "Gemini API", "MongoDB", "MERN Stack"],
      image: "../images/projects/news-genie.jpg",
      github: "https://github.com/mchen04/News-Genie",
      demo: "https://www.youtube.com/embed/oCNbbrOpNEU?vq=hd1080"
    },
    {
      title: "FreqCreator",
      description: "Automated tool for generating social media content with AI-driven customization.",
      tags: ["Python", "PIL", "MoviePy", "OpenAI API", "Google Drive API"],
      github: "https://github.com/mchen04/FreqCreator",
      demo: "https://www.youtube.com/embed/GWTLKKbYzwc?vq=hd1080",
      image: "../images/projects/freqcreator.jpg"
    },
    {
      title: "Cutify Web",
      description: "Chrome extension for immersive website themes and animations.",
      tags: ["JavaScript", "CSS", "HTML"],
      github: "https://github.com/mchen04/Cutify-Web",
      image: "../images/projects/cutify-web.jpg"
    },
    {
      title: "Carbon Emissions Map",
      description: "Interactive map visualizing state-level carbon emissions in the US, offering detailed policy data. Won the Sustainability Award at CutieHack.",
      tags: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/mchen04/Carbon-Emmisions-Map",
      demo: "https://www.youtube.com/embed/osbiSP4x4OE?vq=hd1080",
      image: "../images/projects/carbon-emissions.jpg"
    },
    {
      title: "MafWay",
      description: "Web app for handwritten math recognition with 98% accuracy.",
      tags: ["Python", "TensorFlow", "Next.js", "React", "Tailwind", "Data Preprocessing"],
      github: "https://github.com/mchen04/MafWay",
      demo: "https://www.youtube.com/embed/1EdeTjw41lw?vq=hd1080",
      image: "../images/projects/mafway.jpg"
    },
    {
      title: "Modded Word Hunt",
      description: "Enhanced Word Hunt game with customizable grids, power-ups, and advanced scoring mechanics.",
      tags: ["C++", "CMake", "SFML", "Google Test", "Valgrind"],
      github: "https://github.com/mchen04/CS100-Final-Project-Modified-Word-Hunt",
      demo: "https://www.youtube.com/embed/1WyHNnWpu44?vq=hd1080",
      image: "../images/projects/word-hunt.jpg"
    },
    {
      title: "PDF Scraper",
      description: "Python script to extract course details from UCR's catalog PDFs.",
      tags: ["Python", "PyPDF2"],
      github: "https://github.com/mchen04/Scraping-PDF-UCR-Catalog",
      demo: "https://www.youtube.com/embed/yrY0VnYN7BE?vq=hd1080",
      image: "../images/projects/pdf-scraper.jpg"
    }
  ];

  const renderProject = (project: any) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {project.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.github && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          )}
          {project.projectPage && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open(project.projectPage, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Project Page
            </Button>
          )}
          {project.demo && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open(project.demo, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="projects">
      <CardGrid
      items={projects}
      renderItem={renderProject}
      title="Featured Projects"
      description="Explore my latest work and personal projects"
      />
    </section>
  );
};

export default Projects;
