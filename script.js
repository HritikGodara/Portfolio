// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTheme();
    initParticles();
    initNavigation();
    initScrollReveal();
    initSkillBars();
    initChartBars();
    initContactForm();
});

// ===== THEME TOGGLE =====
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check saved preference or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        
        // Re-initialize lucide icons after theme change for the toggle icons
        lucide.createIcons();
        
        // Update particle colors
        if (window.updateParticleColors) {
            window.updateParticleColors(next);
        }
    });
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// ===== PARTICLE BACKGROUND =====
function initParticles() {
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 130;
    
    // Theme-aware colors
    const darkColors = ['232,168,56', '240,190,94', '196,136,32'];
    const lightColors = ['196,136,32', '180,120,20', '160,110,21'];
    let currentColors = document.documentElement.getAttribute('data-theme') === 'light' ? lightColors : darkColors;
    
    // Expose color update function
    window.updateParticleColors = function(theme) {
        currentColors = theme === 'light' ? lightColors : darkColors;
        particles.forEach(p => {
            p.color = currentColors[Math.floor(Math.random() * currentColors.length)];
            p.alpha = theme === 'light' ? (Math.random() * 0.3 + 0.1) : (Math.random() * 0.4 + 0.15);
        });
    };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 0.5;
            this.color = currentColors[Math.floor(Math.random() * currentColors.length)];
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            this.alpha = isDark ? (Math.random() * 0.4 + 0.15) : (Math.random() * 0.3 + 0.1);
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    this.x += dx * 0.0015;
                    this.y += dy * 0.0015;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const opacity = (1 - dist / CONNECTION_DIST) * 0.1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(232, 168, 56, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Sticky navbar
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Active section highlight
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    });

    // Mobile menu
    function openMobile() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeMobile() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMobile);
    mobileClose.addEventListener('click', closeMobile);
    mobileOverlay.addEventListener('click', closeMobile);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobile));
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===== CHART BARS ANIMATION =====
function initChartBars() {
    const chartBars = document.querySelectorAll('.bar-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.closest('.chart-bar');
                const height = parent.dataset.height;
                entry.target.style.height = height + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    chartBars.forEach(bar => observer.observe(bar));
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Reset errors
        document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (!name.value.trim()) {
            showError('name-error', 'Please enter your name');
            valid = false;
        }
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError('email-error', 'Please enter a valid email');
            valid = false;
        }
        if (!subject.value.trim()) {
            showError('subject-error', 'Please enter a subject');
            valid = false;
        }
        if (!message.value.trim()) {
            showError('message-error', 'Please enter a message');
            valid = false;
        }

        if (valid) {
            document.getElementById('form-success').classList.add('visible');
            form.reset();
            setTimeout(() => {
                document.getElementById('form-success').classList.remove('visible');
            }, 5000);
        }
    });

    function showError(id, msg) {
        const el = document.getElementById(id);
        el.textContent = msg;
        el.classList.add('visible');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
