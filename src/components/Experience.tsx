import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CardGrid from "./ui/card-grid";

const Experience = () => {
  const experiences = [
    {
      company: "MOBIVOLT LLC",
      position: "Software Engineer Intern & Part-Time",
      location: "Livermore, CA",
      duration: "6/2023 – Present",
      description: [
        "Developed WPF/C# apps for real-time control of fuel processors and GCs, improving efficiency by 65%",
        "Created Arduino/Python firmware for hardware monitoring with safety mechanisms",
        "Designed advanced data processing algorithms improving accuracy by 30%"
      ]
    },
    {
      company: "AI at UCR (AIR)",
      position: "Founder/President",
      location: "Riverside, CA",
      duration: "10/2023 – Present",
      description: [
        "Founded UCR's first AI club, growing membership to 50+ with 45% attendance increase",
        "Organized workshops and lectures to promote AI education and career development"
      ]
    }
  ];

  const renderExperience = (experience: any) => {
    const description = Array.isArray(experience.description) 
      ? experience.description 
      : [experience.description];
    const achievements = experience.achievements || description;
    
    return (
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {experience.title || experience.position}
          </CardTitle>
          <p className="text-primary font-medium">{experience.company}</p>
          <p className="text-sm text-gray-500">{experience.period || experience.duration}</p>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-gray-600">
            {achievements.map((item: string, index: number) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

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
