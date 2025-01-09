export interface Award {
  title: string;
  year: string;
  description: string;
}

export const awards: Award[] = [
  {
    title: "Dean's List",
    year: "2023",
    description: "Achieved academic excellence with a GPA of 3.9/4.0"
  },
  {
    title: "Hackathon Winner",
    year: "2022",
    description: "First place in University Annual Hackathon"
  },
  {
    title: "Outstanding Student Award",
    year: "2022",
    description: "Recognized for exceptional contribution to computer science department"
  }
];
