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
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.switchSection(targetId);
            });
        });

        const hash = window.location.hash.substring(1);
        if (hash) {
            this.switchSection(hash);
        }
    }

    switchSection(sectionId) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });

            this.animateSection(sectionId);
            history.pushState(null, null, `#${sectionId}`);
        }
    }

    initializeHeroAnimations() {
        const tl = gsap.timeline();

        tl.from('.hero-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-description', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5');
    }

    initializeTimeline() {
        const timeline = document.querySelector('.timeline');
        const sortedEntries = [...portfolioData.timeline].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        // Clear existing entries
        timeline.innerHTML = '';
        
        sortedEntries.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'timeline-entry';
            
            const dateDisplay = entry.endDate 
                ? `${this.formatDate(entry.date)} - ${entry.endDate === 'present' ? 'Present' : this.formatDate(entry.endDate)}`
                : this.formatDate(entry.date);

            entryElement.innerHTML = `
                <div class="timeline-pearl"></div>
                <div class="entry-header">
                    <h3 class="entry-title">${entry.title}</h3>
                    <span class="entry-date">${dateDisplay}</span>
                </div>
                <p class="entry-description">${entry.description}</p>
                ${this.renderTechStack(entry.techStack)}
                ${this.renderLinks(entry.links || {})}
            `;

            timeline.appendChild(entryElement);

            // Animate entry
            gsap.from(entryElement, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: entryElement,
                    start: 'top bottom-=100',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate pearl
            const pearl = entryElement.querySelector('.timeline-pearl');
            gsap.from(pearl, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                delay: index * 0.2 + 0.3,
                ease: 'back.out(1.7)'
            });
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

            // Animate skill bars
            categoryElement.querySelectorAll('.skill-progress').forEach(bar => {
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
        });
    }

    initializeSectionAnimations() {
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
        window.scrollTo(0, 0);
        
        switch(sectionId) {
            case 'timeline':
                ScrollTrigger.refresh();
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
