export interface Certification {
  title: string;
  year: string;
  description: string;
  image: string;
  verifyLink: string;
}

export const certifications: Certification[] = [
  {
    title: "Example Certification",
    year: "2023",
    description: "Issued by Example Organization",
    image: "/images/certifications/example-cert.jpg",
    verifyLink: "https://example.com/verify"
  }
];
