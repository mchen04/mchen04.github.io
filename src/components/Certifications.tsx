import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { certifications } from "../data/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4">
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
          Certifications
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((certification, index) => (
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
              <div className="mb-4">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={certification.image}
                    alt={certification.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
              </div>
              <h3 className="text-xl font-semibold mb-2">{certification.title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{certification.year}</p>
              <p className="text-muted-foreground mb-4">{certification.description}</p>
              <motion.a
                href={certification.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link className="w-5 h-5" />
              </motion.a>
            </motion.div>
          ))}
        </div>
        </motion.div>
      </div>
    </section>
  );
}
