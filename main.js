// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

class PortfolioManager {
    constructor() {
        this.initializeContent();
        this.initializeScrollEffects();
        this.initializeNavigation();
        this.initializeHeroAnimations();
        this.initializeTimeline();
        this.initializeSkills();
        this.initializeSectionAnimations();
        this.initializeGlowEffects();
    }

    initializeContent() {
        // Initialize personal info
        document.getElementById('nav-name').textContent = portfolioData.personalInfo.name;
        document.getElementById('hero-name').textContent = portfolioData.personalInfo.name;
        document.getElementById('hero-tagline').textContent = portfolioData.personalInfo.tagline;
        document.getElementById('hero-title').textContent = portfolioData.personalInfo.title;
        document.getElementById('about-text').textContent = portfolioData.personalInfo.about;

        // Initialize contact links
        document.getElementById('email-link').href = `mailto:${portfolioData.personalInfo.email}`;
        document.getElementById('github-link').href = portfolioData.personalInfo.github;
        document.getElementById('linkedin-link').href = portfolioData.personalInfo.linkedin;
    }

    initializeScrollEffects() {
        ScrollTrigger.defaults({
            toggleActions: 'play none none reverse'
        });
    }

    initializeNavigation() {
        // Mobile menu functionality
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-link');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });

            // Close menu when clicking a link
            navLinksItems.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }

        // Smooth scroll functionality
        document.querySelectorAll('.nav-link, .nav-logo').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            const navHeight = document.querySelector('.nav-content').offsetHeight;

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - navHeight - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
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
            entryElement.id = entry.id;
            
            if (entry.type) {
                entryElement.setAttribute('data-type', entry.type);
            }
            
            const dateDisplay = entry.endDate 
                ? `${this.formatDate(entry.date)} - ${entry.endDate === 'present' ? 'Present' : this.formatDate(entry.endDate)}`
                : this.formatDate(entry.date);

            let mediaCarousel = '';
            if (entry.media && entry.media.length > 0) {
                mediaCarousel = this.createMediaCarousel(entry.media, entry.id);
            }

            entryElement.innerHTML = `
                <div class="timeline-pearl"></div>
                ${entry.type ? `<span class="entry-type">${entry.type}</span>` : ''}
                <div class="entry-header">
                    <h3 class="entry-title">${entry.title}</h3>
                    <span class="entry-date">${dateDisplay}</span>
                </div>
                <p class="entry-description">${entry.description}</p>
                ${mediaCarousel}
                ${this.renderTechStack(entry.techStack)}
                ${this.renderLinks(entry.links || {})}
            `;

            timeline.appendChild(entryElement);

            // Initialize Swiper if media exists
            if (entry.media && entry.media.length > 0) {
                const hasMultipleSlides = entry.media.length > 1;
                const swiper = new Swiper(`#swiper-${entry.id}`, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: hasMultipleSlides,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: hasMultipleSlides
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        enabled: hasMultipleSlides
                    },
                    autoplay: hasMultipleSlides ? {
                        delay: 5000,
                        disableOnInteraction: false
                    } : false
                });

                // Handle media loading and errors
                const slides = entryElement.querySelectorAll('.swiper-slide');
                slides.forEach(slide => {
                    const media = slide.querySelector('img, video, iframe');
                    if (media) {
                        media.addEventListener('load', () => {
                            media.classList.add('loaded');
                            slide.classList.remove('error');
                        });

                        media.addEventListener('error', () => {
                            slide.classList.add('error');
                        });

                        // For iframes (YouTube) and videos, add loaded class after a delay
                        if (media.tagName === 'IFRAME' || media.tagName === 'VIDEO') {
                            setTimeout(() => {
                                media.classList.add('loaded');
                                slide.classList.remove('error');
                            }, 1000);
                        }
                    }
                });

                // Update Swiper on media load
                swiper.on('slideChange', () => {
                    const activeSlide = slides[swiper.activeIndex];
                    const media = activeSlide.querySelector('img, video, iframe');
                    if (media && !media.classList.contains('loaded')) {
                        media.src = media.src;
                    }
                });
            }

            // Animate entry
            gsap.from(entryElement, {
                scrollTrigger: {
                    trigger: entryElement,
                    start: 'top bottom-=100'
                },
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                duration: 1
            });

            // Animate pearl
            const pearl = entryElement.querySelector('.timeline-pearl');
            gsap.to(pearl, {
                scrollTrigger: {
                    trigger: pearl,
                    start: 'top bottom'
                },
                boxShadow: '0 0 15px var(--accent-glow)',
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        });
    }

    createMediaCarousel(media, entryId) {
        if (!media || media.length === 0) return '';

        const slides = media.map(item => {
            if (item.type === 'youtube') {
                return `
                    <div class="swiper-slide">
                        <iframe 
                            src="${item.url}" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
            } else if (item.type === 'video') {
                return `
                    <div class="swiper-slide">
                        <video controls playsinline>
                            <source src="${item.url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
            } else if (item.type === 'image') {
                return `
                    <div class="swiper-slide">
                        <img src="${item.url}" alt="Project media" loading="lazy">
                    </div>
                `;
            }
            return '';
        }).join('');

        return `
            <div class="media-carousel">
                <div class="swiper" id="swiper-${entryId}">
                    <div class="swiper-wrapper">
                        ${slides}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        `;
    }

    initializeSkills() {
        const skillsGrid = document.querySelector('.skills-grid');
        
        Object.entries(portfolioData.skills).forEach(([category, skills]) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category';
            
            const skillsList = skills.map(skill => 
                `<div class="skill-item">${skill}</div>`
            ).join('');

            categoryElement.innerHTML = `
                <h3>${category}</h3>
                <div class="skill-list">
                    ${skillsList}
                </div>
            `;
            
            skillsGrid.appendChild(categoryElement);

            // Animate category
            gsap.from(categoryElement, {
                scrollTrigger: {
                    trigger: categoryElement,
                    start: 'top bottom-=50',
                    toggleActions: 'restart none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            // Animate individual skills
            const skillItems = categoryElement.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: categoryElement,
                        start: 'top bottom-=50',
                        toggleActions: 'restart none none reverse'
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            });
        });
    }

    initializeGlowEffects() {
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.to(header, {
                duration: 2,
                repeat: -1,
                yoyo: true,
                textShadow: '0 0 15px var(--accent-glow)',
                ease: 'power1.inOut'
            });
        });

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
        gsap.utils.toArray('.section').forEach(section => {
            if (section.id !== 'home') {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom-=100'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
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
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
