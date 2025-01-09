import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { resumeData } from "../data/resume";

export const Resume = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: resumeData.toastTitle,
      description: resumeData.toastDescription,
    });
    // Trigger download using the file path
    window.open(resumeData.filePath, '_blank');
  };

  return (
    <section id="resume" className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {resumeData.title}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {resumeData.description}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              {resumeData.buttonText} <Download className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
