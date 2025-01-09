import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { headerData } from "../data/header";

export const Header = () => {
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link to="/" className="text-xl font-bold text-primary">
              {headerData.name}
            </Link>
          </motion.div>
          <div className="flex items-center gap-6">
            {headerData.navigation.map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                onClick={(e) => handleSectionClick(e, section)}
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
