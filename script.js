const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let dots = [];
const mouse = { x: -1000, y: -1000 };
let DOT_SPACING = 30; // Will adjust for mobile
let DOT_RADIUS = 1.2;
const VOID_RADIUS = 100;
const RETURN_SPEED = 0.05;
const PUSH_FORCE = 0.5;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Mobile Optimization
    if (width < 768) {
        DOT_SPACING = 45; // Sparse dots on mobile
        DOT_RADIUS = 1.5; // Slightly larger for visibility
    } else {
        DOT_SPACING = 30;
        DOT_RADIUS = 1.2;
    }

    initDots();
}

class Dot {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        // Mobile: Static dots only (no interaction)
        if (width < 768) {
            this.x = this.baseX;
            this.y = this.baseY;
            return;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < VOID_RADIUS) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (VOID_RADIUS - distance) / VOID_RADIUS;
            const repulsionX = forceDirectionX * force * PUSH_FORCE * 20;
            const repulsionY = forceDirectionY * force * PUSH_FORCE * 20;

            this.vx -= repulsionX;
            this.vy -= repulsionY;
        }

        const homeDx = this.baseX - this.x;
        const homeDy = this.baseY - this.y;

        this.vx += homeDx * RETURN_SPEED;
        this.vy += homeDy * RETURN_SPEED;

        this.vx *= 0.8;
        this.vy *= 0.8;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
    }
}

function initDots() {
    dots = [];
    // Ensure we cover the whole screen properly
    for (let x = 0; x < width + DOT_SPACING; x += DOT_SPACING) {
        for (let y = 0; y < height + DOT_SPACING; y += DOT_SPACING) {
            dots.push(new Dot(x, y));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });

    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', resize);

// Mouse
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Touch (Mobile) - Listeners removed or kept passive since interaction is disabled
// We can keep them to track position if we wanted, but since we disabled interaction in update(),
// we don't strictly need them for the dots anymore. 
// However, keeping them doesn't hurt, but the logic in update() prevents movement.

window.addEventListener('touchmove', (e) => {
    // Interaction disabled for mobile dots, but we can track for other valid uses if needed.
    // loops will return early.
}, { passive: true });

window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
}, { passive: true });

window.addEventListener('touchend', () => {
    // Reset mouse pos so void closes when finger lifts
    mouse.x = -1000;
    mouse.y = -1000;
});


// Init
resize();
animate();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
