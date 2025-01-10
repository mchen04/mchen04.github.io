import { motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { blogPosts } from "../data/blog-posts";
import { paginateItems } from "../utils/pagination";

export const Blog = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = paginateItems(blogPosts, showAll ? 1 : 0, 3);

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-display font-bold text-center mb-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          Blog
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
              }}
              className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm transition-all duration-300"
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <motion.a 
                  href={post.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Read More →
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div 
          className="flex justify-center mt-8"
          whileHover={{ scale: 1.05 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? (
              <>
                See Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                See More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
