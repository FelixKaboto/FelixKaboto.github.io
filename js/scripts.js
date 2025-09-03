// Modern JavaScript for Felix Kaboto's Portfolio
// Using ES6+ standards and modern web APIs

class PortfolioSite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupAnimations();
        this.setupIntersectionObserver();
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Animate hamburger to X
                if (navMenu.classList.contains('active')) {
                    navToggle.querySelector('.hamburger').style.transform = 'rotate(45deg)';
                    navToggle.querySelector('.hamburger').style.background = 'transparent';
                    navToggle.querySelector('.hamburger::before').style.transform = 'rotate(90deg)';
                    navToggle.querySelector('.hamburger::after').style.transform = 'rotate(90deg)';
                } else {
                    navToggle.querySelector('.hamburger').style.transform = 'rotate(0deg)';
                    navToggle.querySelector('.hamburger').style.background = 'var(--text-primary)';
                }
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    
                    // Reset hamburger
                    const hamburger = navToggle.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.style.transform = 'rotate(0deg)';
                        hamburger.style.background = 'var(--text-primary)';
                    }
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.navbar');
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (nav && !nav.contains(e.target) && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = 'var(--text-primary)';
                }
            }
        });
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = 80; // Height of fixed header
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupMobileNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for navbar styling
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPos = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

    setupFormHandling() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error)';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleFormSubmission(form) {
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('btn-loading');

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateApiCall(data);
            
            // Show success message
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            // Show error message
            this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('btn-loading');
        }
    }

    simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve({ success: true });
            }, 2000);
        });
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">×</button>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: '9999',
            maxWidth: '400px',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-3)',
            border: 'none',
            backgroundColor: type === 'success' ? 'var(--success)' : 'var(--error)',
            color: 'white',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    setupAnimations() {
        // Add entrance animations to elements
        const animatedElements = document.querySelectorAll('.project-card, .flow-item, .stat-item');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Stagger animation
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupIntersectionObserver() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Add animation classes
                    if (entry.target.classList.contains('project-card')) {
                        entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = document.querySelectorAll('.section, .project-card, .flow-item, .stat-item');
        elementsToObserve.forEach(element => observer.observe(element));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSite();
    
    // Add loaded class to body for entrance animation
    document.body.classList.add('loaded');
    
    console.log('Portfolio site loaded successfully! 🚀');
});

// Add CSS for additional features
const additionalStyles = `
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid var(--gray-200);
        box-shadow: var(--shadow-2);
        gap: var(--spacing-sm);
    }

    .nav-toggle.active .hamburger {
        background: transparent;
    }

    .nav-toggle.active .hamburger::before {
        transform: rotate(45deg);
        top: 0;
    }

    .nav-toggle.active .hamburger::after {
        transform: rotate(-45deg);
        bottom: 0;
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-2);
    }

    .nav-link.active {
        color: var(--primary);
        background-color: var(--primary-light);
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--error);
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }

    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .in-view {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }

    /* Enhanced hamburger animation */
    .nav-toggle.active .hamburger::before {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active .hamburger::after {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    /* Loading button animation */
    .btn-loading {
        position: relative;
        color: transparent !important;
    }

    .btn-loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
