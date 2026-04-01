/**
 * Custom Mouse Follower Effect
 */
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Only apply if not on mobile (cursor is set to none in desktop CSS)
    if(window.innerWidth > 768) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// Enlarge cursor when clicking
document.addEventListener('mousedown', () => {
    if(window.innerWidth > 768) {
        cursorGlow.style.width = '800px';
        cursorGlow.style.height = '800px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(176, 38, 255, 0.08) 0%, rgba(0, 243, 255, 0.03) 40%, transparent 70%)';
    }
});

document.addEventListener('mouseup', () => {
    if(window.innerWidth > 768) {
        cursorGlow.style.width = '600px';
        cursorGlow.style.height = '600px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, rgba(176, 38, 255, 0.02) 40%, transparent 70%)';
    }
});

/**
 * Loading / Spinner functionality
 */
const loader = document.getElementById('loader');

// Hide loader on initial page load
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000); // 1s visual display for premium feel
});

// Show loader when 'Anasayfa' link/button is clicked
const homeLinks = document.querySelectorAll('a[href="#home"]');

homeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default hash jump to animate smooth
        e.preventDefault();
        
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        
        // Show Spinner
        loader.style.display = 'flex';
        // Force reflow
        void loader.offsetWidth;
        loader.style.opacity = '1';

        setTimeout(() => {
            // Scroll to the top/home
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
            
            // Hide spinner again
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
            
        }, 800); // Fake load time for the effect
    });
});

/**
 * Navbar Functionality & Scroll Spy
 */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Add background to navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll Spy: Highlight active nav link safely
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll for Other Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if(this.getAttribute('href') === '#home') return; // Handled by spinner logic

        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if(targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Mobile Menu Toggle
 */
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

/**
 * WhatsApp Floating Button Logic
 * Shows up only after scrolling past 70% of the viewport height
 */
const whatsappBtn = document.getElementById('whatsapp-btn');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // 70% of the first section (viewport)
    const triggerPoint = windowHeight * 0.70;

    if (scrollPosition > triggerPoint) {
        whatsappBtn.classList.add('show');
    } else {
        whatsappBtn.classList.remove('show');
    }
});

/**
 * Typing Animation
 */
const words = ["Frontend Developer.", "UI/UX Tasarımcısı.", "Yazılım Mühendisi.", "Kod Gönüllüsü."];
const typingText = document.getElementById('typing-text');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // ms

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Deleting is faster
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Typing is normal speed
    }

    // Determine what happens next based on state
    if (!isDeleting && charIndex === currentWord.length) {
        // Word finished typing, pause before deleting
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Word finished deleting, move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
}

// Start typing animation on load after a slight delay
setTimeout(type, 1500);

/**
 * Scroll Reveal Animations (Intersection Observer)
 */
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target); 
        }
    });
};

const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% visible
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});
