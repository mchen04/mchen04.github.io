// data.js
const portfolioData = {
    personalInfo: {
        name: "Michael Chen",
        title: "Software Developer",
        tagline: "Full Stack Developer | Machine Learning Enthusiast",
        github: "https://github.com/mchen04",
        linkedin: "https://linkedin.com/in/yourusername",
        resume: "path/to/resume.pdf"
    },
    entries: [
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
            ],
            duration: "February 2024 – June 2024"
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

    renderTimeline() {
        // Clear existing entries
        this.timelineElement.innerHTML = '';
        
        // Sort entries by date
        const sortedEntries = [...this.data.entries].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        sortedEntries.forEach(entry => {
            const entryElement = this.createTimelineEntry(entry);
            this.timelineElement.appendChild(entryElement);
        });
    }

    createTimelineEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'timeline-entry';
        
        const content = document.createElement('div');
        content.className = 'entry-content';
        
        // Add special styling for awards
        if (entry.type === 'award') {
            content.classList.add('award-entry');
        }
        
        content.innerHTML = `
            <h3>${entry.title}</h3>
            <p class="date">${this.formatDate(entry.date)}</p>
            <p class="type">${entry.type}</p>
            <p class="description">${entry.description}</p>
            ${this.renderTechStack(entry)}
            ${this.renderHighlights(entry)}
            ${this.renderLinks(entry)}
        `;

        // Add click handler for expanding/collapsing
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
        // Group entries by type
        const groupedEntries = this.data.entries.reduce((acc, entry) => {
            acc[entry.type] = acc[entry.type] || [];
            acc[entry.type].push(entry);
            return acc;
        }, {});

        // Clear and render each category
        Object.keys(groupedEntries).forEach(type => {
            let categoryCard = document.querySelector(`.category-card[data-type="${type}"]`);
            
            // Create category card if it doesn't exist (for new types like 'award')
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
        return entries
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(entry => `
                <div class="category-entry">
                    <h3>${entry.title}</h3>
                    <p class="date">${this.formatDate(entry.date)}</p>
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

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
    }

    initialize() {
        this.renderTimeline();
        this.renderTraditionalView();
        this.initializeFilters();
    }

    initializeFilters() {
        // Get unique types from entries
        const types = [...new Set(this.data.entries.map(entry => entry.type))];
        
        // Create filter buttons
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

        // Add filters before timeline
        this.timelineElement.parentNode.insertBefore(
            filterContainer, 
            this.timelineElement
        );

        // Add filter functionality
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