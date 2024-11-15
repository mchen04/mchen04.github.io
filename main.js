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
        this.initializeGlowEffects();
    }

    initializeNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.switchSection(targetId);
            });

            // Add hover animation for nav links
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    color: 'var(--accent)',
                    textShadow: '0 0 10px var(--accent-glow)',
                    duration: 0.3
                });
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    gsap.to(link, {
                        color: 'var(--text-secondary)',
                        textShadow: 'none',
                        duration: 0.3
                    });
                }
            });
        });

        const hash = window.location.hash.substring(1);
        if (hash) {
            this.switchSection(hash);
        }
    }

    switchSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
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

        // Animate hero background
        gsap.to('.hero-background', {
            opacity: 0.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        // Animate hero content
        tl.from('.hero-content h1', {
            duration: 1.2,
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
        }, '-=0.5')
        .to('.hero-content h1', {
            duration: 2,
            textShadow: '0 0 15px var(--accent-glow)',
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }

    initializeTimeline() {
        const timeline = document.querySelector('.timeline');
        const sortedEntries = [...portfolioData.timeline].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

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

            // Enhanced timeline entry animation
            gsap.from(entryElement, {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                duration: 1,
                scrollTrigger: {
                    trigger: entryElement,
                    start: 'top bottom-=100',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                }
            });

            // Glow effect for timeline pearl
            const pearl = entryElement.querySelector('.timeline-pearl');
            gsap.to(pearl, {
                boxShadow: '0 0 15px var(--accent-glow)',
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        });
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

            // Enhanced skill bar animations
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

                // Add glow effect on hover
                const skillItem = bar.closest('.skill-item');
                skillItem.addEventListener('mouseenter', () => {
                    gsap.to(bar, {
                        boxShadow: '0 0 10px var(--accent-glow)',
                        duration: 0.3
                    });
                });

                skillItem.addEventListener('mouseleave', () => {
                    gsap.to(bar, {
                        boxShadow: 'none',
                        duration: 0.3
                    });
                });
            });
        });
    }

    initializeGlowEffects() {
        // Glow effect for section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.to(header, {
                duration: 2,
                repeat: -1,
                yoyo: true,
                textShadow: '0 0 15px var(--accent-glow)',
                ease: 'power1.inOut'
            });
        });

        // Enhanced social links animation
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    color: 'var(--accent)',
                    textShadow: '0 0 10px var(--accent-glow)',
                    duration: 0.3
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    color: 'var(--text-secondary)',
                    textShadow: 'none',
                    duration: 0.3
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