import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CardGrid from "./ui/card-grid";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const Awards = () => {
  const awards = [
    {
      title: "AMD University Award – Advancing AI Event",
      year: "2024",
      description: "Earned the prestigious AMD University Award, standing out among over 8,000 participants. Received a $2,500 prize and was one of only four participants selected to deliver live demonstrations of the innovative technology at the AMD Advancing AI Event.",
      verificationLink: "https://www.hackster.io/contests/amd2023#category-1092"
    },
    {
      title: "CutieHack Sustainability Award",
      year: "2022",
      description: "Awarded the Sustainability Award at CutieHack for developing the Carbon Emissions Map.",
      verificationLink: "https://devpost.com/software/2020-us-energy-based-carbon-emissions-by-state-map"
    },
    {
      title: "Dean's Honor Roll",
      year: "2022 - 2025",
      description: "Recognized for academic excellence with a GPA above 3.5 during the academic years 2022-2025."
    }
  ];

  const renderAward = (award: any) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {award.title}
        </CardTitle>
        <p className="text-primary font-medium">{award.year}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{award.description}</p>
        {award.verificationLink && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => window.open(award.verificationLink, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            Verify Award
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <CardGrid
      items={awards}
      renderItem={renderAward}
      title="Awards & Achievements"
      description="Recognition and accomplishments throughout my journey"
    />
  );
};

export default Awards;
