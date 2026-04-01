import { categories } from './data.js?v=2026.03.31';
import { createCarousel } from './components/Carousel.js?v=2026.03.31';

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle-catalogo');
    const container = document.getElementById('main-content');

    // Mostra o nome do perfil selecionado na navbar
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');
    if (nomePerfil) {
        const kidsLink = document.querySelector('.kids-link');
        if (kidsLink) kidsLink.textContent = nomePerfil;
    }
    if (imagemPerfil) {
        const profileIcon = document.querySelector('.profile-icon');
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        if (themeToggle) {
            themeToggle.textContent = isDark ? '◐' : '◑';
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Inicializa o tema salvo
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('dark-mode');
            applyTheme(isDark);
        });
    }

    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
