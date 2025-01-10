export interface ResumeData {
  title: string;
  description: string;
  buttonText: string;
  filePath: string;
  toastTitle: string;
  toastDescription: string;
}

export const resumeData: ResumeData = {
  title: "My Resume",
  description: "Download my resume to learn more about my education, experience, and skills.",
  buttonText: "View resume",
  filePath: "/images/documents/Michael_Chen_resume.pdf", // Path to resume file in public directory
  toastTitle: "Download Started",
  toastDescription: "Your resume download will begin shortly."
};
