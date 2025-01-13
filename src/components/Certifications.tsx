import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CardGrid from "./ui/card-grid";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      id: "unsupervised-learning-cert",
      title: "Unsupervised Learning, Recommenders, and Reinforcement Learning",
      date: "2023-10",
      description: "Learned clustering, recommender systems, and reinforcement learning techniques. Completed as part of the Machine Learning Specialization.",
      issuer: "Coursera (DeepLearning.AI)",
      image: "/images/certifications/unsupervised-learning.jpg",
      verificationLink: "https://coursera.org/verify/N5KVD3ZTD6W6"
    },
    {
      id: "ml-regression-cert",
      title: "Supervised Machine Learning: Regression and Classification",
      date: "2023-02",
      description: "Learned supervised learning techniques including linear and logistic regression. Implemented models using scikit-learn and NumPy.",
      issuer: "Coursera (DeepLearning.AI)",
      image: "/images/certifications/supervised-learning.jpg",
      verificationLink: "https://coursera.org/verify/RDHD7AHGBYYH"
    },
    {
      id: "advanced-algorithms-cert",
      title: "Advanced Learning Algorithms",
      date: "2023-05",
      description: "Mastered neural networks, decision trees, and ensemble methods. Applied TensorFlow and XGBoost for advanced machine learning tasks.",
      issuer: "Coursera (DeepLearning.AI)",
      image: "/images/certifications/advanced-learning.jpg",
      verificationLink: "https://coursera.org/verify/U33T2QRT8MFC"
    }
  ];

  const renderCertification = (cert: any) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {cert.title}
        </CardTitle>
        <p className="text-primary font-medium">{cert.issuer} - {cert.date}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{cert.description}</p>
        {cert.verificationLink && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => window.open(cert.verificationLink, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            Verify Certification
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
      description="Professional certifications demonstrating my skills and knowledge"
    />
  );
};

export default Certifications;
