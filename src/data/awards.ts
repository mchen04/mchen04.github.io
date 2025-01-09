export interface Award {
    id: string;
    title: string;
    date: string | { start: string; end: string };
    type: string;
    description: string;
    links?: {
      [key: string]: string;
    };
  }
  
  export const awards: Award[] = [
    {
        id: "amd-award",
        title: "AMD University Award – Advancing AI Event",
        date: "2024-10",
        type: "award",
        description: "Earned the prestigious AMD University Award, standing out among over 8,000 participants. Received a $2,500 prize and was one of only four participants selected to deliver live demonstrations of the innovative technology at the AMD Advancing AI Event.",
        links: {
          verify: "https://www.hackster.io/contests/amd2023#category-1092"
        },
      },
    {
      id: "cutiehack-sustainability-award",
      title: "CutieHack Sustainability Award",
      date: "2022-11",
      type: "award",
      description: "Awarded the Sustainability Award at CutieHack for developing the Carbon Emissions Map.",
      links: {
        project: "https://devpost.com/software/2020-us-energy-based-carbon-emissions-by-state-map"
      },
    },
    {
      id: "deans-honor-roll",
      title: "Dean's Honor Roll",
      date: { start: "2022", end: "2025" },
      type: "honor",
      description: "Recognized for academic excellence with a GPA above 3.5 during the academic years 2022-2025."
    }
  ];
  