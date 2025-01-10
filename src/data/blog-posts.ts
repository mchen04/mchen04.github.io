export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  verifyLink: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "How DeepSeek V3 Makes AI Accessible for Budget-Conscious Students",
    date: "January 2, 2025",
    excerpt: "Exploring how DeepSeek V3's innovative approach makes advanced AI tools accessible to students on a budget...",
    image: "/images/blog/deepseek.jpg",
    verifyLink: "https://medium.com/@michaelluochen1/how-deepseek-v3-makes-ai-accessible-for-budget-conscious-students-7c8b9edc683d"
  },
  {
    title: "How Bolt.new Helps Me Visualize and Brainstorm My Projects",
    date: "January 9, 2025",
    excerpt: "Exploring how this Bolt.new's innovative approach helps with project visualization and brainstorming...",
    image: "/images/blog/bolt-new.jpg",
    verifyLink: "https://medium.com/@michaelluochen1/how-bolt-new-helps-me-visualize-and-brainstorm-my-projects-6b4a4df1733c"
  }
];
