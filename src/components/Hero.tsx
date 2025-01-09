import { motion } from "framer-motion";
import { heroData } from "../data/hero";

export const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.h1 
          className="text-5xl font-display font-bold mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {heroData.title}
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {heroData.description}
        </motion.p>
        <motion.a 
          href={heroData.ctaLink}
          className="inline-block bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {heroData.ctaText}
        </motion.a>
      </motion.div>
    </section>
  );
};
