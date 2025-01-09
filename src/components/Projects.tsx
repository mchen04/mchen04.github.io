import { motion } from "framer-motion";
import { Github, Link, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/projects";
import { paginateItems } from "@/utils/pagination";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = paginateItems(projects, showAll ? 1 : 0, 3);

  return (
    <section id="projects" className="py-20 px-4">
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
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <motion.div
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
                <div className="w-full h-48 relative">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={`${project.image}?w=600&h=400&fit=crop&auto=format`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-secondary rounded-full text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
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