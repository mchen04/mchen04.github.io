export interface Project {
  title: string;
  description: string;
  date: string;
  tags: string[];
  github: string;
  demo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "PHiLIP: Personalized Human-in-the-Loop Image Production",
    description: "Developed an AI-powered suite for text-to-image generation, iterative refinement, and style enhancements. Won AMD Pervasive AI University Contest and showcased live at AMD Advancing AI Event.",
    date: "June 2024",
    tags: ["Python", "Flask", "PyTorch", "Stable Diffusion", "React", "Node.js", "TypeScript", "AMD Cloud"],
    github: "https://github.com/mchen04/philip",
    demo: "https://www.youtube.com/watch?v=lK-Dw5Fcrds",
    image: "/images/projects/philip.jpg",
  },
  {
    title: "News Genie",
    description: "AI-powered news aggregator with personalized recommendations, summaries, and anti-hallucination mechanisms.",
    date: "August 2024",
    tags: ["React.js", "Next.js", "Python", "Flask", "Firebase", "Gemini API", "MongoDB", "MERN Stack"],
    github: "https://github.com/mchen04/news-genie",
    demo: "https://www.youtube.com/watch?v=oCNbbrOpNEU&t=16s",
    image: "/images/projects/news-genie.jpg",
  },
  {
    title: "FreqCreator",
    description: "Automated tool for generating social media content with AI-driven customization.",
    date: "November 2024",
    tags: ["Python", "PIL", "MoviePy", "OpenAI API", "Google Drive API"],
    github: "https://github.com/mchen04/freqcreator",
    image: "/images/projects/freqcreator.jpg",
  },
  {
    title: "Cutify Web",
    description: "Chrome extension for immersive website themes and animations.",
    date: "December 2024",
    tags: ["JavaScript", "CSS", "HTML"],
    github: "https://github.com/mchen04/cutify-web",
    image: "/images/projects/cutify-web.jpg",
  },
  {
    title: "Carbon Emissions Map",
    description: "Interactive map visualizing state-level carbon emissions in the US, offering detailed policy data. Won the Sustainability Award at CutieHack.",
    date: "November 2022",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/mchen04/carbon-emissions-map",
    demo: "https://www.youtube.com/watch?v=osbiSP4x4OE",
    image: "/images/projects/carbon-emissions.jpg",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing skills and achievements.",
    date: "November 2024",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mchen04/portfolio-website",
    demo: "https://demo.com",
    image: "/images/projects/portfolio.jpg",
  },
  {
    title: "MafWay",
    description: "Web app for handwritten math recognition with 98% accuracy.",
    date: "May 2023",
    tags: ["Python", "TensorFlow", "Next.js", "React", "Tailwind", "Data Preprocessing"],
    github: "https://github.com/mchen04/mafway",
    demo: "https://demo.com",
    image: "/images/projects/mafway.jpg",
  },
  {
    title: "Modded Word Hunt",
    description: "Enhanced Word Hunt game with customizable grids, power-ups, and advanced scoring mechanics.",
    date: "June 2023",
    tags: ["C++", "CMake", "SFML", "Google Test", "Valgrind"],
    github: "https://github.com/mchen04/modded-word-hunt",
    demo: "https://demo.com",
    image: "/images/projects/word-hunt.jpg",
  },
  {
    title: "PDF Scraper",
    description: "Python script to extract course details from UCR's catalog PDFs.",
    date: "January 2023",
    tags: ["Python", "PyPDF2"],
    github: "https://github.com/mchen04/pdf-scraper",
    demo: "https://demo.com",
    image: "/images/projects/pdf-scraper.jpg",
  },
];
