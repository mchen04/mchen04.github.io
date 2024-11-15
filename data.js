// data.js
const portfolioData = {
    personalInfo: {
        name: "Michael Chen",
        title: "Software Developer",
        tagline: "Full Stack Developer | Machine Learning Enthusiast",
        github: "https://github.com/mchen04",
        linkedin: "https://www.linkedin.com/in/michael-luo-chen",
        email: "michaelluochen1@gmail.com"
    },
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
    },
    entries: [
        {
            id: "ucr-education",
            title: "University of California, Riverside (UCR)",
            date: "2022-09",
            endDate: "2026-06",
            type: "education",
            description: "Pursuing a B.S. in Computer Science with a Minor in Business. Relevant coursework includes Data Structures & Algorithms, Software Construction, Design of Operating Systems, Assembly and Machine Organization, Logic Design, Formal Automata, Cybersecurity, Discrete Math, Linear Algebra, and Differential Equations.",
            techStack: ["C++", "Python", "Java", "SQL", "Assembly"],
            highlights: [
                "B.S. in Computer Science",
                "Minor in Business",
                "Expected Graduation: June 2026"
            ]
        },
        {
            id: "software-engineer-intern",
            title: "Software Engineer – Intern → Part-Time",
            date: "2023-06",
            endDate: "present",
            type: "experience",
            description: "Developed desktop applications for real-time control and visualization of hardware systems, enhancing operational efficiency by 65%. Designed firmware to monitor voltage, temperature, and pressure in hardware devices, ensuring reliable communication through safety features like checksums. Engineered advanced data processing algorithms to improve measurement accuracy by 30%.",
            techStack: ["Windows Presentation Foundation (WPF)", "C#", "Arduino", "Python"],
            highlights: [
                "Enhanced operational efficiency by 65%",
                "Designed firmware with safety features",
                "Improved measurement accuracy by 30%"
            ]
        },
        {
            id: "ai-club-president",
            title: "Founder and President - UCR AI Club",
            date: "2023-10",
            endDate: "present",
            type: "experience",
            description: "Established the first official AI club at UCR, growing membership to 50+ students. Organized workshops and guest lectures with AI industry experts, leading to a 45% increase in engagement. Developed and presented a comprehensive 9-topic AI curriculum in collaboration with professors, tailored for students of all skill levels.",
            techStack: ["Leadership", "Event Organization", "Curriculum Development"],
            highlights: [
                "Grew membership to 50+ students",
                "Achieved 45% increase in engagement",
                "Developed 9-topic AI curriculum"
            ]
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
            },
            highlights: [
                "Won AMD Pervasive AI Developer Contest - University Category",
                "Showcased at AMD Advancing AI Event 2024",
                "Implemented real-time text-to-image generation",
                "Utilized AMD MI210 GPUs for accelerated processing"
            ]
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
            },
            highlights: [
                "Presented live demo at AMD Advancing AI Event",
                "Won University Award Category",
                "Showcased real-time AI capabilities"
            ]
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
        }
    ],
    certifications: [
        {
            id: "unsupervised-learning",
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
            id: "advanced-algorithms",
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
            id: "ml-regression",
            title: "Supervised Machine Learning: Regression and Classification",
            date: "2023-02",
            type: "certification",
            description: "Completed DeepLearning.AI's course on supervised machine learning fundamentals.",
            issuer: "Coursera (DeepLearning.AI)",
            links: {
                verify: "https://coursera.org/verify/RDHD7AHGBYYH"
            }
        }
    ]
};

// Timeline filtering functions
const timelineFilters = {
    all: entry => true,
    projects: entry => entry.type === 'project',
    experience: entry => entry.type === 'experience',
    education: entry => entry.type === 'education',
    certifications: entry => entry.type === 'certification',
    awards: entry => entry.type === 'award'
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, timelineFilters };
}