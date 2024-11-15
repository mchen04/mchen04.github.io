// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

class PortfolioAnimator {
    constructor() {
        // Initialize animation timelines
        this.initializeTypewriter();
        this.initializeHeroAnimations();
        this.initializeScrollAnimations();
        this.initializeParticles();
    }

    initializeTypewriter() {
        const text = "Hi, I'm Michael Chen";
        const typewriter = document.querySelector('.typewriter');
        typewriter.textContent = '';

        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Add blinking cursor animation after typing
                typewriter.insertAdjacentHTML('beforeend', '<span class="cursor">|</span>');
            }
        }, 100);
    }

    initializeHeroAnimations() {
        gsap.from('.hero-content', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        });

        // Parallax effect for dragon background
        document.addEventListener('mousemove', (e) => {
            const dragon = document.querySelector('.dragon-background');
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            gsap.to(dragon, {
                duration: 1,
                x: mouseX * 50,
                y: mouseY * 50,
                ease: 'power1.out'
            });
        });
    }

    initializeScrollAnimations() {
        // Timeline entries animation
        const entries = document.querySelectorAll('.timeline-entry');
        entries.forEach(entry => {
            gsap.from(entry, {
                scrollTrigger: {
                    trigger: entry,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1,
                    toggleActions: 'play none none reverse'
                },
                x: entry.classList.contains('left') ? -100 : 100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });

        // Skills animation
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                },
                width: bar.getAttribute('data-progress') + '%',
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    initializeParticles() {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00A86B' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00A86B',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    createInkEffect(element) {
        const ink = document.createElement('div');
        ink.className = 'ink';
        element.appendChild(ink);

        gsap.to(ink, {
            scale: 3,
            opacity: 0,
            duration: 1,
            onComplete: () => ink.remove()
        });
    }

    initializeHoverEffects() {
        // Add hover effects to navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
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

        // Add ink effect to buttons
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createInkEffect(e.currentTarget);
            });
        });
    }

    initializeTimelineInteractions() {
        document.querySelectorAll('.timeline-entry').forEach(entry => {
            entry.addEventListener('click', () => {
                const content = entry.querySelector('.entry-content');
                const isExpanded = content.classList.contains('expanded');

                gsap.to(content, {
                    height: isExpanded ? 'auto' : 'auto',
                    duration: 0.5,
                    ease: 'power2.out',
                    onStart: () => {
                        if (!isExpanded) content.classList.add('expanded');
                    },
                    onComplete: () => {
                        if (isExpanded) content.classList.remove('expanded');
                    }
                });
            });
        });
    }
}

// Dragon pattern class for background
class DragonPattern {
    constructor() {
        this.createDragonSVG();
    }

    createDragonSVG() {
        const dragonBackground = document.querySelector('.dragon-background');
        dragonBackground.innerHTML = `
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <!-- Dragon pattern will be added here -->
                <path class="dragon-path" d="M100,300 Q200,100 400,300 T700,300" 
                      fill="none" stroke="var(--primary)" stroke-width="2" 
                      opacity="0.2"/>
                <!-- Add more decorative elements -->
            </svg>
        `;
    }

    animateDragon() {
        gsap.to('.dragon-path', {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.out'
        });
    }
}

// Skills visualizer class
class SkillsVisualizer {
    constructor(skillsData) {
        this.skills = skillsData;
        this.initializeSkills();
    }

    initializeSkills() {
        const container = document.querySelector('.skills-grid');
        
        Object.entries(this.skills).forEach(([category, skills]) => {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'skill-category';
            categoryEl.innerHTML = `
                <h3>${category}</h3>
                ${skills.map(skill => this.createSkillBar(skill)).join('')}
            `;
            container.appendChild(categoryEl);
        });
    }

    createSkillBar(skill) {
        return `
            <div class="skill-item">
                <div class="skill-header">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-progress="${skill.level}"></div>
                </div>
            </div>
        `;
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioAnimator();
    const dragon = new DragonPattern();
    const skills = new SkillsVisualizer(portfolioData.skills);

    portfolio.initializeHoverEffects();
    portfolio.initializeTimelineInteractions();
    dragon.animateDragon();
});