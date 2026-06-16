/* Typing effect */
const text = "Aspiring IT professional passionate about networking, software development, and cybersecurity.";
let i = 0;
function typeEffect() {
    const el = document.getElementById("typing-text");
    if (!el) return;
    if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 28);
    }
}

/* Smooth scroll (redundant with CSS but keeps older browsers happy) */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* Contact form stub */
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks! This is a demo contact form (no backend).');
        form.reset();
    });
}

window.addEventListener('load', () => {
    typeEffect();
    setupSmoothScroll();
    setupContactForm();
});
