// Simple typing effect on homepage
const text = "Aspiring IT professional passionate about networking, software development, and cybersecurity.";
let i = 0;

function typeEffect() {
    const el = document.getElementById("typing-text");
    if (!el) return;
    if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 30);
    }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Contact form stub (no backend) — show a simple thank-you message
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks! Your message was not sent (no backend).');
    });
}

window.addEventListener('load', () => {
    typeEffect();
    setupSmoothScroll();
    setupContactForm();
});