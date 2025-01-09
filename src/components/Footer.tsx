import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { footerData } from "../data/footer";
import { contactInfo } from "../data/contact";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-primary">{footerData.name}</h3>
            <p className="text-muted-foreground mt-2">{footerData.title}</p>
          </div>
          <div className="flex gap-6">
            <a href={contactInfo.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href={contactInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={contactInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {footerData.name}. {footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
