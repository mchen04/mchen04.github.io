import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CardGrid from "./ui/card-grid";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Unsupervised Learning, Recommenders, and Reinforcement Learning",
      year: "2023",
      description: "Advanced course in the Machine Learning Specialization covering clustering algorithms, collaborative filtering, content-based filtering, reinforcement learning, and state-of-the-art recommender systems.",
      image: "/images/certifications/unsupervised-learning.jpg",
      verificationLink: "https://coursera.org/verify/N5KVD3ZTD6W6"
    },
    {
      title: "Advanced Learning Algorithms",
      year: "2023",
      description: "Comprehensive study of neural networks architecture, backpropagation, decision trees, and ensemble methods. Practical implementation using TensorFlow and XGBoost for complex ML tasks.",
      image: "/images/certifications/advanced-learning.jpg",
      verificationLink: "https://coursera.org/verify/U33T2QRT8MFC"
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      year: "2023",
      description: "Foundation course covering linear regression, logistic regression, gradient descent, and feature engineering. Hands-on implementation using scikit-learn and NumPy for real-world applications.",
      image: "/images/certifications/supervised-learning.jpg",
      verificationLink: "https://coursera.org/verify/RDHD7AHGBYYH"
    }
  ];

  const renderCertification = (certification: any) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={certification.image}
          alt={certification.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {certification.title}
        </CardTitle>
        <p className="text-primary font-medium">{certification.year}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{certification.description}</p>
        {certification.verificationLink && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => window.open(certification.verificationLink, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            Verify Certificate
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <CardGrid
      items={certifications}
      renderItem={renderCertification}
      title="Certifications"
      description="Professional certifications and completed courses"
    />
  );
};

export default Certifications;
