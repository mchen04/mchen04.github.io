import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <div className="flex justify-center mb-8 animate-fade-in">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src="/images/hero/hero_photo.jpg" alt="Michael Chen" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>
          <span className="inline-block px-3 py-1 text-sm text-primary bg-primary/10 rounded-full animate-fade-in">
            Welcome to My Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Hi, I'm Michael Chen
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "400ms" }}>
            Passionate developer with expertise in creating innovative, AI-driven
            web applications and dynamic software solutions.
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "600ms" }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
