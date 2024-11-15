// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

class PortfolioManager {
    constructor() {
        this.currentSection = 'home';
        this.threeScene = null;
        this.initializeThreeJS();
        this.initializeNavigation();
        this.initializeHeroAnimations();
        this.initializeTimeline();
        this.initializeSkills();
        this.initializeSectionAnimations();
    }

    initializeThreeJS() {
        const canvas = document.getElementById('three-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create geometric particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: '#00A86B',
            transparent: true,
            opacity: 0.5
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.001;
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.threeScene = { scene, camera, renderer, particles };
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

        // Animate ink brush strokes
        const paths = document.querySelectorAll('.ink-brush path');
        paths.forEach((path, index) => {
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0.1
            });

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 2,
                delay: index * 0.5,
                ease: 'power2.out'
            });
        });
    }

    createDragonPath() {
        const container = document.querySelector('.timeline-container');
        const svg = document.querySelector('.timeline-dragon');
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // Create a snaking path that resembles a dragon's body
        const numPoints = Math.ceil(height / 200);
        const points = [];
        const amplitude = width * 0.3;

        for (let i = 0; i < numPoints; i++) {
            const y = (i / (numPoints - 1)) * height;
            const x = Math.sin((i / (numPoints - 1)) * Math.PI * 2) * amplitude + width / 2;
            points.push(`${x},${y}`);
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${points.join(' L ')}`);
        path.setAttribute('stroke', '#00A86B');
        path.setAttribute('stroke-width', '4');
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', '0.2');

        svg.appendChild(path);
        return path;
    }

    initializeTimeline() {
        const timeline = document.querySelector('.timeline');
        const dragonPath = this.createDragonPath();
        
        const sortedEntries = [...portfolioData.timeline].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        sortedEntries.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'timeline-entry';
            
            const dateDisplay = entry.endDate 
                ? `${this.formatDate(entry.date)} - ${entry.endDate === 'present' ? 'Present' : this.formatDate(entry.endDate)}`
                : this.formatDate(entry.date);

            entryElement.innerHTML = `
                <div class="timeline-pearl"></div>
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
        });

        // Animate dragon path
        const pathLength = dragonPath.getTotalLength();
        gsap.set(dragonPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });

        gsap.to(dragonPath, {
            strokeDashoffset: 0,
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
