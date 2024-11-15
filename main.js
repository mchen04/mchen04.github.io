// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

class PortfolioAnimator {
    constructor() {
        this.initializeHeroAnimations();
        this.initializeTimeline();
        this.initializeSkills();
        this.initializeScrollAnimations();
        this.initializeNavigation();
    }

    initializeHeroAnimations() {
        // Animate hero content on load
        gsap.from('.hero-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
    }

    initializeTimeline() {
        const timelineContainer = document.querySelector('.timeline');
        const filterButtons = document.querySelectorAll('.filter-button');

        // Sort entries by date
        const sortedEntries = [...portfolioData.timeline].sort((a, b) => {
            // Handle 'present' endDate
            if (a.endDate === 'present') return -1;
            if (b.endDate === 'present') return 1;
            
            // Compare dates
            const dateA = new Date(a.endDate || a.date);
            const dateB = new Date(b.endDate || b.date);
            return dateB - dateA;
        });

        // Render timeline entries
        this.renderTimelineEntries(sortedEntries);

        // Initialize filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter entries
                const filteredEntries = filter === 'all' 
                    ? sortedEntries 
                    : sortedEntries.filter(entry => entry.type === filter);

                this.renderTimelineEntries(filteredEntries);
            });
        });
    }

    renderTimelineEntries(entries) {
        const timelineContainer = document.querySelector('.timeline');
        timelineContainer.innerHTML = '';

        entries.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'timeline-entry';
            
            // Format date display
            const dateDisplay = entry.endDate 
                ? `${this.formatDate(entry.date)} - ${entry.endDate === 'present' ? 'Present' : this.formatDate(entry.endDate)}`
                : this.formatDate(entry.date);

            // Create entry content
            entryElement.innerHTML = `
                <div class="entry-content ${entry.type}-entry">
                    <div class="entry-header">
                        <h3 class="entry-title">${entry.title}</h3>
                        <span class="entry-date">${dateDisplay}</span>
                    </div>
                    <p class="entry-description">${entry.description}</p>
                    ${this.renderTechStack(entry.techStack)}
                    ${this.renderLinks(entry.links)}
                </div>
            `;

            timelineContainer.appendChild(entryElement);

            // Animate entry
            gsap.from(entryElement, {
                duration: 0.8,
                opacity: 0,
                y: 50,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: entryElement,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    renderTechStack(techStack) {
        if (!techStack) return '';
        return `
            <div class="entry-tech">
                ${techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
    }

    renderLinks(links) {
        if (!links) return '';
        return `
            <div class="entry-links">
                ${Object.entries(links).map(([type, url]) => `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="entry-link">
                        <i class="fas fa-${type === 'github' ? 'github' : 
                                       type === 'verify' ? 'certificate' : 
                                       type === 'project' ? 'external-link-alt' : 'link'}"></i>
                        ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </a>
                `).join('')}
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }

    initializeSkills() {
        const skillsContainer = document.querySelector('.skills-grid');
        
        // Create and populate skill categories
        Object.entries(portfolioData.skills).forEach(([category, skills]) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category';
            categoryElement.innerHTML = `
                <h3>${category}</h3>
                ${skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-header">
                            <span>${skill.name}</span>
                            <span>${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-level="${skill.level}"></div>
                        </div>
                    </div>
                `).join('')}
            `;
            skillsContainer.appendChild(categoryElement);
        });

        // Animate skill bars on scroll
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const level = bar.getAttribute('data-level');
            
            ScrollTrigger.create({
                trigger: bar,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(bar, {
                        scaleX: level / 100,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    initializeScrollAnimations() {
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Animate skill categories
        gsap.utils.toArray('.skill-category').forEach((category, i) => {
            gsap.from(category, {
                scrollTrigger: {
                    trigger: category,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: i * 0.2,
                ease: 'power3.out'
            });
        });
    }

    initializeNavigation() {
        // Smooth scroll for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Highlight active section in navigation
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Social links animation
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimator();
});

// Handle window resize events
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});