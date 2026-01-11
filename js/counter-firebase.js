import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
    apiKey: "AIzaSyCBZxAKJ_ANhf2LPMpOn8xiZikKbE6bM9E",
    authDomain: "authinteractivedotcom.firebaseapp.com",
    databaseURL: "https://authinteractivedotcom-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "authinteractivedotcom",
    storageBucket: "authinteractivedotcom.firebasestorage.app",
    messagingSenderId: "1086722851337",
    appId: "1:1086722851337:web:53b246562d40471ea5aed8",
    measurementId: "G-905Z16GTJN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const counterRef = ref(db, 'matrixClickCounter');

// ===== STATE =====
let globalCounter = 0;
let lastMilestonePulsed = 0;
const milestonesToPulse = [10, 100];
const colorList = [
    '#00ff41', '#1abc9c', '#007bff', '#ff9800', '#e91e63',
    '#ffeb3b', '#9c27b0', '#f44336', '#4caf50', '#00bcd4'
];

// ===== MATRIX COLOR =====
function getMatrixColor() {
    const index = Math.floor(globalCounter / 10000) % colorList.length;
    return colorList[index];
}

// ===== STYLES & ANIMATIONS =====
function injectPulseStyles() {
    if (document.getElementById('pulse-styles')) return;
    const style = document.createElement('style');
    style.id = 'pulse-styles';
    style.textContent = `
        @keyframes pulseElectricBlue {
            0% {
                background: rgba(0, 0, 0, 0.7);
                color: #fff;
                box-shadow: 0 0 0 0 rgba(0, 150, 255, 0.7);
            }
            50% {
                background: rgba(0, 150, 255, 0.5);
                color: #00f0ff;
                box-shadow: 0 0 20px 10px rgba(0, 150, 255, 0.3);
            }
            100% {
                background: rgba(0, 0, 0, 0.7);
                color: #fff;
                box-shadow: 0 0 0 0 rgba(0, 150, 255, 0);
            }
        }
        #global-matrix-counter.pulse {
            animation: pulseElectricBlue 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// ===== PULSE TRIGGER =====
function triggerPulse() {
    const el = document.getElementById('global-matrix-counter');
    if (!el) return;
    el.classList.remove('pulse');
    void el.offsetWidth; // Force reflow
    el.classList.add('pulse');
    setTimeout(() => el.classList.remove('pulse'), 600);
}

function checkAndPulseOnMilestone() {
    for (const milestone of milestonesToPulse) {
        if (globalCounter === milestone && lastMilestonePulsed !== milestone) {
            lastMilestonePulsed = milestone;
            triggerPulse();
            break;
        }
    }
}

// ===== CREATE/UPDATE COUNTER =====
function renderCounterElement() {
    let wrapper = document.getElementById('counter-bandeau-nav');
    
    // Ensure wrapper exists (should be in header .logo)
    if (!wrapper) {
        const logo = document.querySelector('.logo');
        if (!logo) {
            // DOM not ready, retry
            setTimeout(renderCounterElement, 50);
            return;
        }
        wrapper = document.createElement('div');
        wrapper.id = 'counter-bandeau-nav';
        wrapper.style.display = 'inline-flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.marginLeft = '0.6rem';
        logo.appendChild(wrapper);
    }
    
    // Get or create counter element
    let counter = document.getElementById('global-matrix-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'global-matrix-counter';
        counter.style.background = 'rgba(0, 0, 0, 0.7)';
        counter.style.color = '#fff';
        counter.style.fontSize = '1.1rem';
        counter.style.padding = '0.2rem 0.8rem';
        counter.style.borderRadius = '0.7rem';
        counter.style.display = 'inline-block';
        counter.style.transition = 'background 0.3s ease, color 0.3s ease';
        counter.style.whiteSpace = 'nowrap';
        counter.style.fontWeight = '600';
        counter.style.marginRight = '0';
        wrapper.appendChild(counter);
    }
    
    // Update text
    counter.textContent = `🌍 ${globalCounter}`;
    
    // Check for milestone
    checkAndPulseOnMilestone();
}

// ===== FIREBASE LISTENER =====
onValue(counterRef, (snapshot) => {
    globalCounter = snapshot.val() || 0;
    window.globalCounter = globalCounter;
    renderCounterElement();
});

// ===== INCREMENT =====
function incrementMatrixCounter() {
    runTransaction(counterRef, (current) => (current || 0) + 1);
}

// ===== EXPORTS & GLOBALS =====
window.setMatrixCursorCounter = (val) => {
    globalCounter = val;
    window.globalCounter = val;
};

export { getMatrixColor, incrementMatrixCounter };

// ===== INITIALIZE =====
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        injectPulseStyles();
        renderCounterElement();
    });
} else {
    injectPulseStyles();
    renderCounterElement();
}