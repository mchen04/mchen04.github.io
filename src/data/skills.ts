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
    category: "Frontend Development",
    icon: Layout,
    items: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    icon: Server,
    items: ["Node.js", "Python", "Java"],
  },
  {
    category: "Database",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "Redis"],
  },
  {
    category: "DevOps",
    icon: Terminal,
    items: ["Docker", "AWS", "CI/CD"],
  },
  {
    category: "Programming Languages",
    icon: Code2,
    items: ["JavaScript", "Python", "Java", "C++"],
  },
  {
    category: "Other",
    icon: Globe,
    items: ["Git", "REST APIs", "GraphQL"],
  },
];
