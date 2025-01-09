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
    image: "/images/projects/ai-chat.jpg",
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    tags: ["Next.js", "Stripe", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/images/projects/ecommerce.jpg",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern technologies",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/images/projects/portfolio.jpg",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application",
    tags: ["React", "Firebase", "Material-UI"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/images/projects/task-manager.jpg",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather monitoring dashboard",
    tags: ["React", "OpenWeather API", "Charts.js"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/images/projects/weather.jpg",
  },
];
