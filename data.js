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
        {
            id: "amd-award",
            title: "AMD University Award – Advancing AI Event",
            date: "2024-10",
            type: "award",
            description: "Won the prestigious AMD University Award for the PHiLIP project, which stood out among over 8,000 participants. Awarded $2,500 and selected as one of four participants to give live demonstrations of the technology. Presented at the AMD Advancing AI Event, showcasing a live demonstration of real-time text-to-image generation powered by AMD MI210 GPUs.",
            links: {
                project: "https://www.hackster.io/contests/amd2023#category-1092"
            },
            media: [
                { type: "image", url: "media/images/amd-award/amd-award-main-photo.png" },
                { type: "image", url: "media/images/amd-award/amd-award-second-photo.png" }
            ]
        },
        // Rest of the timeline entries remain unchanged
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
            "Reinforcement Learning",
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
