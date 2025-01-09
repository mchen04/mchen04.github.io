import { motion } from "framer-motion";
import { skills } from "../data/skills";

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-muted">
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
            Skills & Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
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
                className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <skill.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-bold">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <motion.span
                      key={item}
                      className="px-3 py-1 bg-secondary rounded-full text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
