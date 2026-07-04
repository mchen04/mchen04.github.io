import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm translate-y-0"
          : "bg-transparent -translate-y-1"
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a 
            onClick={() => scrollToSection("hero")} 
            className="text-xl font-semibold text-gray-900 transition-colors duration-300 hover:text-primary cursor-pointer"
          >
            Michael Chen
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink onClick={() => scrollToSection("hero")}>About</NavLink>
            <NavLink onClick={() => scrollToSection("projects")}>Projects</NavLink>
            <NavLink onClick={() => scrollToSection("skills")}>Skills</NavLink>
            <NavLink onClick={() => scrollToSection("experience")}>Experience</NavLink>
            <NavLink onClick={() => scrollToSection("awards")}>Awards</NavLink>
            <NavLink onClick={() => scrollToSection("certifications")}>Certifications</NavLink>
            <NavLink onClick={() => scrollToSection("blog")}>Blog</NavLink>
            <NavLink onClick={() => scrollToSection("contact")}>Contact</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
  >
    {children}
  </button>
);

export default Navigation;
