// data.js
const portfolioData = {
    personalInfo: {
        name: "John Doe",
        title: "Software Developer",
        tagline: "Creative Thinker | Problem Solver",
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        resume: "path/to/resume.pdf"
    },
    entries: [
        {
            id: "cutiehack-2023",
            title: "CutieHack – Carbon Emissions Map",
            date: "2023-11",
            type: "project",
            description: "Created an interactive map visualization for carbon emissions data",
            techStack: ["React", "D3.js", "Node.js"],
            links: {
                github: "https://github.com/yourusername/project",
                demo: "https://demo-link.com"
            },
            highlights: [
                "Implemented real-time data visualization",
                "Integrated multiple data sources",
                "Won Best Environmental Impact Hack"
            ]
        },
        {
            id: "aws-cert",
            title: "AWS Certified Cloud Practitioner",
            date: "2023-10",
            type: "certification",
            description: "Achieved AWS certification demonstrating cloud expertise",
            certificationId: "ABC123XYZ",
            issuer: "Amazon Web Services",
            validUntil: "2026-10",
            links: {
                verify: "https://aws.amazon.com/verify"
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
        
        content.innerHTML = `
            <h3>${entry.title}</h3>
            <p class="date">${this.formatDate(entry.date)}</p>
            <p class="type">${entry.type}</p>
            <p class="description">${entry.description}</p>
            ${this.renderTechStack(entry)}
            ${this.renderLinks(entry)}
        `;

        // Add click handler for expanding/collapsing
        content.addEventListener('click', () => {
            content.classList.toggle('expanded');
        });

        entryDiv.appendChild(content);
        return entryDiv;
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
            const categoryCard = document.querySelector(`.category-card[data-type="${type}"]`);
            if (categoryCard) {
                categoryCard.innerHTML = `
                    <h2>${type.charAt(0).toUpperCase() + type.slice(1)}s</h2>
                    ${this.renderCategoryEntries(groupedEntries[type])}
                `;
            }
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