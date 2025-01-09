import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { awards } from "../data/awards";

export const Awards = () => {
  return (
    <section id="awards" className="py-20 px-4">
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
          Awards & Achievements
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
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
              className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Trophy className="w-8 h-8 text-primary mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{award.year}</p>
              <p className="text-muted-foreground">{award.description}</p>
            </motion.div>
          ))}
        </div>
        </motion.div>
      </div>
    </section>
  );
};
