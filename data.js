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
            id: "portfolio-website",
            title: "Portfolio Website",
            date: "2024-11",
            type: "project",
            description: "A personal portfolio website to showcase skills, projects, and achievements with a dynamic, animated timeline.",
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
            },
            highlights: [
                "Presented live demo at AMD Advancing AI Event",
                "Won University Award Category",
                "Showcased real-time AI capabilities"
            ]
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
            },
            highlights: [
                "Won AMD Pervasive AI Developer Contest - University Category",
                "Showcased at AMD Advancing AI Event 2024",
                "Implemented real-time text-to-image generation",
                "Utilized AMD MI210 GPUs for accelerated processing"
            ]
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
    ]
};

class PortfolioRenderer {
    constructor(data) {
        this.data = data;
        this.timelineElement = document.querySelector('.timeline');
        this.traditionalElement = document.querySelector('.traditional-view');
    }

    formatDate(dateStr, endDate) {
        if (dateStr === 'present') return 'Present';
        const date = new Date(dateStr);
        const formatted = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long'
        });
        
        if (endDate) {
            const endFormatted = endDate === 'present' ? 'Present' : 
                new Date(endDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long'
                });
            return `${formatted} – ${endFormatted}`;
        }
        
        return formatted;
    }

    createTimelineEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'timeline-entry';
        
        const content = document.createElement('div');
        content.className = 'entry-content';
        
        if (entry.type === 'award') {
            content.classList.add('award-entry');
        } else if (entry.type === 'experience') {
            content.classList.add('experience-entry');
        } else if (entry.type === 'education') {
            content.classList.add('education-entry');
        }
        
        let dateDisplay = this.formatDate(entry.date, entry.endDate);
        if (entry.type === 'education' && entry.endDate && entry.endDate.includes('2026')) {
            dateDisplay += ' (Expected)';
        }
        
        content.innerHTML = `
            <h3>${entry.title}</h3>
            <p class="date">${dateDisplay}</p>
            <p class="type">${entry.type}</p>
            <p class="description">${entry.description}</p>
            ${this.renderTechStack(entry)}
            ${this.renderHighlights(entry)}
            ${this.renderLinks(entry)}
        `;

        content.addEventListener('click', () => {
            content.classList.toggle('expanded');
        });

        entryDiv.appendChild(content);
        return entryDiv;
    }

    renderHighlights(entry) {
        if (!entry.highlights) return '';
        return `
            <div class="highlights">
                <ul>
                    ${entry.highlights.map(highlight => `
                        <li>${highlight}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    renderTraditionalView() {
        const groupedEntries = this.data.entries.reduce((acc, entry) => {
            acc[entry.type] = acc[entry.type] || [];
            acc[entry.type].push(entry);
            return acc;
        }, {});

        Object.keys(groupedEntries).forEach(type => {
            let categoryCard = document.querySelector(`.category-card[data-type="${type}"]`);
            
            if (!categoryCard) {
                categoryCard = document.createElement('div');
                categoryCard.className = 'category-card';
                categoryCard.setAttribute('data-type', type);
                this.traditionalElement.appendChild(categoryCard);
            }

            categoryCard.innerHTML = `
                <h2>${type.charAt(0).toUpperCase() + type.slice(1)}s</h2>
                ${this.renderCategoryEntries(groupedEntries[type])}
            `;
        });
    }

    renderCategoryEntries(entries) {
        return this.sortEntries(entries)
            .map(entry => `
                <div class="category-entry ${entry.type}-entry">
                    <h3>${entry.title}</h3>
                    <p class="date">${this.formatDate(entry.date, entry.endDate)}</p>
                    <p class="description">${entry.description}</p>
                    ${this.renderTechStack(entry)}
                    ${this.renderHighlights(entry)}
                    ${this.renderLinks(entry)}
                </div>
            `).join('');
    }

    renderTechStack(entry) {
        if (!entry.techStack) return '';
        return `
            <div class="tech-stack">
                ${entry.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
    }

    renderLinks(entry) {
        if (!entry.links) return '';
        return `
            <div class="entry-links">
                ${Object.entries(entry.links).map(([type, url]) => `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-${type}">
                        ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </a>
                `).join('')}
            </div>
        `;
    }

    sortEntries(entries) {
        return entries.sort((a, b) => {
            // Sort ongoing experiences first
            if (a.endDate === 'present' && b.endDate !== 'present') return -1;
            if (b.endDate === 'present' && a.endDate !== 'present') return 1;
            
            // Then sort by start date
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            
            // If dates are equal, prioritize education
            if (aDate.getTime() === bDate.getTime()) {
                if (a.type === 'education') return -1;
                if (b.type === 'education') return 1;
            }
            
            return bDate - aDate;
        });
    }

    renderTimeline() {
        this.timelineElement.innerHTML = '';
        const sortedEntries = this.sortEntries([...this.data.entries]);
        sortedEntries.forEach(entry => {
            const entryElement = this.createTimelineEntry(entry);
            this.timelineElement.appendChild(entryElement);
        });
    }

    initialize() {
        this.renderTimeline();
        this.renderTraditionalView();
        this.initializeFilters();
    }

    initializeFilters() {
        const types = [...new Set(this.data.entries.map(entry => entry.type))];
        
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filters';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">All</button>
            ${types.map(type => `
                <button class="filter-btn" data-filter="${type}">
                    ${type.charAt(0).toUpperCase() + type.slice(1)}s
                </button>
            `).join('')}
        `;

        this.timelineElement.parentNode.insertBefore(
            filterContainer, 
            this.timelineElement
        );

        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.dataset.filter;
                this.filterEntries(filter);
                
                // Update active button
                filterContainer.querySelectorAll('.filter-btn')
                    .forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    filterEntries(filter) {
        const entries = this.timelineElement.querySelectorAll('.timeline-entry');
        entries.forEach(entry => {
            const type = entry.querySelector('.type').textContent;
            if (filter === 'all' || type === filter) {
                entry.style.display = '';
            } else {
                entry.style.display = 'none';
            }
        });
    }
}