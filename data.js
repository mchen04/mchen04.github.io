const portfolioData = {
    personalInfo: {
        name: "Michael Chen",
        title: "Software Developer",
        tagline: "A Computer Science major blending technology and creativity",
        github: "https://github.com/mchen04",
        linkedin: "https://www.linkedin.com/in/michael-luo-chen",
        email: "michaelluochen1@gmail.com",
        about: "CS@UCR with a Minor in Management: Strategy & Entrepreneurship | President & Co-Founder AI@UCR | Part-Time SWE@Mobivolt LLC | AMD Pervasive AI Winner"
    },
    timeline: [
        {
            id: "mobivolt-swe",
            title: "Part-Time Software Engineer at Mobivolt LLC",
            date: "2023-06",
            endDate: "present",
            type: "experience",
            description: "Developed real-time control and visualization software for hardware systems, boosting operational efficiency by 65%. Designed firmware to monitor and visualize system parameters such as voltage, temperature, and pressure. Created advanced data processing algorithms to enhance measurement accuracy by 30%.",
            techStack: ["WPF", "C#", "Arduino", "Python", "LiveCharts", "Embedded Systems", "Firmware Development"]
        },
        {
            id: "ai-club-president",
            title: "President & Co-Founder - AI@UCR",
            date: "2023-10",
            endDate: "present",
            type: "experience",
            description: "Founded the first official AI club at UCR, growing membership to 50+ students. Organized workshops and guest lectures with industry experts, achieving a 45% increase in engagement. Designed an 8-topic AI curriculum including Neural Networks, Reinforcement Learning, and Clustering Algorithms.",
            techStack: ["Leadership", "Curriculum Development", "Event Organization", "Team Building", "Workshop Facilitation", "Public Speaking", "Membership Growth", "Community Engagement"],
            links: {
                github: "https://ai-ucr.ucrhighlanders.org/projects"
            },
            media: [
                { type: "image", url: "media/images/ai@ucr/AI@UCR_NameTags_at_Competition.png" },
                { type: "image", url: "media/images/ai@ucr/AI@UCR_Workshop1.png" }
            ]
        },
        {
            id: "amd-award",
            title: "AMD University Award – Advancing AI Event",
            date: "2024-10",
            type: "award",
            description: "Received the AMD University Award for the PHiLIP project, standing out among over 8,000 participants. Presented at the AMD Advancing AI Event, demonstrating real-time text-to-image generation using AMD MI210 GPUs.",
            links: {
                project: "https://www.hackster.io/contests/amd2023#category-1092"
            },
            media: [
                { type: "image", url: "media/images/amd-award/amd-award-main-photo.png" },
                { type: "image", url: "media/images/amd-award/amd-award-second-photo.png" }
            ]
        },
        {
            id: "portfolio-website",
            title: "Portfolio Website",
            date: "2024-11",
            type: "project",
            description: "Developed a personal portfolio website with an modern-inspired design, showcasing skills and achievements. Built using HTML, CSS, and JavaScript to ensure high performance without modern frameworks.",
            techStack: ["HTML", "CSS", "JavaScript"],
            links: {
                github: "https://github.com/mchen04/mchen04.github.io"
            },
        },
        {
            id: "freqcreator",
            title: "FreqCreator",
            date: "2024-11",
            type: "project",
            description: "Created a tool for generating and automating social media content, including audio files, visualizations, and videos. Features AI-driven customization and platform-specific optimizations.",
            techStack: ["Python", "PIL", "MoviePy", "OpenAI API", "Google Drive API", "SoundFile", "Lameenc"],
            links: {
                github: "https://github.com/mchen04/FreqCreator"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/GWTLKKbYzwc?vq=hd1080" }
            ]
        },
        {
            id: "keepingtabs",
            title: "KeepingTabs",
            date: "2024-10",
            type: "project",
            description: "Developed a productivity tool for efficient tab and bookmark management, featuring AI-generated previews, tagging, and cloud synchronization. Includes memory optimization through tab freezing and batch actions.",
            techStack: ["TypeScript", "React.js", "Firebase", "Google APIs"],
            links: {
                github: "https://github.com/mchen04/KeepingTabs"
            }
        },
        {
            id: "news-genie",
            title: "News Genie",
            date: "2024-08",
            type: "project",
            description: "Built an AI-powered news aggregator offering personalized recommendations and summaries. Integrates anti-hallucination mechanisms and leverages the Gemini API for advanced generative capabilities.",
            techStack: ["React.js", "Next.js", "Python", "Flask", "Firebase", "Gemini API", "MongoDB", "Express.js", "Node.js", "MERN Stack"],
            links: {
                github: "https://github.com/mchen04/News-Genie"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/oCNbbrOpNEU?vq=hd1080" }
            ]
        },
        {
            id: "philip-project",
            title: "PHiLIP: Personalized Human-in-the-Loop Image Production",
            date: "2024-06",
            type: "project",
            description: "Developed an AI-powered image generation suite offering text-to-image creation, iterative refinement, and style enhancements. Won the AMD Pervasive AI University Contest and showcased at the AMD AI Event.",
            techStack: ["Python", "Flask", "PyTorch", "PixArt Models", "Freestyle Models", "Stable Diffusion", "ControlNet", "React", "Node.js", "TypeScript", "JavaScript", "CSS", "ROCM5.7", "ROCM6.1", "AMD Cloud"],
            links: {
                project: "https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-b90133"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/lK-Dw5Fcrds?vq=hd1080" }
            ]
        },
        {
            id: "unsupervised-learning-cert",
            title: "Unsupervised Learning, Recommenders, and Reinforcement Learning",
            date: "2023-10",
            type: "certification",
            description: "Learned clustering, recommender systems, and reinforcement learning techniques. Completed as part of the Machine Learning Specialization.",
            issuer: "Coursera (DeepLearning.AI)",
            links: {
                verify: "https://coursera.org/verify/N5KVD3ZTD6W6"
            },
            media: [
                { type: "image", url: "media/images/certifications/Unsupervised_ML.png" }
            ]
        },
        {
            id: "modded-word-hunt",
            title: "Modded Word Hunt",
            date: "2023-06",
            type: "project",
            description: "A C++ adaptation of the classic Word Hunt game with enhanced features like customizable grids, power-ups, and advanced scoring mechanics. Includes a hint system, custom sound effects, and an interactive UI for an engaging user experience.",
            techStack: ["C++", "CMake", "SFML", "Git", "Google Test", "Valgrind"],
            links: {
                github: "https://github.com/mchen04/CS100-Final-Project-Modified-Word-Hunt"
            },
            media: [
                { type: "image", url: "media/images/word-hunt/word-hunt-menu.png" },
                { type: "image", url: "media/images/word-hunt/word-hunt-settings.png" },
                { type: "image", url: "media/images/word-hunt/word-hunt-default-board.png" },
                { type: "image", url: "media/images/word-hunt/word-hunt-expanded-board.png" },
                { type: "image", url: "media/images/word-hunt/word-hunt-score-screen.png" },
                { type: "image", url: "media/images/word-hunt/word-hunt-tests.png" }
            ]
        },
        {
            id: "mafway",
            title: "MafWay",
            date: "2023-05",
            type: "project",
            description: "A web app for handwritten math recognition with 98% cross-validation accuracy on 82 symbols. Built with TensorFlow, Next.js, and React for real-time predictions.",
            techStack: ["Python", "TensorFlow", "Next.js", "React", "Tailwind", "HTML", "JavaScript", "CSS", "Data Preprocessing", "NumPy", "Pandas", "Data Cleaning"],
            links: {
                github: "https://github.com/mchen04/MafWay"
            }
        },
        {
            id: "advanced-algorithms-cert",
            title: "Advanced Learning Algorithms",
            date: "2023-05",
            type: "certification",
            description: "Mastered neural networks, decision trees, and ensemble methods. Applied TensorFlow and XGBoost for advanced machine learning tasks.",
            issuer: "Coursera (DeepLearning.AI)",
            links: {
                verify: "https://coursera.org/verify/U33T2QRT8MFC"
            },
            media: [
                { type: "image", url: "media/images/certifications/Advanced_Learning_Algo.png" }
            ]
        },
        {
            id: "ml-regression-cert",
            title: "Supervised Machine Learning: Regression and Classification",
            date: "2023-02",
            type: "certification",
            description: "Learned supervised learning techniques including linear and logistic regression. Implemented models using scikit-learn and NumPy.",
            issuer: "Coursera (DeepLearning.AI)",
            links: {
                verify: "https://coursera.org/verify/RDHD7AHGBYYH"
            },
            media: [
                { type: "image", url: "media/images/certifications/Supervised_ML.png" }
            ]
        },
        {
            id: "pdf-scraper",
            title: "Scraping PDF - UCR Catalog",
            date: "2023-01",
            type: "project",
            description: "A Python script for extracting course details from UCR's catalog PDFs. Retrieves prerequisites, credits, timings, and more.",
            techStack: ["Python", "PyPDF2"],
            links: {
                github: "https://github.com/mchen04/Scraping-PDF-UCR-Catalog"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/yrY0VnYN7BE?vq=hd1080" }
            ]            
        },
        {
            id: "cutiehack-sustainability-award",
            title: "CutieHack Sustainability Award",
            date: "2022-11",
            type: "award",
            description: "Recognized with the Sustainability Award at CutieHack for developing the Carbon Emissions Map.",
            links: {
                project: "https://devpost.com/software/2020-us-energy-based-carbon-emissions-by-state-map"
            },
            media: [
                { type: "image", url: "media/images/cutiehack-2022/cutiehack-award.png" }
            ]
        },
        {
            id: "carbon-emissions",
            title: "Carbon Emissions Map",
            date: "2022-11",
            type: "project",
            description: "An interactive dashboard visualizing state-level carbon emissions in the US. Used gradients of red to represent emission severity.",
            techStack: ["JavaScript", "HTML", "CSS"],
            links: {
                github: "https://github.com/mchen04/Carbon-Emmisions-Map"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/osbiSP4x4OE?vq=hd1080" }
            ]
        },
    ],
    skills: {
        "Programming Languages": [
            "Python",
            "TypeScript/JavaScript",
            "C++",
            "C#",
            "Java",
            "SQL"
        ],
        "Web Technologies": [
            "React.js",
            "Next.js",
            "Node.js",
            "Express.js",
            "HTML/CSS",
            "Tailwind CSS",
            "GraphQL",
            "REST APIs"
        ],
        "AI & Machine Learning": [
            "TensorFlow",
            "PyTorch",
            "Stable Diffusion",
            "Neural Networks",
            "Computer Vision",
            "Natural Language Processing",
            "Reinforcement Learning",
            "Large Language Models"
        ],
        "Cloud & DevOps": [
            "Firebase",
            "MongoDB",
            "PostgreSQL",
            "Git/GitHub",
            "CI/CD",
            "AMD Cloud",
            "Google Cloud APIs"
        ],
        "Software Development": [
            "Object-Oriented Design",
            "Test-Driven Development",
            "Agile Methodologies",
            "System Design",
            "Data Structures",
            "Algorithms",
            "Design Patterns"
        ],
        "Specialized Skills": [
            "Embedded Systems",
            "Firmware Development",
            "Windows Presentation Foundation",
            "Arduino",
            "Data Analysis",
            "Technical Leadership",
            "Project Management"
        ]
    }
}
