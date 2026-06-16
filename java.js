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

/* Golden particle background using canvas */
class Particle {
    constructor(w, h, ctx) {
        this.w = w; this.h = h; this.ctx = ctx;
        this.reset(true);
    }
    reset(initial){
        this.x = Math.random() * this.w;
        this.y = initial ? Math.random() * this.h : -10 - Math.random() * 120;
        this.size = 1 + Math.random() * 3.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = 0.6 + Math.random() * 1.8;
        this.alpha = 0.4 + Math.random() * 0.9;
        this.life = 40 + Math.random() * 120;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1;
        if (this.y > this.h + 20 || this.x < -50 || this.x > this.w + 50 || this.life <= 0) this.reset(false);
    }
    draw() {
        const g = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6);
        g.addColorStop(0, `rgba(255, 230, 150, ${this.alpha})`);
        g.addColorStop(0.4, `rgba(212,175,55, ${this.alpha * 0.85})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        this.ctx.fillStyle = g;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

function setupCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    let DPR = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;
    function resize(){
        DPR = window.devicePixelRatio || 1;
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = Math.floor(W * DPR);
        canvas.height = Math.floor(H * DPR);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const targetCount = Math.max(60, Math.floor(W / 14));
    for (let i=0;i<targetCount;i++) particles.push(new Particle(W,H,ctx));

    function render(){
        // slight fade for gentle trails
        ctx.clearRect(0,0,W,H);
        // subtle vignette overlay
        for (let p of particles){ p.update(); p.draw(); }
        requestAnimationFrame(render);
    }
    render();
    return { canvas, ctx };
}

window.addEventListener('load', () => {
    // initialize visuals and UI behaviours
    setupCanvasBackground();
    typeEffect();
    setupSmoothScroll();
    setupContactForm();
});
