import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CardGrid from "./ui/card-grid";

const Blog = () => {
  const blogPosts = [
    {
      title: "How DeepSeek V3 Makes AI Accessible for Budget-Conscious Students",
      date: "January 2, 2025",
      description: "Exploring how DeepSeek V3's innovative approach makes advanced AI tools accessible to students on a budget...",
      image: "../images/blog/deepseek.jpg",
      link: "https://medium.com/@michaelluochen1/how-deepseek-v3-makes-ai-accessible-for-budget-conscious-students-7c8b9edc683d"
    },
    {
      title: "How Bolt.new Helps Me Visualize and Brainstorm My Projects",
      date: "January 9, 2025",
      description: "Exploring how this Bolt.new's innovative approach helps with project visualization and brainstorming...",
      image: "../images/blog/bolt-new.jpg",
      link: "https://medium.com/@michaelluochen1/how-bolt-new-helps-me-visualize-and-brainstorm-my-projects-6b4a4df1733c"
    }
  ];

  const renderBlogPost = (post: any) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {post.title}
        </CardTitle>
        <p className="text-primary font-medium">{post.date}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Read More →
        </a>
      </CardContent>
    </Card>
  );

  return (
    <CardGrid
      items={blogPosts}
      renderItem={renderBlogPost}
      title="Blog"
      description="Latest thoughts and insights"
    />
  );
};

export default Blog;
