/**
 * Japanese Minimalism Portfolio - Zen-like Interactions
 * Sophisticated JavaScript with purposeful animations and micro-interactions
 */

class ZenPortfolio {
  constructor() {
    this.scrollProgress = 0;
    this.rafId = null;
    this.isModalOpen = false;
    this.observers = new Map();
    
    this.init();
  }

  init() {
    this.setupScrollProgress();
    this.setupIntersectionObservers();
    this.setupProjectModals();
    this.setupSmoothScrolling();
    this.setupKeyboardNavigation();
    this.setupPerformanceMonitoring();
    this.setupMicroInteractions();
    
    console.log('🎋 Zen Portfolio initialized with mindful interactions');
  }

  /**
   * Scroll Progress Indicator - Subtle and Purposeful
   */
  setupScrollProgress() {
    // Create scroll indicator element
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    const updateScrollProgress = () => {
      const scrolled = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = Math.min(scrolled / maxScroll, 1);
      
      indicator.style.transform = `scaleX(${this.scrollProgress})`;
      
      // Update navigation opacity based on scroll
      const nav = document.querySelector('.navigation');
      if (nav) {
        const opacity = scrolled > 100 ? 0.95 : 0.9;
        nav.style.background = `rgba(250, 249, 247, ${opacity})`;
      }
    };

    // Throttled scroll handler for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(); // Initial call
  }

  /**
   * Intersection Observer for Performance-Optimized Animations
   */
  setupIntersectionObservers() {
    // Animation observer for fade-in effects
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { 
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1 
      }
    );

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll(
      '.project-card, .about-content > *, .contact-content > *'
    );
    
    animateElements.forEach((el, index) => {
      // Stagger initial state
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s, 
                             transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
      
      animationObserver.observe(el);
    });

    this.observers.set('animation', animationObserver);
  }

  /**
   * Project Modal System with Detailed Information
   */
  setupProjectModals() {
    const projectData = {
      'philip': {
        title: 'PHiLIP: Personalized Human-in-Loop Image Production',
        subtitle: 'AMD Award-Winning AI Image Generation Suite',
        description: `Winner of the AMD University Program Award at the AMD Pervasive AI Developer Contest. 
                     PHiLIP is an advanced AI-powered image generation platform featuring 2-second generation times, 
                     71 unique style options, and iterative user-guided refinement using fine-tuned PixArt-alpha models.`,
        features: [
          'Ultra-fast 2-second image generation times',
          '71 distinct artistic style options for creative flexibility',
          'Human-in-the-loop iterative refinement system',
          'Fine-tuned PixArt-alpha models optimized for AMD GPUs',
          'Scalable Flask API with dynamic model switching',
          'React frontend with seamless creative workflow integration',
          'Live demo showcased at AMD Advancing AI Event 2024'
        ],
        technologies: ['Flask', 'React', 'PixArt-alpha', 'AMD Instinct MI210', 'Python', 'PyTorch'],
        github: 'https://github.com/mchen04/PHiLIP',
        live: '#',
        reward: 'https://www.hackster.io/contests/amd2023#category-1092',
        achievement: 'AMD University Program Award Winner'
      },
      'grantify': {
        title: 'Grantify.ai',
        subtitle: 'AI-Driven Grant Discovery Platform',
        description: `A comprehensive grant discovery platform leveraging Next.js 15 and advanced AI to connect 
                     researchers with funding opportunities. Features enterprise-grade security, intelligent 
                     semantic matching, and automated data processing pipelines.`,
        features: [
          'AI-powered semantic matching using Google Gemini',
          'pgvector similarity search for 85% improved match accuracy',
          'Enterprise security with JWT, RLS, and CSRF protection',
          'Automated grant scraping with 500+ daily updates',
          'Advanced filtering and intelligent caching system',
          'Comprehensive error handling and deduplication',
          'Scalable PostgreSQL database with Supabase integration'
        ],
        technologies: ['Next.js 15', 'TypeScript', 'React', 'Supabase', 'PostgreSQL', 'Google Gemini', 'pgvector', 'Node.js'],
        github: 'https://github.com/mchen04/grantify',
        live: '#',
        achievement: 'Current Active Project'
      },
      'songsmith': {
        title: 'SongsmithAI',
        subtitle: 'LSTM Neural Network for Creative Lyric Generation',
        description: `Advanced natural language processing application that generates creative lyrics using 
                     LSTM neural networks. Integrates with Spotify and Genius APIs for comprehensive music 
                     data collection and analysis.`,
        features: [
          'LSTM neural networks for creative text generation',
          'Spotify API integration for music data collection',
          'Genius API integration for lyric analysis',
          'Advanced data preprocessing and model training pipelines',
          'End-to-end machine learning project architecture',
          'Creative AI applications in music industry'
        ],
        technologies: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'Spotify API', 'Genius API', 'NumPy', 'Pandas'],
        github: 'https://github.com/mchen04/SongsmithAI',
        live: '#'
      },
      'kelly-criterion': {
        title: 'Kelly Criterion Chrome Extension',
        subtitle: 'Mathematical Sports Betting Analytics',
        description: `Chrome extension implementing the Kelly Criterion mathematical formula for optimal 
                     bet sizing in sports betting. Features dynamic URL parameter filtering and advanced 
                     financial optimization algorithms.`,
        features: [
          'Kelly Criterion mathematical algorithm implementation',
          'Dynamic URL parameter filtering and configuration',
          'Chrome extension API integration',
          'Local storage management for user preferences',
          'Per-page configuration and settings',
          'Financial optimization and risk management tools'
        ],
        technologies: ['JavaScript', 'Chrome Extension APIs', 'HTML/CSS', 'Mathematical Algorithms', 'Local Storage'],
        github: 'https://github.com/mchen04/kelly_criterion_google_extension',
        live: '#'
      },
      'news-genie': {
        title: 'News Genie',
        subtitle: 'Personalized News Platform',
        description: `Full-stack web application providing personalized news experiences with real-time 
                     categorization and archiving. Features modern deployment practices and modular architecture.`,
        features: [
          'Real-time news categorization and archiving',
          'Personalized content recommendations',
          'Modern React frontend with TypeScript',
          'Flask backend API with robust data processing',
          'Firebase integration for real-time features',
          'Production deployment on Vercel and Render',
          'Modular architecture with clean separation of concerns'
        ],
        technologies: ['React', 'TypeScript', 'Flask', 'Firebase', 'Vercel', 'Render', 'Python'],
        github: 'https://github.com/mchen04/news-genie',
        live: '#'
      },
      'mafway': {
        title: 'MafWay',
        subtitle: 'AI-Powered Mathematical Formula Recognition',
        description: `CitrusHack project leveraging artificial intelligence for mathematical formula recognition 
                     through advanced image processing. Features deep learning models for real-time recognition 
                     of mathematical expressions from images.`,
        features: [
          'Deep learning-powered image recognition for mathematical formulas',
          'Real-time processing of mathematical expressions',
          'Support for various mathematical notations and symbols',
          'Web-based interface for easy interaction',
          'Custom trained machine learning models',
          'Advanced image preprocessing and recognition pipeline'
        ],
        technologies: ['Python', 'Deep Learning', 'Image Recognition', 'Machine Learning', 'Web Development'],
        github: 'https://github.com/mchen04/MafWay',
        live: '#',
        achievement: 'CitrusHack Project'
      },
      'homebase': {
        title: 'HomeBase',
        subtitle: 'Shared Home Management Platform',
        description: `Collaborative home management app designed to help roommates coordinate household tasks, 
                     expenses, and responsibilities. Features comprehensive chore management, expense tracking, 
                     and notification systems for seamless roommate collaboration.`,
        features: [
          'Create and assign chores with due dates and tracking',
          'Automatic task rotation among roommates',
          'Shared expense tracking and cost calculation',
          'Real-time notifications for upcoming tasks',
          'User profiles and household management',
          'Task completion tracking and reminders'
        ],
        technologies: ['React', 'Node.js', 'SQL', 'Firebase', 'JavaScript', 'Full-Stack Development'],
        github: 'https://github.com/mchen04/homebase',
        live: '#'
      },
      'carbon-footprint': {
        title: 'Flashy Carbon Footprint Estimator',
        subtitle: 'AI-Powered Environmental Impact Tracker',
        description: `Modern hackathon project that estimates carbon footprint using AI and natural language 
                     processing. Features dual visual themes, interactive animations, and personalized 
                     environmental recommendations powered by OpenAI's API.`,
        features: [
          'AI-powered carbon footprint analysis through natural language input',
          'Detailed emissions breakdown by activity category',
          'Personalized environmental impact reduction suggestions',
          'Dual visual themes: Cyberpunk and Nature',
          'Interactive user experience with smooth animations',
          'Real-time data visualization and insights'
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Framer Motion', 'GSAP', 'D3.js', 'Vite'],
        github: 'https://github.com/mchen04/flashy-Carbon-Footprint-Estimator',
        live: '#',
        achievement: 'Hackathon Project'
      }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Show image button click handlers
    document.querySelectorAll('.show-image-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projectId = btn.dataset.project;
        const project = projectData[projectId];
        
        if (project) {
          this.openProjectModal(project, modal, modalBody);
        }
      });
    });

    // Close modal handlers
    const closeModal = () => this.closeProjectModal(modal);
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        closeModal();
      }
    });
  }

  openProjectModal(project, modal, modalBody) {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    
    modalBody.innerHTML = `
      <div class="modal-project">
        <div class="modal-content-wrapper">
          <header class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
            ${project.achievement ? `<div class="modal-achievement">${project.achievement}</div>` : ''}
          </header>
          
          <div class="modal-description">
            <p>${project.description}</p>
          </div>
          
          <div class="modal-features">
            <h3>Key Features & Technical Highlights</h3>
            <ul>
              ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-tech">
            <h3>Technologies & Tools</h3>
            <div class="tech-tags">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>
          
          <div class="modal-links">
            <a href="${project.github}" class="modal-link" target="_blank" rel="noopener">
              <span>View on GitHub</span>
            </a>
            ${project.live && project.live !== '#' ? `
              <a href="${project.live}" class="modal-link primary" target="_blank" rel="noopener">
                <span>Live Demo</span>
              </a>
            ` : ''}
            ${project.reward ? `
              <a href="${project.reward}" class="modal-link reward" target="_blank" rel="noopener">
                <span>View Reward</span>
              </a>
            ` : ''}
          </div>
        </div>
    `;

    // Add styles for modal content
    this.addModalStyles();
    
    modal.classList.add('active');
    
    // Focus management for accessibility
    setTimeout(() => {
      const firstFocusable = modal.querySelector('button, a, [tabindex]');
      if (firstFocusable) firstFocusable.focus();
    }, 300);
  }

  closeProjectModal(modal) {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    modal.classList.remove('active');
  }

  addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
      .modal-project {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .modal-header {
        margin-bottom: var(--space-lg);
      }
      
      .modal-title {
        font-size: var(--font-size-2xl);
        color: var(--color-sumi);
        margin-bottom: var(--space-xs);
      }
      
      .modal-subtitle {
        color: var(--color-nezumi);
        font-size: var(--font-size-lg);
        font-weight: 300;
      }
      
      .modal-achievement {
        display: inline-block;
        padding: var(--space-xs) var(--space-md);
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #8b4513;
        border-radius: 20px;
        font-size: var(--font-size-sm);
        font-weight: 600;
        margin-top: var(--space-sm);
        box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
      }
      
      .modal-description {
        margin-bottom: var(--space-lg);
        color: var(--color-nezumi);
        line-height: 1.7;
      }
      
      .modal-features, .modal-tech {
        margin-bottom: var(--space-lg);
      }
      
      .modal-features h3, .modal-tech h3 {
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-md);
        color: var(--color-sumi);
      }
      
      .modal-features ul {
        list-style: none;
        padding: 0;
      }
      
      .modal-features li {
        padding: var(--space-xs) 0;
        color: var(--color-nezumi);
        position: relative;
        padding-left: var(--space-md);
      }
      
      .modal-features li::before {
        content: '•';
        color: var(--color-kohaku);
        position: absolute;
        left: 0;
      }
      
      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
      }
      
      .modal-links {
        display: flex;
        gap: var(--space-md);
        margin-top: var(--space-xl);
      }
      
      .modal-link {
        padding: var(--space-sm) var(--space-lg);
        border: 1px solid var(--color-nezumi);
        border-radius: 6px;
        text-decoration: none;
        color: var(--color-nezumi);
        transition: all var(--transition-fast);
        font-weight: 500;
      }
      
      .modal-link:hover {
        border-color: var(--color-sumi);
        color: var(--color-sumi);
        transform: translateY(-2px);
      }
      
      .modal-link.primary {
        background: var(--color-sumi);
        color: var(--color-washi);
        border-color: var(--color-sumi);
      }
      
      .modal-link.primary:hover {
        background: var(--color-sabizome);
        border-color: var(--color-sabizome);
        color: var(--color-washi);
      }
      
      @media (max-width: 768px) {
        .modal-links {
          flex-direction: column;
        }
        
        .modal-link {
          text-align: center;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  /**
   * Smooth Scrolling for Navigation Links
   */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Keyboard Navigation and Accessibility
   */
  setupKeyboardNavigation() {
    // Tab navigation enhancement
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('click', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
      .keyboard-navigation *:focus {
        outline: 2px solid var(--color-kohaku) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(focusStyles);
  }

  /**
   * Performance Monitoring and Optimization
   */
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('performance' in window && 'PerformanceObserver' in window) {
      const vitals = {};
      
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            vitals.fcp = entry.startTime;
          }
          if (entry.entryType === 'largest-contentful-paint') {
            vitals.lcp = entry.startTime;
          }
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            vitals.cls = (vitals.cls || 0) + entry.value;
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
      
      // Log performance metrics after page load
      window.addEventListener('load', () => {
        setTimeout(() => {
          console.log('🎯 Performance Metrics:', {
            'First Contentful Paint': vitals.fcp ? `${Math.round(vitals.fcp)}ms` : 'N/A',
            'Largest Contentful Paint': vitals.lcp ? `${Math.round(vitals.lcp)}ms` : 'N/A',
            'Cumulative Layout Shift': vitals.cls ? vitals.cls.toFixed(3) : 'N/A'
          });
        }, 3000);
      });
    }

    // Memory usage monitoring
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        
        if (usedMB > 50) { // Alert if memory usage is high
          console.warn(`🚨 High memory usage: ${usedMB}MB`);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Subtle Micro-interactions for Enhanced UX
   */
  setupMicroInteractions() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const geometricAccent = document.querySelector('.geometric-accent');
    
    if (hero && geometricAccent) {
      let ticking = false;
      
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        geometricAccent.style.transform = `translateY(${rate}px)`;
        ticking = false;
      };
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
    }

    // Enhanced hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
      let hoverTimeout;
      
      card.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          card.style.transform = 'translateY(0) scale(1)';
        }, 100);
      });
    });

    // Cursor enhancement for interactive elements
    this.setupCursorEnhancements();
  }

  /**
   * Cursor Enhancements for Premium Feel
   */
  setupCursorEnhancements() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div>';
    document.body.appendChild(cursor);

    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .cursor-dot {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--color-kohaku);
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
      }
      
      .custom-cursor.active {
        opacity: 0.6;
      }
      
      .custom-cursor.hover {
        transform: scale(1.5);
      }
      
      @media (hover: none) {
        .custom-cursor { display: none; }
      }
    `;
    document.head.appendChild(cursorStyles);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Smooth cursor animation
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  /**
   * Cleanup function for observers and event listeners
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    if (this.rafId) cancelAnimationFrame(this.rafId);
    console.log('🍃 Zen Portfolio cleaned up mindfully');
  }
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.zenPortfolio = new ZenPortfolio();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.zenPortfolio) {
    window.zenPortfolio.destroy();
  }
});