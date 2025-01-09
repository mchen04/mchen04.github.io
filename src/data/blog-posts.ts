export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "My Journey in Computer Science",
    date: "March 15, 2024",
    excerpt: "Reflecting on my experiences and learnings in the field of computer science...",
    image: "placeholder.svg"
  },
  {
    title: "Building Modern Web Applications",
    date: "March 1, 2024",
    excerpt: "A deep dive into the latest technologies and best practices...",
    image: "placeholder.svg"
  },
  {
    title: "The Future of AI",
    date: "February 15, 2024",
    excerpt: "Exploring the possibilities and challenges of artificial intelligence...",
    image: "placeholder.svg"
  },
  {
    title: "Mastering Data Structures",
    date: "February 1, 2024",
    excerpt: "A comprehensive guide to understanding and implementing data structures...",
    image: "placeholder.svg"
  },
  {
    title: "The Power of Open Source",
    date: "January 15, 2024",
    excerpt: "How contributing to open source projects shaped my development journey...",
    image: "placeholder.svg"
  }
];