// 1. Son de clic
const clickSound = new Audio('assets/audio/click.wav');
clickSound.onerror = () => console.log('Fichier audio click non trouvé');

// 2. Musique d'ambiance
const BACKGROUND_VOLUME = 5; // Pourcentage entre 0 et 100
const backgroundMusic = new Audio('assets/audio/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = Math.max(0, Math.min(100, BACKGROUND_VOLUME)) / 100;
backgroundMusic.onerror = () => console.log('Fichier audio background non trouvé');
backgroundMusic.play().catch(() => {
    console.log('Lecture automatique bloquée par le navigateur, le son commencera au premier clic.');
});

// 3. Détecter les clics et jouer le son
document.addEventListener('click', () => {
    clickSound.currentTime = 0; // Permet de rejouer immédiatement
    clickSound.play();
    // Si la musique n'a pas encore commencé à cause du blocage du navigateur
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
});

// Hamburger menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Carrousel
const carousel = document.getElementById('carousel');
const slides = carousel.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let autoSlideTimer;

// Affiche la slide demandée
function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentIndex = index;
}

// Navigation manuelle
prevBtn.addEventListener('click', () => {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
    resetAutoSlide();
});
nextBtn.addEventListener('click', () => {
    showSlide((currentIndex + 1) % slides.length);
    resetAutoSlide();
});

// Auto-slide toutes les 4s
function startAutoSlide() { autoSlideTimer = setInterval(() => showSlide((currentIndex + 1) % slides.length), 4000); }

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

showSlide(currentIndex);
startAutoSlide();