const portfolioData = {
    personalInfo: {
        name: "Michael Chen",
        title: "Software Developer",
        tagline: "A Computer Science major blending technology and creativity",
        github: "https://github.com/mchen04",
        linkedin: "https://www.linkedin.com/in/michael-luo-chen",
        email: "michaelluochen1@gmail.com"
    },
    timeline: [
        {
            id: "portfolio-website",
            title: "Portfolio Website",
            date: "2024-11",
            type: "project",
            description: "A personal portfolio website showcasing skills, projects, and achievements with a dynamic, animated timeline.",
            techStack: ["React.js", "Framer Motion", "GSAP", "CSS3"],
            links: {
                github: "https://github.com/mchen04/portfolio"
            }
        },
        {
            id: "freqcreator",
            title: "FreqCreator",
            date: "2024-11",
            type: "project",
            description: "A tool to generate frequency spectrums for audio signals with customizable visualization options.",
            techStack: ["Python", "Matplotlib"],
            links: {
                github: "https://github.com/mchen04/FreqCreator"
            }
        },
        {
            id: "amd-award",
            title: "AMD University Award Category – Advancing AI Event",
            date: "2024-10",
            type: "award",
            description: "Received the AMD University Award for the PHiLIP project. Presented a live demo showcasing real-time text-to-image generation capabilities using AMD MI210 GPUs at the AMD Advancing AI Event in San Francisco.",
            techStack: ["AMD MI210 GPUs", "Generative AI", "Stable Diffusion", "ControlNet"],
            links: {
                project: "https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-b90133"
            }
        },
        {
            id: "keepingtabs",
            title: "KeepingTabs",
            date: "2024-10",
            type: "project",
            description: "A productivity tool to manage tabs and bookmarks effectively with tagging and cloud sync features.",
            techStack: ["TypeScript", "React.js", "Firebase"],
            links: {
                github: "https://github.com/mchen04/KeepingTabs"
            }
        },
        {
            id: "news-genie",
            title: "News Genie",
            date: "2024-08",
            type: "project",
            description: "AI-powered news aggregator with personalized recommendations and summaries.",
            techStack: ["React.js", "Next.js", "Python", "Flask", "Firebase"],
            links: {
                github: "https://github.com/mchen04/News-Genie"
            }
        },
        {
            id: "philip-project",
            title: "PHiLIP: Personalized Human in Loop Image Production",
            date: "2024-02",
            endDate: "2024-06",
            type: "project",
            description: "A generative AI project that leverages advanced machine learning models for personalized, real-time text-to-image generation. Won the University Category of the AMD Pervasive AI Developer Contest and showcased at the AMD Advancing AI Event 2024.",
            techStack: [
                "Python",
                "PyTorch",
                "Stable Diffusion",
                "ControlNet",
                "PixArt Models",
                "AMD MI210 GPUs"
            ],
            links: {
                project: "https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-b90133"
            }
        },
        {
            id: "reciptapp",
            title: "ReciptApp",
            date: "2024-01",
            type: "project",
            description: "A receipt management app for tracking and organizing expenses with cloud functionality.",
            techStack: ["TypeScript", "Python", "AWS S3"],
            links: {
                github: "https://github.com/mchen04/ReciptApp"
            }
        },
        {
            id: "songsmith-ai",
            title: "SongsmithAI",
            date: "2023-11",
            type: "project",
            description: "A deep learning project for generating song lyrics using LSTMs trained on Spotify and Genius datasets.",
            techStack: ["Python", "TensorFlow", "Keras"],
            links: {
                github: "https://github.com/mchen04/SongsmithAI"
            }
        },
        {
            id: "unsupervised-learning-cert",
            title: "Unsupervised Learning, Recommenders, and Reinforcement Learning",
            date: "2023-10",
            type: "certification",
            description: "Completed comprehensive training in unsupervised learning techniques and recommender systems.",
            issuer: "Coursera (DeepLearning.AI)",
            links: {
                verify: "https://coursera.org/verify/N5KVD3ZTD6W6"
            }
        },
        {
            id: "ai-club-president",
            title: "Founder and President - UCR AI Club",
            date: "2023-10",
            endDate: "present",
            type: "experience",
            description: "Established the first official AI club at UCR, growing membership to 50+ students. Organized workshops and guest lectures with AI industry experts, leading to a 45% increase in engagement. Developed and presented a comprehensive 9-topic AI curriculum in collaboration with professors.",
            techStack: ["Leadership", "Event Organization", "Curriculum Development"]
        },
        {
            id: "software-engineer-intern",
            title: "Software Engineer – Intern → Part-Time",
            date: "2023-06",
            endDate: "present",
            type: "experience",
            description: "Developed desktop applications for real-time control and visualization of hardware systems, enhancing operational efficiency by 65%. Designed firmware to monitor voltage, temperature, and pressure in hardware devices.",
            techStack: ["Windows Presentation Foundation (WPF)", "C#", "Arduino", "Python"]
        },
        {
            id: "word-hunt",
            title: "CS100 Final Project - Modified Word Hunt",
            date: "2023-06",
            type: "project",
            description: "An enhanced version of Word Hunt with a leaderboard and multiplayer features.",
            techStack: ["Python", "Flask", "SQLite"],
            links: {
                github: "https://github.com/mchen04/CS100-Final-Project-Modified-Word-Hunt"
            }
        },
        {
            id: "mafway",
            title: "MafWay",
            date: "2023-05",
            type: "project",
            description: "An AI-driven image recognition app targeting innovative areas like sign language recognition.",
            techStack: ["Python", "TensorFlow", "OpenCV"],
            links: {
                github: "https://github.com/mchen04/MafWay"
            }
        },
        {
            id: "advanced-algorithms-cert",
            title: "Advanced Learning Algorithms",
            date: "2023-05",
            type: "certification",
            description: "Mastered advanced machine learning algorithms and their implementations.",
            issuer: "Coursera (DeepLearning.AI)",
            links: {
                verify: "https://coursera.org/verify/U33T2QRT8MFC"
            }
        },
        {
            id: "ml-regression-cert",
            title: "Supervised Machine Learning: Regression and Classification",
            date: "2023-02",
            type: "certification",
            description: "Completed DeepLearning.AI's course on supervised machine learning fundamentals.",
            issuer: "Coursera (DeepLearning.AI)",
            links: {
                verify: "https://coursera.org/verify/RDHD7AHGBYYH"
            }
        },
        {
            id: "pdf-scraper",
            title: "Scraping PDF - UCR Catalog",
            date: "2023-01",
            type: "project",
            description: "A Python script for extracting and searching data from UCR's catalog PDF.",
            techStack: ["Python", "PyPDF2"],
            links: {
                github: "https://github.com/mchen04/Scraping-PDF-UCR-Catalog"
            }
        },
        {
            id: "carbon-emissions",
            title: "Carbon Emissions Map",
            date: "2022-11",
            type: "project",
            description: "An interactive dashboard visualizing US state-level carbon emissions for 2021. Won the Sustainability Award at CutieHack.",
            techStack: ["JavaScript", "HTML", "CSS"],
            links: {
                github: "https://github.com/mchen04/Carbon-Emmisions-Map"
            }
        },
        {
            id: "ucr-education",
            title: "University of California, Riverside (UCR)",
            date: "2022-09",
            endDate: "2026-06",
            type: "education",
            description: "Pursuing a B.S. in Computer Science with a Minor in Business. Relevant coursework includes Data Structures & Algorithms, Software Construction, Operating Systems, and Machine Learning.",
            techStack: ["C++", "Python", "Java", "SQL", "Assembly"]
        }
    ],
    skills: {
        "Programming Languages": [
            { name: "Python", level: 95 },
            { name: "C++", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "Java", level: 80 },
            { name: "TypeScript", level: 75 }
        ],
        "Frameworks & Libraries": [
            { name: "React.js", level: 90 },
            { name: "TensorFlow", level: 85 },
            { name: "PyTorch", level: 80 },
            { name: "Flask", level: 75 },
            { name: "Next.js", level: 70 }
        ],
        "Tools & Technologies": [
            { name: "Git", level: 90 },
            { name: "Docker", level: 80 },
            { name: "AWS", level: 75 },
            { name: "Firebase", level: 85 },
            { name: "Linux", level: 80 }
        ],
        "Machine Learning": [
            { name: "Computer Vision", level: 85 },
            { name: "Natural Language Processing", level: 80 },
            { name: "Deep Learning", level: 85 },
            { name: "Data Analysis", level: 90 },
            { name: "Model Deployment", level: 75 }
        ]
    }
};