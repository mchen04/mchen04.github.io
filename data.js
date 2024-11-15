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
            id: "portfolio-website",
            title: "Portfolio Website",
            date: "2024-11",
            type: "project",
            description: "An Asian-inspired portfolio website showcasing skills and achievements. Built to run fast and simply without modern frameworks. Developed using HTML, CSS, and JavaScript.",
            techStack: ["HTML", "CSS", "JavaScript"],
            links: {
                github: "https://github.com/mchen04/portfolio"
            }
        },
        {
            id: "freqcreator",
            title: "FreqCreator",
            date: "2024-11",
            type: "project",
            description: "A tool for creating automated social media content, including audio files, visualizations, and videos. Supports seamless customization, compression, and platform-specific optimizations. Integrates AI for high-quality outputs.",
            techStack: [
                "Python", 
                "PIL", 
                "MoviePy", 
                "OpenAI API", 
                "Google Drive API",
                "SoundFile", 
                "Lameenc"
            ],
            links: {
                github: "https://github.com/mchen04/FreqCreator"
            }
        },
        {
            id: "amd-award",
            title: "AMD University Award Category – Advancing AI Event",
            date: "2024-10",
            type: "award",
            description: "Won AMD University Award, earning $2,500 and a sponsored trip to present at the AMD Advancing AI Event. Demonstrated real-time text-to-image generation using AMD GPUs and advanced AI models. Engaged with AI leaders like Dr. Lisa Su.",
            techStack: [
                "AMD MI210 GPUs",
                "Generative AI",
                "Stable Diffusion",
                "ControlNet",
                "PixArt Models",
                "FreeStyle Models",
                "ROCm Software",
                "AMD Cloud"
            ],
            links: {
                project: "https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-b90133"
            }
        },
        {
            id: "keepingtabs",
            title: "KeepingTabs",
            date: "2024-10",
            type: "project",
            description: "A productivity tool for managing tabs and bookmarks with tagging, cloud sync, and memory optimization features. Integrates AI to generate tab previews and automate workflows. Actively expanding functionality.",
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
            description: "An AI-powered news aggregator providing personalized recommendations and summaries. Integrates anti-hallucination features and Gemini API for advanced generative capabilities. Built for the Gemini API Developer Competition.",
            techStack: [
                "React.js",
                "Next.js",
                "Python",
                "Flask",
                "Firebase",
                "Gemini API"
            ],
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
            description: "An AI suite for text-to-image generation, style enhancements, and iterative refinement. Won AMD Pervasive AI University Contest and showcased at the AMD AI Event. Leveraged AMD MI210 GPUs and advanced AI models.",
            techStack: [
                "Python",
                "Flask",
                "PyTorch",
                "PixArt Models",
                "Freestyle Models",
                "Stable Diffusion",
                "ControlNet",
                "AMD MI210 GPUs",
                "ROCm Software",
                "AMD Cloud"
            ],
            links: {
                project: "https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-b90133"
            }
        },
        {
            id: "mafway",
            title: "MafWay",
            date: "2023-05",
            type: "project",
            description: "A web app for handwritten math recognition with 98% accuracy on 82 symbols. Built with TensorFlow, Next.js, and React for real-time predictions. Trained on over 375,000 images with advanced preprocessing techniques.",
            techStack: ["Python", "TensorFlow", "Next.js", "React", "Tailwind", "HTML", "JavaScript", "CSS"],
            links: {
                github: "https://github.com/mchen04/MafWay"
            }
        },
        {
            id: "carbon-emissions",
            title: "Carbon Emissions Map",
            date: "2022-11",
            type: "project",
            description: "An interactive dashboard visualizing state-level carbon emissions in the US. Used gradients of red to represent emission severity. Built for data-driven environmental insights.",
            techStack: ["JavaScript", "HTML", "CSS"],
            links: {
                github: "https://github.com/mchen04/Carbon-Emmisions-Map"
            }
        },
        {
            id: "pdf-scraper",
            title: "Scraping PDF - UCR Catalog",
            date: "2023-01",
            type: "project",
            description: "A Python script for extracting course details from UCR's catalog PDFs. Retrieves prerequisites, credits, timings, and more. Streamlines data retrieval for students and advisors.",
            techStack: ["Python", "PyPDF2"],
            links: {
                github: "https://github.com/mchen04/Scraping-PDF-UCR-Catalog"
            }
        }
    ],
    skills: {
        "Programming Languages": [
            "Python",
            "C/C++/C#",
            "Java",
            "Node.js",
            "GraphQL",
            "SQL",
            "JavaScript",
            "HTML",
            "CSS"
        ],
        "Frameworks": [
            "React/Next.js",
            "Spring",
            "TensorFlow",
            "PyTorch",
            "Flask",
            "Windows Presentation Foundation"
        ],
        "DB & Tools": [
            "MongoDB",
            "Postgres",
            "Jupyter Notebook",
            "Microsoft Visual Studio",
            "Eclipse",
            "Arduino",
            "SPSS Statistics"
        ],
        "Machine Learning": [
            "Supervised & Unsupervised Learning",
            "Advanced Learning Algorithms",
            "Reinforcement Learning"
        ]
    }
};
