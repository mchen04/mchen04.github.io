import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Github, Linkedin, Mail } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container px-6">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Contact Information: michaelluochen1@gmail.com
          </p>
          <div className="flex justify-center gap-6 mb-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <a
              href="https://github.com/mchen04"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Github className="h-6 w-6 text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/michael-luo-chen"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
            <a
              href="mailto:michaelluochen1@gmail.com"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 animate-fade-in"
              style={{ animationDelay: "500ms" }}
            >
              <Mail className="h-6 w-6 text-primary" />
            </a>
          </div>
        </div>
        <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "600ms" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-up" style={{ animationDelay: "700ms" }}>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="transition-all duration-300 hover:border-primary focus:border-primary"
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "800ms" }}>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="transition-all duration-300 hover:border-primary focus:border-primary"
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "900ms" }}>
              <textarea
                className="w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline transition-all duration-300 hover:border-primary focus:border-primary"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full animate-fade-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: "1000ms" }}
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
