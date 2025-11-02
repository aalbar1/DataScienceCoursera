// ===== Navigation Menu Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : '';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : '';
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== News Banner Animation =====
const newsItems = document.querySelectorAll('.news-item');
let currentNewsIndex = 0;

function rotateNews() {
    newsItems[currentNewsIndex].classList.remove('active');
    currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    newsItems[currentNewsIndex].classList.add('active');
}

// Rotate news every 8 seconds
if (newsItems.length > 0) {
    setInterval(rotateNews, 8000);
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll('.service-detail, .article-card, .knowledge-card, .consultation-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Show success message (in a real application, this would send data to a server)
        showNotification('?? ????? ?????? ?????! ??????? ??? ??????', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Form Validation =====
function validateForm(data) {
    // Validate name
    if (data.name.trim().length < 2) {
        showNotification('?????? ????? ??? ????', 'error');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('?????? ????? ???? ???????? ????', 'error');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
        showNotification('?????? ????? ??? ???? ????', 'error');
        return false;
    }
    
    // Validate service
    if (!data.service) {
        showNotification('?????? ?????? ?????? ????????', 'error');
        return false;
    }
    
    // Validate message
    if (data.message.trim().length < 10) {
        showNotification('?????? ????? ????? ????? ??? 10 ???? ??? ?????', 'error');
        return false;
    }
    
    return true;
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        backgroundColor: type === 'success' ? '#00C896' : '#FF6B6B',
        color: 'white',
        fontWeight: '600',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.16)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== Active Navigation Link Highlighting =====
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ===== Lazy Loading for Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Service Cards Click Tracking (for analytics) =====
const serviceCards = document.querySelectorAll('.service-detail');
serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // In a real application, this would send data to analytics
        const serviceTitle = card.querySelector('.service-title')?.textContent;
        console.log(`Service viewed: ${serviceTitle}`);
    });
});

// ===== CTA Button Click Tracking =====
const ctaButtons = document.querySelectorAll('.service-cta .btn, .section-cta .btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // In a real application, this would send data to analytics
        const buttonText = button.textContent.trim();
        const section = button.closest('section')?.id || 'unknown';
        console.log(`CTA clicked: ${buttonText} in ${section}`);
    });
});

// ===== Article Card Hover Effects =====
const articleCards = document.querySelectorAll('.article-card');
articleCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.article-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.article-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ===== Prevent Form Resubmission on Page Reload =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== Console Welcome Message =====
console.log('%c?? DBSO - ???? ?????????? ?????', 'font-size: 20px; font-weight: bold; color: #0066FF;');
console.log('%c?????? ?? ?? ???? DBSO! ??? ??? ???????? ?? ???? ?????? ??????', 'font-size: 14px; color: #00C896;');
console.log('%c?? ???????: info@dbso.sa', 'font-size: 12px; color: #666;');

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`? Page loaded in ${loadTime}ms`);
});

// ===== Accessibility Improvements =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
});

// Add focus visible for better keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });
    
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
});

// ===== Add smooth transitions to dynamic content =====
const style = document.createElement('style');
style.textContent = `
    .using-mouse *:focus {
        outline: none;
    }
    
    :not(.using-mouse) *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ===== Initialize all features on page load =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('? Website initialized successfully');
    
    // Add smooth reveal animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
    
    // Initialize all tooltips and interactive elements
    initializeInteractiveElements();
});

// ===== Interactive Elements Initialization =====
function initializeInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Browser Compatibility Checks =====
(function checkBrowserCompatibility() {
    // Check for modern features
    const features = {
        IntersectionObserver: 'IntersectionObserver' in window,
        CustomProperties: CSS.supports('color', 'var(--test)'),
        Grid: CSS.supports('display', 'grid'),
        Flexbox: CSS.supports('display', 'flex')
    };
    
    const unsupportedFeatures = Object.entries(features)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);
    
    if (unsupportedFeatures.length > 0) {
        console.warn('?? Some features may not work in this browser:', unsupportedFeatures.join(', '));
    }
})();
