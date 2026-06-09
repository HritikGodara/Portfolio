document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Theme Toggle
    initTheme();

    // 3. Navigation Modal
    initNavModal();

    // 4. Scroll Reveal Animations
    initScrollReveal();

    // 5. Scroll Highlight Text
    initScrollHighlight();

    // 6. Contact Form
    initContactForm();
});

function initTheme() {
    const html = document.documentElement;
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check local storage or system preference
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (e) {
        // Ignore quota/access errors
    }
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    if (themeSwitch) {
        const initialTheme = html.getAttribute('data-theme');
        themeSwitch.setAttribute('aria-label', initialTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');

        themeSwitch.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                // Ignore quota/access errors
            }
            themeSwitch.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        });
    }
}

function initNavModal() {
    const trigger = document.getElementById('pill-trigger');
    const modal = document.getElementById('nav-modal');
    const overlay = document.getElementById('nav-modal-overlay');
    const closeBtn = document.getElementById('nav-modal-close');
    const links = document.querySelectorAll('.nav-modal-link');

    if (trigger) trigger.setAttribute('aria-expanded', 'false');

    function openModal() {
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }

    function closeModal(returnFocus = true) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            if (returnFocus) trigger.focus();
        }
    }

    if (trigger) trigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(true));
    if (overlay) overlay.addEventListener('click', () => closeModal(false));
    
    links.forEach(link => {
        link.addEventListener('click', () => closeModal(true));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(true);
        }
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

function initScrollHighlight() {
    const textElement = document.getElementById('scroll-highlight-text');
    if (!textElement) return;

    // Split text into words and wrap them in span elements
    const text = textElement.textContent;
    const words = text.trim().split(/\s+/);
    textElement.innerHTML = '';
    
    words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        textElement.appendChild(span);
    });

    const wordSpans = textElement.querySelectorAll('.word');
    const START_THRESHOLD = 0.8;
    const END_THRESHOLD = 0.2;

    function handleScroll() {
        const rect = textElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far the element is through the viewport
        const start = windowHeight * START_THRESHOLD;
        const end = windowHeight * END_THRESHOLD;
        const current = rect.top;

        if (current > start) {
            wordSpans.forEach(span => span.classList.remove('active'));
            return;
        }
        if (current < end) {
            wordSpans.forEach(span => span.classList.add('active'));
            return;
        }

        const progress = 1 - ((current - end) / (start - end));
        const activeCount = Math.floor(progress * wordSpans.length);

        wordSpans.forEach((span, index) => {
            if (index < activeCount) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    handleScroll(); // Trigger once on load
    window.addEventListener('load', handleScroll); // Recalculate after web fonts finish loading
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    let successTimeoutId = null;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let valid = true;

        // Reset errors
        document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!name.value.trim()) {
            showError('name-error', 'Please enter your name');
            valid = false;
        }
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError('email-error', 'Please enter a valid email address');
            valid = false;
        }
        if (!message.value.trim()) {
            showError('message-error', 'Please enter your message');
            valid = false;
        }

        if (valid) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: new FormData(form)
                });
                
                if (response.ok) {
                    document.getElementById('form-success').classList.add('visible');
                    form.reset();
                    
                    if (successTimeoutId) {
                        clearTimeout(successTimeoutId);
                    }
                    successTimeoutId = setTimeout(() => {
                        document.getElementById('form-success').classList.remove('visible');
                    }, 5000);
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                alert('Something went wrong. Please try again.');
            } finally {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        }
    });

    function showError(id, msg) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = msg;
            el.classList.add('visible');
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
