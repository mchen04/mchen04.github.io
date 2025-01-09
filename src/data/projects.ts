export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: "AI Chat Application",
    description: "Real-time chat application powered by OpenAI's GPT-3",
    tags: ["React", "Node.js", "OpenAI"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    tags: ["Next.js", "Stripe", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern technologies",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application",
    tags: ["React", "Firebase", "Material-UI"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather monitoring dashboard",
    tags: ["React", "OpenWeather API", "Charts.js"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
];