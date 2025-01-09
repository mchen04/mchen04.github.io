export interface ContactInfo {
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export const contactInfo: ContactInfo = {
  email: "michaelluochen1@gmail.com",
  social: {
    github: "https://github.com/mchen04",
    linkedin: "https://www.linkedin.com/in/michael-luo-chen/",
    twitter: "https://twitter.com"
  }
};
