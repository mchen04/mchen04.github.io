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
    image: "/images/blog/journey.jpg"
  },
  {
    title: "Building Modern Web Applications",
    date: "March 1, 2024",
    excerpt: "A deep dive into the latest technologies and best practices...",
    image: "/images/blog/web-apps.jpg"
  },
  {
    title: "The Future of AI",
    date: "February 15, 2024",
    excerpt: "Exploring the possibilities and challenges of artificial intelligence...",
    image: "/images/blog/ai-future.jpg"
  },
  {
    title: "Mastering Data Structures",
    date: "February 1, 2024",
    excerpt: "A comprehensive guide to understanding and implementing data structures...",
    image: "/images/blog/data-structures.jpg"
  },
  {
    title: "The Power of Open Source",
    date: "January 15, 2024",
    excerpt: "How contributing to open source projects shaped my development journey...",
    image: "/images/blog/open-source.jpg"
  }
];
