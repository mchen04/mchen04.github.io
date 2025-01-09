export interface ContactInfo {
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export const contactInfo: ContactInfo = {
  email: "john@example.com",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};
