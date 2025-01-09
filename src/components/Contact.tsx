import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../components/ui/use-toast";
import { contactInfo } from "../data/contact";

export const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
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
            Get in Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.h3 
                className="text-xl font-bold mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Contact Information
              </motion.h3>
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.div>
                  {contactInfo.email}
                </motion.a>
                <div className="flex gap-4">
                  <motion.a
                    href={contactInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={contactInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={contactInfo.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                required
                className="bg-white/50 backdrop-blur-sm"
              />
              <Input
                type="email"
                placeholder="Your Email"
                required
                className="bg-white/50 backdrop-blur-sm"
              />
              <Textarea
                placeholder="Your Message"
                required
                className="bg-white/50 backdrop-blur-sm min-h-[120px]"
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full">
                Send Message
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
