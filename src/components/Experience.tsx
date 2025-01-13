import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CardGrid from "./ui/card-grid";

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer Intern & Part-Time",
      company: "MOBIVOLT LLC",
      location: "Livermore, CA",
      period: "6/2023 – Present",
      description: "Building applications and firmware for fuel processors and Gas Chromatographs.",
      achievements: [
        "Built WPF applications in C# for real-time control of fuel processors and Gas Chromatographs, enhancing efficiency by 65%.",
        "Developed Arduino and Python-based firmware for hardware monitoring and GUI-based data exchange, ensuring reliable communication with safety mechanisms.",
        "Designed advanced algorithms for real-time data visualization, improving accuracy by 30% and optimizing performance for extended datasets."
      ]
    },
    {
      title: "Founder/President",
      company: "AI at UCR (AIR)",
      location: "Riverside, CA",
      period: "10/2023 – Present",
      description: "Founded and leading UCR's first official AI club.",
      achievements: [
        "Founded UCR's first official AI club, expanding membership to 50+ and boosting event attendance by 45% through workshops and expert-led guest lectures that strengthened academic and professional networks.",
        "Presented workshops and directed a team to disseminate AI news and opportunities, establishing the club as a key resource for AI education and career development on campus"
      ]
    }
  ];

  const renderExperience = (experience: any) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {experience.title}
        </CardTitle>
        <p className="text-primary font-medium">{experience.company}</p>
        <p className="text-sm text-gray-500">{experience.period}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{experience.description}</p>
        <ul className="list-disc list-inside text-gray-600">
          {experience.achievements.map((achievement: string, index: number) => (
            <li key={index} className="mb-1">
              {achievement}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <CardGrid
      items={experiences}
      renderItem={renderExperience}
      title="Professional Experience"
      description="My journey in software development and research"
    />
  );
};

export default Experience;
