import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Configuration Firebase
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

let globalCounter = 0;
let colorIndex = 0;
let lastMilestoneTriggered = 0;
const colorList = [
    '#00ff41', '#1abc9c', '#007bff', '#ff9800', '#e91e63',
    '#ffeb3b', '#9c27b0', '#f44336', '#4caf50', '#00bcd4'
];
const milestones = [10, 100];

// Vérifier si un seuil est atteint et déclencher le pulse
function checkMilestoneAndPulse() {
    // allow re-triggering if counter drops below last triggered milestone
    if (globalCounter < lastMilestoneTriggered) lastMilestoneTriggered = 0;
    for (const milestone of milestones) {
        // trigger only when counter equals the milestone exactly
        if (globalCounter === milestone && lastMilestoneTriggered !== milestone) {
            lastMilestoneTriggered = milestone;
            triggerPulse();
            break;
        }
    }
}

// Déclencher l'animation pulse
function triggerPulse() {
    const counterEl = document.getElementById('global-matrix-counter');
    if (!counterEl) return;
    counterEl.classList.add('pulse-electric-blue');
    setTimeout(() => {
        counterEl.classList.remove('pulse-electric-blue');
    }, 600);
}

// Mise à jour de l'affichage du compteur
function updateCounterDisplay() {
    const old = document.querySelectorAll('#global-matrix-counter');
    old.forEach(el => el.parentNode && el.parentNode.id !== 'counter-bandeau-nav' && el.remove());

    let wrapper = document.getElementById('counter-bandeau-nav');
    if (!wrapper) {
        // If DOM not ready yet, wait for it.
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', updateCounterDisplay);
            return;
        }
        // If the expected wrapper is missing, try to create it inside the .logo element
        const logo = document.querySelector('.logo');
        if (logo) {
            wrapper = document.createElement('div');
            wrapper.id = 'counter-bandeau-nav';
            wrapper.style.display = 'inline-block';
            logo.appendChild(wrapper);
        } else {
            // As a last resort wait for DOMContentLoaded again
            window.addEventListener('DOMContentLoaded', updateCounterDisplay);
            return;
        }
    }

    let counterEl = document.getElementById('global-matrix-counter');
    if (!counterEl) {
        counterEl = document.createElement('div');
        counterEl.id = 'global-matrix-counter';
        counterEl.style.background = 'rgba(0,0,0,0.7)';
        counterEl.style.color = '#fff';
        counterEl.style.fontSize = '1.1rem';
        counterEl.style.padding = '0.2rem 0.8rem';
        counterEl.style.borderRadius = '0.7rem';
        counterEl.style.margin = '0 0.3rem 0 0';
        counterEl.style.display = 'inline-block';
        counterEl.style.transition = 'background 0.3s ease, color 0.3s ease';
        wrapper.prepend(counterEl);
    } else if (counterEl.parentNode && counterEl.parentNode.id !== 'counter-bandeau-nav') {
        // If an existing counter element is located elsewhere (bottom/right), move it into the nav wrapper
        wrapper.prepend(counterEl);
    }
    counterEl.innerHTML = `<span style="font-weight:600;letter-spacing:0.5px;">🌍 ${globalCounter}</span>`;
    checkMilestoneAndPulse();
}

// Couleur Matrix selon compteur
function getMatrixColor() {
    colorIndex = Math.floor(globalCounter / 10000) % colorList.length;
    return colorList[colorIndex];
}

// Fonction pour synchroniser la valeur du compteur global
window.setMatrixCursorCounter = function(val) {
    globalCounter = val;
};

// Récupération compteur en temps réel
onValue(counterRef, snapshot => {
    globalCounter = snapshot.val() || 0;
    updateCounterDisplay();
    window.setMatrixCursorCounter(globalCounter);
});

// Incrémentation Firebase
function incrementMatrixCounter() {
    runTransaction(counterRef, current => (current || 0) + 1);
}

// Ajouter les styles d'animation CSS
function addPulseStyles() {
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
        #global-matrix-counter.pulse-electric-blue {
            animation: pulseElectricBlue 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialisation au chargement
window.addEventListener('DOMContentLoaded', () => {
    addPulseStyles();
    updateCounterDisplay();
});

// Ensure any misplaced counter instance is moved into the nav next to the logo
function ensureCounterPlacement() {
    const wrapper = document.getElementById('counter-bandeau-nav') || document.querySelector('.logo');
    if (!wrapper) return;
    const els = document.querySelectorAll('#global-matrix-counter');
    els.forEach(el => {
        if (el.parentNode !== wrapper) wrapper.prepend(el);
    });
}

// Run placement after a short delay to catch elements created very early/late
window.addEventListener('load', () => setTimeout(ensureCounterPlacement, 150));

// Fonction pour synchroniser la valeur du compteur global
export function setMatrixCursorCounter(val) {
    globalCounter = val;
}

export { getMatrixColor, incrementMatrixCounter };