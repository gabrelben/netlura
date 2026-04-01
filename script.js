// Script para alternar entre dark e light mode
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para atualizar cores do SVG do botão adicionar perfil
    function updateAddProfileColors(isDark) {
        const addProfileSvg = document.querySelector('.add-profile-circle svg');
        if (addProfileSvg) {
            const circle = addProfileSvg.querySelector('circle');
            const lines = addProfileSvg.querySelectorAll('line');
            
            if (isDark) {
                // Cores para dark mode (branco)
                circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.5)');
                lines.forEach(line => line.setAttribute('stroke', 'rgba(255, 255, 255, 0.7)'));
            } else {
                // Cores para light mode (preto)
                circle.setAttribute('stroke', 'rgba(0, 0, 0, 0.5)');
                lines.forEach(line => line.setAttribute('stroke', 'rgba(0, 0, 0, 0.7)'));
            }
        }
    }

    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '◐'; // Ícone minimalista para light mode
        updateAddProfileColors(true); // Aplica cores para dark mode
    } else {
        themeToggle.textContent = '◑'; // Ícone minimalista para dark mode
        updateAddProfileColors(false); // Aplica cores para light mode
    }

    // Salva o nome e imagem do perfil no localStorage ao clicar
    document.querySelector('.profile-list').addEventListener('click', (e) => {
        const link = e.target.closest('a[data-name]');
        if (!link) return;
        localStorage.setItem('perfilAtivoNome', link.dataset.name);
        const img = link.querySelector('img');
        if (img) localStorage.setItem('perfilAtivoImagem', img.src);
    });

    // Event listener para o botão
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '◐' : '◑';
        updateAddProfileColors(isDark); // Atualiza cores do SVG
        // Salva a preferência no localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});