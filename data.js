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
            description: "A personal portfolio website with Asian-inspired design, showcasing skills, projects, and achievements. Built to run fast and simply as a challenge to create a high-performance site without modern frameworks.",
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
            description: "A complete tool for creating and automating content for social media platforms. FreqCreator generates audio files of different frequencies, creates visually unique images based on the sound's characteristics (patterns, colors, hues, etc.), and produces videos with pulsating animations and overlay text for enhanced user engagement. The tool compresses and clips videos to fit the ideal length for platforms like Instagram Reels, YouTube Shorts, TikTok, and Facebook Reels. It also supports direct uploads to Google Drive for easy content sharing.",
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
            description: "Won the AMD University Award for the PHiLIP project, emerging as the top team out of 8,000+ participants. Earned a $2,500 prize pool and a fully sponsored trip to San Francisco to present at the AMD Advancing AI Event. Delivered a live demo showcasing real-time text-to-image generation capabilities using AMD MI210 GPUs, leveraging PixArt models, FreeStyle models, ROCm software, and AMD Cloud. The event featured luminaries like Dr. Lisa Su, providing a platform to engage with leaders in AI and technology.",
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
            description: "A productivity tool designed to efficiently manage tabs and bookmarks with advanced features such as AI-generated previews of tabs, tagging, and cloud synchronization. It incorporates options for freezing tabs and performing batch actions to optimize memory usage. Currently under active development to expand its functionality further.",
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
            description: "An AI-powered news aggregator developed for the Gemini API Developer Competition, providing personalized news recommendations and summaries. Features include a user database for tailored experiences, anti-hallucination mechanisms to ensure factual accuracy, and seamless integration with the Gemini API to leverage advanced generative capabilities. The application addresses real-world challenges by enhancing user engagement through dynamic summaries and delivering reliable content.",
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
            description: "PHiLIP is an advanced AI-powered image generation and enhancement suite designed to democratize access to high-quality AI-generated imagery. Developed for the AMD Pervasive AI Developer Contest, the project won the University Category, earning recognition for its innovative design and real-world applications. PHiLIP combines cutting-edge ML models with a user-friendly interface, offering text-to-image generation, iterative image refinement, and style enhancements. Leveraging AMD MI210 GPUs, AMD Cloud, ROCm software, PixArt models, and Freestyle models, PHiLIP delivers rapid and precise results. The project demonstrates the power of collaborative innovation, with future plans for video generation and advanced AI education modules.",
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
            id: "ai-club-president",
            title: "Founder and President - AI@UCR",
            date: "2023-10",
            endDate: "present",
            type: "experience",
            description: "Established the first official AI club at UCR, growing membership to 50+ students and fostering a collaborative learning environment for AI enthusiasts. Organized workshops and guest lectures with AI industry experts, achieving a 45% increase in engagement. Developed and presented a comprehensive 8-topic AI curriculum in collaboration with professors, covering topics such as Ethics and Bias in AI, Linear and Logistic Regression, Basics of Neural Networks, Clustering Algorithms, Decision Trees, Random Forests, Recommender Systems, and Basics of Reinforcement Learning. The curriculum also incorporates hands-on learning with tools and software relevant to the AI field.",
            techStack: [
                "Leadership",
                "Curriculum Development",
                "Event Organization",
                "Machine Learning Concepts",
                "Team Building"
            ]
        },
        {
            id: "ucr-education",
            title: "University of California, Riverside (UCR)",
            date: "2022-09",
            endDate: "2026-06",
            type: "education",
            description: "Pursuing a B.S. in Computer Science with a Minor in Management: Strategy & Entrepreneurship.",
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
                "Differential Equations",
                "Technical Communications",
                "Design and Architecture of Computer Systems",
                "Compiler Design"
            ]
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
