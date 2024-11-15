const portfolioData = {
    personalInfo: {
        name: "Michael Chen",
        title: "Software Developer",
        tagline: "A Computer Science major blending technology and creativity",
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
    certifications: [
        {
            title: "Supervised Machine Learning: Regression and Classification",
            issuer: "DeepLearning.AI",
            date: "2023-02",
            link: "https://coursera.org/verify/RDHD7AHGBYYH"
        },
        {
            title: "Advanced Learning Algorithms",
            issuer: "DeepLearning.AI",
            date: "2023-05",
            link: "https://coursera.org/verify/U33T2QRT8MFC"
        },
        {
            title: "Unsupervised Learning, Recommenders, and Reinforcement Learning",
            issuer: "DeepLearning.AI",
            date: "2023-10",
            link: "https://coursera.org/verify/N5KVD3ZTD6W6"
        }
    ],
    experience: [
        {
            title: "Software Engineer – Intern → Part-Time",
            company: "Company Name",
            date: "2023-06",
            endDate: "present",
            description: "Developed desktop applications for real-time control and visualization of hardware systems, enhancing operational efficiency by 65%. Designed firmware to monitor voltage, temperature, and pressure in hardware devices, ensuring reliable communication through safety features like checksums. Engineered advanced data processing algorithms to improve measurement accuracy by 30%.",
            technologies: ["Windows Presentation Foundation (WPF)", "C#", "Arduino", "Python"]
        },
        {
            title: "Founder and President - UCR AI Club",
            organization: "UCR",
            date: "2023-10",
            endDate: "present",
            description: "Established the first official AI club at UCR, growing membership to 50+ students. Organized workshops and guest lectures with AI industry experts, leading to a 45% increase in engagement. Developed and presented a comprehensive 9-topic AI curriculum in collaboration with professors, tailored for students of all skill levels.",
            technologies: ["Leadership", "Event Organization", "Curriculum Development"]
        }
    ],
    education: {
        school: "University of California, Riverside (UCR)",
        degree: "B.S. in Computer Science",
        minor: "Business",
        startDate: "2022-09",
        endDate: "2026-06",
        gpa: "3.8",
        coursework: [
            "Data Structures & Algorithms",
            "Software Construction",
            "Design of Operating Systems",
            "Assembly and Machine Organization",
            "Logic Design",
            "Formal Automata",
            "Cybersecurity",
            "Discrete Math",
            "Linear Algebra",
            "Differential Equations"
        ]
    },
    projects: [
        {
            title: "PHiLIP: Personalized Human in Loop Image Production",
            date: "2024-02",
            endDate: "2024-06",
            technologies: [
                "Python",
                "PyTorch",
                "Stable Diffusion",
                "ControlNet",
                "PixArt Models",
                "AMD MI210 GPUs"
            ],
            description: "A generative AI project that leverages advanced machine learning models for personalized, real-time text-to-image generation. Won the University Category of the AMD Pervasive AI Developer Contest and showcased at the AMD Advancing AI Event 2024.",
            link: "https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-b90133"
        },
        {
            title: "News Genie",
            date: "2024-08",
            technologies: ["React.js", "Next.js", "Python", "Flask", "Firebase"],
            description: "AI-powered news aggregator with personalized recommendations and summaries.",
            link: "https://github.com/mchen04/News-Genie"
        }
    ]
};

// Skill animation thresholds
const skillAnimationConfig = {
    threshold: 0.2,
    smooth: true,
    duration: 1.5
};