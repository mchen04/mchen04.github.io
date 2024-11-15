// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

class PortfolioManager {
    constructor() {
        this.currentSection = 'home';
        this.initializeNavigation();
        this.initializeHeroAnimations();
        this.initializeTimeline();
        this.initializeSkills();
        this.initializeSectionAnimations();
    }

    initializeNavigation() {
        // Handle navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.switchSection(targetId);
            });
        });

        // Handle initial section based on hash
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.switchSection(hash);
        }
    }

    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            
            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });

            // Trigger section-specific animations
            this.animateSection(sectionId);
            
            // Update URL without scrolling
            history.pushState(null, null, `#${sectionId}`);
        }
    }

    initializeHeroAnimations() {
        // Hero section animations
        gsap.from('.hero-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
    }

    initializeTimeline() {
        const timeline = document.querySelector('.timeline');
        const sortedEntries = [...portfolioData.timeline].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        // Calculate timeline dimensions
        const containerWidth = document.querySelector('.timeline-container').offsetWidth;
        const entryWidth = 350; // Width of each entry
        const entryMargin = 30; // Margin between entries
        const entriesPerRow = Math.floor((containerWidth - 50) / (entryWidth + entryMargin));
        
        // Create timeline entries
        sortedEntries.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'timeline-entry';
            
            // Format date display
            const dateDisplay = entry.endDate 
                ? `${this.formatDate(entry.date)} - ${entry.endDate === 'present' ? 'Present' : this.formatDate(entry.endDate)}`
                : this.formatDate(entry.date);

            entryElement.innerHTML = `
                <div class="entry-content">
                    <div class="entry-header">
                        <h3 class="entry-title">${entry.title}</h3>
                        <span class="entry-date">${dateDisplay}</span>
                    </div>
                    <p class="entry-description">${entry.description}</p>
                    ${this.renderTechStack(entry.techStack)}
                    ${this.renderLinks(entry.links || {})}
                </div>
            `;

            timeline.appendChild(entryElement);

            // Calculate position for snaking layout
            const row = Math.floor(index / entriesPerRow);
            const isEvenRow = row % 2 === 0;
            const positionInRow = isEvenRow 
                ? index % entriesPerRow 
                : entriesPerRow - 1 - (index % entriesPerRow);

            const xPos = positionInRow * (entryWidth + entryMargin) + 50;
            const yPos = row * 300; // Height between rows

            gsap.set(entryElement, {
                x: xPos,
                y: yPos,
                opacity: 0
            });

            // Animate entry
            gsap.to(entryElement, {
                opacity: 1,
                duration: 0.5,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: entryElement,
                    start: 'top bottom-=100',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Animate timeline line
        const timelineLine = document.querySelector('.timeline-line');
        const totalRows = Math.ceil(sortedEntries.length / entriesPerRow);
        const totalHeight = totalRows * 300;

        timelineLine.style.height = `${totalHeight}px`;
        
        gsap.set(timelineLine, {
            height: 0
        });

        gsap.to(timelineLine, {
            height: totalHeight,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center',
                end: 'bottom bottom',
                toggleActions: 'play none none reverse'
            }
        });
    }

    renderTechStack(techStack) {
        if (!techStack) return '';
        return `
            <div class="tech-stack">
                ${techStack.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
        `;
    }

    renderLinks(links) {
        if (Object.keys(links).length === 0) return '';
        return `
            <div class="entry-links">
                ${Object.entries(links).map(([type, url]) => `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="entry-link">
                        <i class="fas fa-${this.getLinkIcon(type)}"></i>
                        ${this.formatLinkType(type)}
                    </a>
                `).join('')}
            </div>
        `;
    }

    getLinkIcon(type) {
        const icons = {
            github: 'github',
            demo: 'external-link-alt',
            verify: 'certificate',
            project: 'external-link-alt'
        };
        return icons[type] || 'link';
    }

    formatLinkType(type) {
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }

    initializeSkills() {
        const skillsGrid = document.querySelector('.skills-grid');
        
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
            skillsGrid.appendChild(categoryElement);
        });

        // Animate skill bars
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const level = bar.getAttribute('data-level');
            gsap.to(bar, {
                scaleX: level / 100,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    initializeSectionAnimations() {
        // Animate section headers
        document.querySelectorAll('.section-header').forEach(header => {
            gsap.from(header, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Animate social links
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

    animateSection(sectionId) {
        // Reset scroll position
        window.scrollTo(0, 0);
        
        // Trigger section-specific animations
        switch(sectionId) {
            case 'timeline':
                ScrollTrigger.refresh();
                this.initializeTimeline();
                break;
            case 'skills':
                ScrollTrigger.refresh();
                break;
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});