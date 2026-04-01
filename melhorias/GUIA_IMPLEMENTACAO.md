# Guia de Implementação - Correções Prioritárias

## 1. LAZY LOADING DE IMAGENS (Performance - Crítico)

### Option A: Intersection Observer (Recomendado)

**Arquivo novo:** `catalogo/js/lazyLoad.js`
```javascript
'use strict';

export class LazyImageLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01,
      ...options
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          
          img.onload = () => {
            img.classList.add('loaded');
            this.observer.unobserve(img);
          };
          
          img.onerror = () => {
            console.error(`Erro ao carregar imagem: ${src}`);
            img.src = '/assets/placeholder.png';
            this.observer.unobserve(img);
          };
        }
      }
    });
  }

  observe(element) {
    this.observer.observe(element);
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// Uso em Card.js:
import { LazyImageLoader } from '../lazyLoad.js';

const lazyLoader = new LazyImageLoader({
  rootMargin: '100px' // Carrega 100px antes de entrar na viewport
});

export function createCard(item) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  
  const img = document.createElement('img');
  // Usar placeholder SVG
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="250" height="140" fill="%23222"/%3E%3C/svg%3E';
  img.dataset.src = item.img; // Armazenar URL real
  img.alt = `${item.title || 'Filme'} - ${item.genre || 'filme'} poster`;
  
  lazyLoader.observe(img);
  
  // Resto do código...
}
```

### Option B: Native Lazy Loading (Suporte moderno)
```javascript
const img = document.createElement('img');
img.src = item.img;
img.loading = 'lazy'; // Deixa o navegador gerenciar
img.alt = `${item.title || 'Filme'} - ${item.genre || 'filme'} poster`;
```

---

## 2. ALT TEXT DESCRITIVO (Acessibilidade - Crítico)

### Melhorar Card.js com dados reais

```javascript
// Modificar data.js para incluir mais informações
export const categories = [
    {
        title: "Mais assistidos",
        items: [
            {
                title: "Oppenheimer",
                genre: "Ficção Científica/Drama",
                img: "https://...",
                top10: true,
                badge: "Clássico",
                youtube: "..."
            },
            // Mais itens...
        ]
    }
];

// Em Card.js:
const img = document.createElement('img');
img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="250" height="140" fill="%23222"/%3E%3C/svg%3E';
img.dataset.src = item.img;
img.alt = `${item.title} - ${item.genre}. ${item.badge ? `Badge: ${item.badge}` : ''}`
         .trim();
// Exemplo output: "Oppenheimer - Ficção Científica/Drama. Badge: Clássico"
```

---

## 3. REMOVER IFRAMES DESNECESSÁRIOS (Performance - Crítico)

### Usar YouTube Thumbnail Estática

```javascript
// Em Card.js
export function createCard(item) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  
  const img = document.createElement('img');
  
  // Usar thumbnail estática do YouTube
  if (item.youtube) {
    const videoId = getYouTubeId(item.youtube);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    // Com fallback
    img.src = thumbnailUrl;
    img.onerror = () => {
      img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };
  } else {
    img.src = item.img;
  }
  
  img.alt = `${item.title || 'Filme'} - ${item.genre || 'filme'} poster`;
  
  card.appendChild(img);
  
  // Iframe carregado apenas no hover - de forma lazy
  let iframeLoaded = false;
  const videoId = getYouTubeId(item.youtube);
  
  card.addEventListener('mouseenter', () => {
    if (!iframeLoaded && videoId) {
      const iframe = document.createElement('iframe');
      iframe.title = `Trailer: ${item.title || 'Filme'}`;
      iframe.setAttribute('aria-label', `Assista ao trailer de ${item.title || 'Filme'}`);
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`;
      
      // Inserir antes da imagem
      card.insertBefore(iframe, img);
      iframeLoaded = true;
    }
    
    // Manter resto do comportamento hover
    // ...
  });
  
  return card;
}
```

---

## 4. ARIA-LABELS E ACESSIBILIDADE (Acessibilidade - Crítico)

### Melhorar Card.js com ARIA labels

```javascript
export function createCard(item) {
  // ...código anterior...
  
  const details = document.createElement('div');
  details.className = 'card-details';
  
  const detailsButtons = document.createElement('div');
  detailsButtons.className = 'details-buttons';
  
  const leftButtons = document.createElement('div');
  leftButtons.className = 'left-buttons';
  
  // Botão Play
  const playBtn = document.createElement('button');
  playBtn.className = 'btn-icon btn-play-icon';
  playBtn.setAttribute('aria-label', `Reproduzir ${item.title || 'filme'}`);
  playBtn.innerHTML = '<i class="fas fa-play" style="margin-left:2px;"></i>';
  playBtn.addEventListener('click', () => {
    console.log(`Reproduzindo ${item.title}`);
  });
  leftButtons.appendChild(playBtn);
  
  // Botão Adicionar/Assistido
  const watchBtn = document.createElement('button');
  watchBtn.className = 'btn-icon';
  watchBtn.setAttribute('aria-label', item.progress 
    ? `Marcar como não assistido: ${item.title}`
    : `Adicionar à minha lista: ${item.title}`);
  watchBtn.innerHTML = item.progress 
    ? '<i class="fas fa-check"></i>'
    : '<i class="fas fa-plus"></i>';
  watchBtn.addEventListener('click', () => {
    watchBtn.classList.toggle('active');
    // Atualizar aria-label
  });
  leftButtons.appendChild(watchBtn);
  
  // Botão Gostei
  const likeBtn = document.createElement('button');
  likeBtn.className = 'btn-icon';
  likeBtn.setAttribute('aria-label', `Gostei de ${item.title}`);
  likeBtn.setAttribute('aria-pressed', 'false');
  likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i>';
  likeBtn.addEventListener('click', () => {
    const isPressed = likeBtn.getAttribute('aria-pressed') === 'true';
    likeBtn.setAttribute('aria-pressed', !isPressed);
  });
  leftButtons.appendChild(likeBtn);
  
  detailsButtons.appendChild(leftButtons);
  
  const rightButtons = document.createElement('div');
  rightButtons.className = 'right-buttons';
  
  // Botão Mais informações
  const moreBtn = document.createElement('button');
  moreBtn.className = 'btn-icon';
  moreBtn.setAttribute('aria-label', `Ver mais informações sobre ${item.title}`);
  moreBtn.setAttribute('aria-expanded', 'false');
  moreBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
  moreBtn.addEventListener('click', () => {
    const isExpanded = moreBtn.getAttribute('aria-expanded') === 'true';
    moreBtn.setAttribute('aria-expanded', !isExpanded);
  });
  rightButtons.appendChild(moreBtn);
  
  detailsButtons.appendChild(rightButtons);
  details.appendChild(detailsButtons);
  
  // Rest of details...
  card.appendChild(details);
  
  return card;
}
```

---

## 5. FAVICON E META TAGS (Melhores Práticas - Alto)

### Atualizar index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5.0">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    
    <!-- Meta Tags SEO -->
    <title>Netflix Clone - Selecione um Perfil</title>
    <meta name="description" content="Selecione seu perfil e comece a assistir filmes e séries em qualidade HD e 4K.">
    <meta name="theme-color" content="#E50914">
    
    <!-- Open Graph para Redes Sociais -->
    <meta property="og:title" content="Netflix Clone">
    <meta property="og:description" content="Selecione seu perfil e comece a assistir filmes e séries em qualidade HD e 4K.">
    <meta property="og:image" content="/assets/og-image.png">
    <meta property="og:url" content="https://seu-dominio.com">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Netflix Clone">
    <meta name="twitter:description" content="Selecione seu perfil e comece a assistir filmes e séries">
    <meta name="twitter:image" content="/assets/og-image.png">
    
    <!-- Preconnect e DNS Prefetch -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://upload.wikimedia.org">
    
    <!-- Fonts com Preload -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" as="style">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/fonts.css">
    
    <!-- CSP Header (como meta tag fallback) -->
    <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self'; 
                   script-src 'self' 'unsafe-inline';
                   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                   img-src 'self' data: https:;
                   font-src 'self' https://fonts.gstatic.com;">
    
    <!-- Script com defer para não bloquear renderização -->
    <script src="script.js" defer></script>
</head>

<body>
    <!-- Skip link para acessibilidade -->
    <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
    
    <!-- Breadcrumb estruturado -->
    <nav aria-label="Breadcrumb" class="breadcrumb" style="display: none;">
        <ol>
            <li><a href="/">Home</a></li>
            <li aria-current="page">Selecionar Perfil</li>
        </ol>
    </nav>
    
    <main id="main-content">
        <button id="theme-toggle" aria-label="Alternar entre modo escuro e claro">🌙</button>
        <h1>Quem está assistindo?</h1>
        <!-- Resto do conteúdo... -->
    </main>

    <script src="js/index.js"></script>
</body>

</html>
```

### Criar manifest.json

**Arquivo novo:** `/manifest.json`
```json
{
  "name": "Netflix Clone",
  "short_name": "Netflix",
  "description": "Plataforma de streaming de filmes e séries",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#E50914",
  "screenshots": [
    {
      "src": "/assets/screenshot-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "form_factor": "narrow"
    },
    {
      "src": "/assets/screenshot-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "form_factor": "wide"
    }
  ],
  "icons": [
    {
      "src": "/assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["entertainment", "video"],
  "shortcuts": [
    {
      "name": "Ver Séries",
      "url": "/catalogo?category=series",
      "icons": [
        {
          "src": "/assets/icon-96.png",
          "sizes": "96x96",
          "type": "image/png"
        }
      ]
    }
  ]
}
```

---

## 6. FOCUS INDICATORS (Acessibilidade - Alto)

### Adicionar ao style.css

```css
/* Global Focus Styles */
:focus {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
}

/* Específico para botões */
button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  border-radius: 2px;
}

a:focus-visible {
  outline: 3px dashed #ffd700;
  outline-offset: 4px;
  border-radius: 2px;
}

/* Skip link visível no focus */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
  border-radius: 4px;
}

.skip-link:focus-visible {
  top: 10px;
  left: 10px;
  outline: 3px solid #ffd700;
}

/* Indicador visual de loading state */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  outline: 2px dashed #999;
}

/* Hover states consistent */
button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

---

## 7. SERVICE WORKER (Performance - Médio)

### Criar sw.js

**Arquivo novo:** `/sw.js`
```javascript
'use strict';

const CACHE_VERSION = 'netflix-v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/js/index.js',
  '/catalogo/catalogo.html',
  '/catalogo/catalogo.css',
  '/catalogo/js/main.js',
  '/assets/favicon.svg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => {
        console.log('[Service Worker] Caching assets');
        return cache.addAll(CACHE_ASSETS);
      })
      .catch(error => {
        console.error('[Service Worker] Install error:', error);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_VERSION)
          .map(name => {
            console.log('[Service Worker] Deletando cache antigo:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Cache first strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_VERSION)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        return caches.match('/index.html');
      })
  );
});
```

**Registrar o Service Worker em script.js ou index.js:**
```javascript
'use strict';

// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => {
      console.log('[App] Service Worker registrado:', reg);
    })
    .catch(error => {
      console.error('[App] Erro ao registrar Service Worker:', error);
    });
}
```

---

## 8. ESTRUTURA DE PASTAS RECOMENDADA

```
projeto-netflix/
├── index.html
├── manifest.json
├── sw.js
├── RELATORIO_ANALISE.md
│
├── css/
│   ├── style.css
│   ├── fonts.css
│   ├── accessibility.css
│   └── responsive.css
│
├── js/
│   ├── index.js
│   ├── theme-toggle.js
│   └── service-worker.js
│
├── assets/
│   ├── images/
│   │   ├── perfil-1.jpg
│   │   ├── perfil-2.jpg
│   │   ├── perfil-3.jpg
│   │   ├── perfil-4.jpg
│   │   └── placeholder.png
│   ├── fonts/
│   │   ├── roboto-300.woff2
│   │   ├── roboto-400.woff2
│   │   ├── roboto-500.woff2
│   │   └── roboto-700.woff2
│   ├── icons/
│   │   ├── sprite.svg
│   │   └── icon-*.png
│   └── logos/
│       ├── favicon.svg
│       ├── apple-touch-icon.png
│       └── og-image.png
│
└── catalogo/
    ├── catalogo.html
    ├── catalogo.css
    └── js/
        ├── main.js
        ├── data.js
        ├── utils.js
        ├── lazyLoad.js
        └── components/
            ├── Card.js
            └── Carousel.js
```

---

## Checklist de Implementação

- [ ] Implementar Lazy Loading de imagens (Card.js)
- [ ] Melhorar alt text com dados reais
- [ ] Remover/otimizar iframes YouTube
- [ ] Adicionar ARIA-labels completos
- [ ] Adicionar favicon.svg
- [ ] Adicionar meta tags SEO
- [ ] Criar manifest.json
- [ ] Implementar focus indicators
- [ ] Criar Service Worker básico
- [ ] Organizar estrutura de pastas
- [ ] Corrigir caminhos de CSS/JS
- [ ] Testar com Lighthouse
- [ ] Testar com navegação via teclado
- [ ] Testar com screen reader

---

**Próximo passo:** Priorizar implementações conforme urgência do projeto.
