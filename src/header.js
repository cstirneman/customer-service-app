// Function to toggle the mobile navigation menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

/* -----------------------------
   GLOBAL TOAST FUNCTION
------------------------------ */
function showToast(message) {
    let toast = document.getElementById('copy-toast');

    // Create toast container if it's not already on the page
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copy-toast';
        document.body.appendChild(toast);
    }

    // Set toast message
    toast.textContent = message;

    // Show toast
    toast.classList.add('toast--visible');

    // Clear any previous timeout so it doesn't stack animations
    if (toast.hideTimeout) {
        clearTimeout(toast.hideTimeout);
    }

    // Hide toast after 2 seconds
    toast.hideTimeout = setTimeout(() => {
        toast.classList.remove('toast--visible');
    }, 2000);
}


// ===========================
// GLOBAL CLICK EFFECT HANDLER
// ===========================

// Change this to switch between effects:
const CLICK_EFFECT_MODE = 'glow';
// Options: 'ripple', 'glow', 'particles', 'stars', 'impact', 'bubble'

document.addEventListener('click', (event) => {
    // Left-click only
    if (event.button !== 0) return;

    const x = event.clientX;
    const y = event.clientY;

    switch (CLICK_EFFECT_MODE) {
        case 'ripple':
            createRippleEffect(x, y);
            break;
        case 'glow':
            createGlowEffect(x, y);
            break;
        case 'particles':
            createParticleEffect(x, y);
            break;
        case 'stars':
            createStarEffect(x, y);
            break;
        case 'impact':
            createImpactEffect(x, y);
            break;
        case 'bubble':
            createBubbleEffect(x, y);
            break;
    }
});

// ===========================
// 1) SIMPLE RING RIPPLE
// ===========================

function createRippleEffect(x, y) {
    const root = document.createElement('span');
    root.classList.add('click-effect-root', 'click-ripple');
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;

    document.body.appendChild(root);

    setTimeout(() => root.remove(), 500);
}

// ===========================
// 2) GLOWING DOUBLE RIPPLE
// ===========================

function createGlowEffect(x, y) {
    const root = document.createElement('span');
    root.classList.add('click-effect-root', 'click-glow-wrapper');
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;

    const core = document.createElement('span');
    core.classList.add('click-glow-core');

    const ring = document.createElement('span');
    ring.classList.add('click-glow-ring');

    root.appendChild(core);
    root.appendChild(ring);

    document.body.appendChild(root);

    setTimeout(() => root.remove(), 450);
}

// ===========================
// 3) EXPLODING PARTICLES
// ===========================

function createParticleEffect(x, y) {
    const root = document.createElement('span');
    root.classList.add('click-effect-root');
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;

    const numParticles = 10;

    for (let i = 0; i < numParticles; i++) {
        const p = document.createElement('span');
        p.classList.add('click-particle');

        // random angle in radians
        const angle = Math.random() * Math.PI * 2;
        // random distance between 20 and 50 px
        const distance = 20 + Math.random() * 30;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);

        root.appendChild(p);
    }

    document.body.appendChild(root);

    setTimeout(() => root.remove(), 500);
}

// ===========================
// 4) STAR / MAGIC SPARKLE
// ===========================

function createStarEffect(x, y) {
    const root = document.createElement('span');
    root.classList.add('click-effect-root');
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;

    const numStars = 7;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('span');
        star.classList.add('click-star');

        // random offset to give slight scatter
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        star.style.left = `calc(50% + ${offsetX}px)`;
        star.style.top = `calc(50% + ${offsetY}px)`;

        root.appendChild(star);
    }

    document.body.appendChild(root);

    setTimeout(() => root.remove(), 600);
}

// ===========================
// 5) IMPACT SHOCKWAVE
// ===========================

function createImpactEffect(x, y) {
    const root = document.createElement('span');
    root.classList.add('click-effect-root');
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;

    const ring = document.createElement('span');
    ring.classList.add('click-impact-ring');

    const shadow = document.createElement('span');
    shadow.classList.add('click-impact-shadow');

    root.appendChild(shadow);
    root.appendChild(ring);

    document.body.appendChild(root);

    setTimeout(() => root.remove(), 450);
}

// ===========================
// 6) BUBBLE POP
// ===========================

function createBubbleEffect(x, y) {
    const root = document.createElement('span');
    root.classList.add('click-effect-root');
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;

    const bubble = document.createElement('span');
    bubble.classList.add('click-bubble');

    const dot = document.createElement('span');
    dot.classList.add('click-bubble-dot');

    root.appendChild(bubble);
    root.appendChild(dot);

    document.body.appendChild(root);

    setTimeout(() => root.remove(), 500);
}


