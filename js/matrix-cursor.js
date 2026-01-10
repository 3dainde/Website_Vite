import { incrementMatrixCounter, getMatrixColor } from './counter-firebase.js';

const drops = [];
let lastCounterValue = 0;
let globalCounter = window.globalCounter || 0;
if (typeof window.setMatrixCursorCounter === 'function') {
    window.setMatrixCursorCounter = v => {
        globalCounter = v;
        window.globalCounter = v;
    };
}

// Compte à rebours jusqu'au 20/06/2026
function updateCountdown() {
    const target = new Date('2026-06-20T00:00:00');
    const now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('countdown').innerHTML =
        `<span class="cd-smoke">${days}j</span> <span class="cd-smoke">${hours}h</span> <span class="cd-smoke">${minutes}m</span> <span class="cd-smoke">${seconds}s</span>`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Dessine tous les drops
function drawDrops() {
    const container = document.getElementById("matrix-container");
    if (!container) return;
    container.innerHTML = "";

    for (const drop of drops) {
        const span = document.createElement("span");
        span.textContent = drop.value;
        span.style.position = "absolute";
        span.style.left = drop.x + "px";
        span.style.top = drop.y + "px";
        span.style.color = drop.color;
        span.style.fontWeight = 'bold';
        span.style.fontFamily = 'monospace';
        span.style.fontSize = '1.05rem';
        container.appendChild(span);
    }
}

// Spawn un drop au clic
function spawnDrop(x, y) {
    // Utilise la vraie valeur globale
    const current = globalCounter + 1;
    const speed = window.innerHeight / 1000;
    const color = getMatrixColor();
    drops.push({ x, y, value: current, speed, color });
    incrementMatrixCounter();
}

// Animation via requestAnimationFrame
function animateMatrixCursor() {
    for (const drop of drops) drop.y += drop.speed;
    drawDrops();
    for (let i = drops.length - 1; i >= 0; i--)
        if (drops[i].y > window.innerHeight + 40) drops.splice(i, 1);
    requestAnimationFrame(animateMatrixCursor);
}

// Event clic pour spawn
document.addEventListener("click", e => spawnDrop(e.clientX, e.clientY));
requestAnimationFrame(animateMatrixCursor);