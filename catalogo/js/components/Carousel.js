import { createCard } from './Card.js?v=2026.03.31';

export function createCarousel(category) {
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Header for Title and Indicators
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title;

    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // Container para a row e as setas
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-wrapper';

    const rowScroll = document.createElement('div');
    rowScroll.className = 'movie-row-scroll';

    const row = document.createElement('div');
    row.className = 'movie-row';

    category.items.forEach(item => {
        const card = createCard(item);
        row.appendChild(card);
    });

    // Criar seta de voltar (esquerda)
    const prevArrow = document.createElement('button');
    prevArrow.className = 'carousel-arrow carousel-arrow-prev hidden';
    prevArrow.setAttribute('aria-label', 'Filmes anteriores');
    prevArrow.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    `;

    // Criar seta de avançar (direita)
    const nextArrow = document.createElement('button');
    nextArrow.className = 'carousel-arrow carousel-arrow-next';
    nextArrow.setAttribute('aria-label', 'Próximos filmes');
    nextArrow.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    `;

    rowScroll.appendChild(row);

    // Função para verificar e atualizar visibilidade da seta de voltar
    const updatePrevArrowVisibility = () => {
        if (rowScroll.scrollLeft > 0) {
            prevArrow.classList.remove('hidden');
        } else {
            prevArrow.classList.add('hidden');
        }
    };

    // Evento de scroll para mostrar/esconder seta de voltar
    rowScroll.addEventListener('scroll', updatePrevArrowVisibility);

    // Mantem o scroll vertical no documento inteiro quando o cursor estiver sobre a fileira.
    // Gestos horizontais (deltaX) continuam funcionando na lista.
    rowScroll.addEventListener('wheel', (event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            window.scrollBy({
                top: event.deltaY,
                behavior: 'auto'
            });
        }
    }, { passive: false });

    // Rola até o fim; se já estiver no fim, volta ao início (loop infinito)
    nextArrow.addEventListener('click', () => {
        const atEnd = rowScroll.scrollLeft + rowScroll.clientWidth >= rowScroll.scrollWidth - 2;
        rowScroll.scrollTo({
            left: atEnd ? 0 : rowScroll.scrollWidth,
            behavior: 'smooth'
        });
    });

    // Rola até o início; se já estiver no início, vai ao fim (loop infinito)
    prevArrow.addEventListener('click', () => {
        const atStart = rowScroll.scrollLeft <= 2;
        rowScroll.scrollTo({
            left: atStart ? rowScroll.scrollWidth : 0,
            behavior: 'smooth'
        });
    });

    carouselContainer.appendChild(prevArrow);
    carouselContainer.appendChild(rowScroll);
    carouselContainer.appendChild(nextArrow);
    section.appendChild(carouselContainer);
    return section;
}
