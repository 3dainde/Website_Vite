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
const milestones = [10, 100, 1000, 10000, 100000];

// Vérifier si un seuil est atteint et déclencher le pulse
function checkMilestoneAndPulse() {
    for (const milestone of milestones) {
        if (globalCounter >= milestone && lastMilestoneTriggered < milestone) {
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

    const wrapper = document.getElementById('counter-bandeau-nav');
    if (!wrapper) {
        window.addEventListener('DOMContentLoaded', updateCounterDisplay);
        return;
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
        counterEl.style.transition = 'background 0.3s ease';
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
                box-shadow: 0 0 0 0 rgba(0, 150, 255, 0.7);
            }
            50% {
                background: rgba(0, 150, 255, 0.5);
                box-shadow: 0 0 20px 10px rgba(0, 150, 255, 0.3);
            }
            100% {
                background: rgba(0, 0, 0, 0.7);
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

// Fonction pour synchroniser la valeur du compteur global
export function setMatrixCursorCounter(val) {
    globalCounter = val;
}

export { getMatrixColor, incrementMatrixCounter };