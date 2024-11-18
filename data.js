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
        // Items with end dates first
        {
            id: "mobivolt-swe",
            title: "Part-Time Software Engineer at Mobivolt LLC",
            date: "2023-06",
            endDate: "present",
            type: "experience",
            description: "Designed and implemented real-time control and visualization software for hardware systems, achieving a 65% boost in operational efficiency. Developed firmware to monitor and display key system parameters, including voltage, temperature, and pressure. Advanced data processing algorithms were created to enhance measurement accuracy by 30%, ensuring precise and reliable performance.",
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
                linkedin: "https://www.linkedin.com/company/ai-at-ucr/",
                highlander: "https://highlanderlink.ucr.edu/organization/ai_at_ucr",
                website: "https://ai-ucr.ucrhighlanders.org/projects",
                discord: "https://discord.com/invite/tmd2hQE4SK",
                instagram: "https://www.instagram.com/ucrai_/"
            },
            media: [
                { type: "image", url: "media/images/ai@ucr/AI@UCR_NameTags_at_Competition.png" },
                { type: "image", url: "media/images/ai@ucr/AI@UCR_Workshop1.png" }
            ]
        },
        // Rest of the items without end dates
        {
            id: "amd-award",
            title: "AMD University Award – Advancing AI Event",
            date: "2024-10",
            type: "award",
            description: "Won the prestigious AMD University Award for the PHiLIP project, which stood out among over 8,000 participants. Awarded $2,500 and selected as one of four participants to give live demonstrations of the technology. Presented at the AMD Advancing AI Event, showcasing a live demonstration of real-time text-to-image generation powered by AMD MI210 GPUs.",
            links: {
                verify: "https://www.hackster.io/contests/amd2023#category-1092"
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
            }
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
            description: "Built an AI-powered news aggregator offering personalized recommendations and summaries. Features a login system and a database for users and their preferences, catering to individual needs. Integrates anti-hallucination mechanisms and leverages the Gemini API for advanced generative capabilities.",
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
            description: "Developed a C++ adaptation of the classic Word Hunt game with enhanced features, including customizable grids, power-ups, and advanced scoring mechanics. Integrated a hint system, custom sound effects, and an interactive UI to deliver an engaging user experience.",
            techStack: ["C++", "CMake", "SFML", "Git", "Google Test", "Valgrind"],
            links: {
                github: "https://github.com/mchen04/CS100-Final-Project-Modified-Word-Hunt"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/1WyHNnWpu44?vq=hd1080" }
            ]
        },
        {
            id: "mafway",
            title: "MafWay",
            date: "2023-05",
            type: "project",
            description: "Developed an original model from scratch for a web app specializing in handwritten math recognition, achieving 98% cross-validation accuracy on 82 symbols and 700+ million pixels. Built with TensorFlow, Next.js, and React for real-time predictions. The website allows users to upload or draw images, providing predictions along with confidence levels.",
            techStack: ["Python", "TensorFlow", "Next.js", "React", "Tailwind", "HTML", "JavaScript", "CSS", "Data Preprocessing", "NumPy", "Pandas", "Data Cleaning"],
            links: {
                github: "https://github.com/mchen04/MafWay"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/1EdeTjw41lw?vq=hd1080" }
            ]
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
            description: "Created a Python script to extract course details from UCR's catalog PDFs, retrieving information such as prerequisites, credits, timings, and more. Includes a loading bar to indicate progress and highlights where the information is found within the document.",
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
            description: "Awarded the Sustainability Award at CutieHack for developing the Carbon Emissions Map.",
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
            description: "Designed and developed an interactive dashboard visualizing state-level carbon emissions in the US. Utilized gradients of red to represent emission severity. Enabled users to click on a state to display detailed policies and information regarding carbon emissions.",
            techStack: ["JavaScript", "HTML", "CSS"],
            links: {
                github: "https://github.com/mchen04/Carbon-Emmisions-Map"
            },
            media: [
                { type: "youtube", url: "https://www.youtube.com/embed/osbiSP4x4OE?vq=hd1080" }
            ]
        },
        {
            id: "ucr-undergraduate-start",
            title: "Start of Undergraduate Journey at UCR",
            date: "2022-10",
            type: "milestone",
            description: "Began my undergraduate studies at the University of California, Riverside as a Computer Science major. This milestone marked the start of my journey into software development, innovation, and problem-solving in the field of technology.",
            techStack: [],
            links: {},
            media: []
        }
        
    ],
    skills: {
        "Programming Languages": [
            "C#",
            "C++",
            "SQL",
            "Java",
            "Python",
            "TypeScript/JavaScript"
        ],
        "Web Technologies": [
            "HTML/CSS",
            "Node.js",
            "React.js",
            "Next.js",
            "GraphQL",
            "REST APIs",
            "Express.js",
            "Tailwind CSS"
        ],
        "AI & Machine Learning": [
            "PyTorch",
            "TensorFlow",
            "Computer Vision",
            "Prompt Engineering",
            "Large Language Models",
            "Reinforcement Learning"
        ],
        "Cloud & DevOps": [
            "CI/CD",
            "MongoDB",
            "Firebase",
            "Git/GitHub",
            "PostgreSQL",
            "AMD Cloud",
            "Google Cloud APIs"
        ],
        "Software Development": [
            "Algorithms",
            "Data Structures",
            "Object-Oriented Design",
            "Test-Driven Development",
            "Agile Methodologies"
        ],
        "Specialized Skills": [
            "Arduino",
            "Data Analysis",
            "Embedded Systems",
            "Firmware Development",
            "Windows Presentation Foundation"
        ]
    }
}
