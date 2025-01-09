import {
    Code2,
    Database,
    Globe,
    Layout,
    Server,
    Terminal,
    LucideIcon
  } from "lucide-react";
  
  export interface Skill {
    category: string;
    icon: LucideIcon;
    items: string[];
  }
  
  export const skills: Skill[] = [
    {
      category: "Programming Languages",
      icon: Code2,
      items: [
        "Python",
        "C/C++/C#",
        "Java",
        "GraphQL",
        "SQL",
        "JavaScript",
        "TypeScript",
        "HTML/CSS"
      ],
    },
    {
      category: "Frameworks",
      icon: Layout,
      items: [
        "Backend (Spring, Flask, Node.js)",
        "Frontend (React.js, Next.js, Tailwind CSS, WPF)",
        "ML (PyTorch, TensorFlow)",
        "Arduino",
        "SPSS Statistics"
      ],
    },
    {
      category: "Database",
      icon: Database,
      items: ["Postgres", "MongoDB", "Firebase"],
    },
    {
      category: "Machine Learning",
      icon: Terminal,
      items: [
        "Supervised & Unsupervised Learning",
        "Advanced Learning Algorithms",
        "Reinforcement Learning"
      ],
    },
    {
      category: "Technologies",
      icon: Globe,
      items: [
        "AMD cloud",
        "Git",
        "Windows",
        "Linux",
        "Docker",
        "Jupyter Notebook",
        "Microsoft Visual Studio",
        "Eclipse"
      ],
    },
  ];
  