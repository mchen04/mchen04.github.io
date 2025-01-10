export interface Certification {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  issuer: string;
  image: string;
  verifyLink: string;
}

export const certifications: Certification[] = [
  {
    id: "unsupervised-learning-cert",
    title: "Unsupervised Learning, Recommenders, and Reinforcement Learning",
    date: "2023-10",
    type: "certification",
    description: "Learned clustering, recommender systems, and reinforcement learning techniques. Completed as part of the Machine Learning Specialization.",
    issuer: "Coursera (DeepLearning.AI)",
    image: "/images/certifications/supervised-learning.jpg",
    verifyLink: "https://coursera.org/verify/N5KVD3ZTD6W6"
  },
  {
    id: "advanced-algorithms-cert",
    title: "Advanced Learning Algorithms",
    date: "2023-05",
    type: "certification",
    description: "Mastered neural networks, decision trees, and ensemble methods. Applied TensorFlow and XGBoost for advanced machine learning tasks.",
    issuer: "Coursera (DeepLearning.AI)",
    image: "/images/certifications/advanced-learning.jpg",
    verifyLink: "https://coursera.org/verify/U33T2QRT8MFC"
  },
  {
    id: "ml-regression-cert",
    title: "Supervised Machine Learning: Regression and Classification",
    date: "2023-02",
    type: "certification",
    description: "Learned supervised learning techniques including linear and logistic regression. Implemented models using scikit-learn and NumPy.",
    issuer: "Coursera (DeepLearning.AI)",
    image: "/images/certifications/unsupervised-learning.jpg",
    verifyLink: "https://coursera.org/verify/RDHD7AHGBYYH"
  }
];
