# CHECKLIST DE PROBLEMAS ENCONTRADOS

## 📊 Estatísticas Gerais

```
Total de problemas encontrados: 43
├── 🔴 Críticos (Implementar ASAP): 13
├── 🟠 Altos (Próximas 2-4 semanas): 16  
└── 🟡 Médios (Próximas 4-8 semanas): 14
```

---

## 🔴 PROBLEMAS CRÍTICOS (13)

### Performance (4)
- [ ] **P1.3** - Imagens sem lazy loading (catalogo/js/components/Card.js:14-16)
  - **Impacto:** Carrega 30-50 imagens simultaneamente
  - **Esforço:** Médio (2-4h)
  - **Ganho:** -60% de requisições iniciais

- [ ] **P1.4** - Iframes YouTube carregando desnecessariamente (Card.js:18-21)
  - **Impacto:** Requisições extras, lentidão
  - **Esforço:** Médio (2h)
  - **Ganho:** -80% de requisições YouTube

- [ ] **P1.1** - Fonts não otimizadas (catalogo.html:9)
  - **Impacto:** Pode bloquear renderização
  - **Esforço:** Pequeno-médio (1-2h)
  - **Ganho:** -300ms FCP

- [ ] **P1.6** - Sem Cache-Control headers (Infra)
  - **Impacto:** Sem cache de assets
  - **Esforço:** Pequeno (30m)
  - **Ganho:** -90% requisições repeat

### Acessibilidade (5)
- [ ] **A2.1** - Alt text genérico em cards (Card.js:14-16)
  - **Impacto:** Crítico para leitores de tela
  - **Esforço:** Pequeno (1h)
  - **Ganho:** Total acessibilidade de imagens

- [ ] **A2.2** - Logo navbar sem alt descritivo (catalogo.html:33-35)
  - **Impacto:** Screen reader não identifica logo
  - **Esforço:** Mínimo (10m)
  - **Ganho:** Logo acessível

- [ ] **A2.4** - Ícones Font Awesome sem ARIA labels (Card.js:27-33)
  - **Impacto:** Botões não identificáveis
  - **Esforço:** Pequeno (1-2h)
  - **Ganho:** Botões totalmente acessíveis

- [ ] **A2.3** - Profile icon sem alt text (catalogo.html:43-44)
  - **Impacto:** Imagem não descrita
  - **Esforço:** Mínimo (10m)
  - **Ganho:** Imagem acessível

- [ ] **A2.8** - Indicadores focus ausentes (catalogo.css)
  - **Impacto:** Navegação via teclado invisível
  - **Esforço:** Médio (1-2h)
  - **Ganho:** Total acessibilidade por teclado

### Melhores Práticas (4)
- [ ] **MP3.1** - Sem favicon (index.html + catalogo.html)
  - **Impacto:** Sem identidade visual
  - **Esforço:** Mínimo (20m)
  - **Ganho:** Branding completo

- [ ] **MP3.3** - Caminhos de arquivo incorretos (index.html:24-26)
  - **Impacto:** Assets podem não carregar
  - **Esforço:** Pequeno (30m)
  - **Ganho:** Assets sempre carregam

- [ ] **MP3.10** - Links externos sem rel="noopener" (catalogo.html:54-68)
  - **Impacto:** Vulnerabilidade de segurança
  - **Esforço:** Mínimo (15m)
  - **Ganho:** Segurança crítica

- [ ] **MP3.2** - Sem meta tags SEO (index.html + catalogo.html)
  - **Impacto:** Sem visibilidade em buscadores
  - **Esforço:** Pequeno (1h)
  - **Ganho:** SEO básico implementado

---

## 🟠 PROBLEMAS ALTOS (16)

### Performance (3)
- [ ] **P1.2** - Font Awesome via CDN 90KB (catalogo.html:8)
  - **Impacto:** 90KB extras desnecessários
  - **Esforço:** Médio (2-3h)
  - **Ganho:** -80KB

- [ ] **P1.9** - Múltiplas requisições HTTP (Várias)
  - **Impacto:** Slow start
  - **Esforço:** Médio
  - **Ganho:** -3 requisições críticas

- [ ] **P1.11** - Sem prefetch/preconnect (catalogo.html)
  - **Impacto:** Conexões lentas
  - **Esforço:** Pequeno (30m)
  - **Ganho:** +200-300ms

### Acessibilidade (5)
- [ ] **A2.5** - Iframes YouTube sem título (Card.js:18-21)
  - **Impacto:** Screen readers não descrevem iframe
  - **Esforço:** Pequeno (30m)
  - **Ganho:** Iframes acessíveis

- [ ] **A2.6** - Navbar sem atributos semânticos (catalogo.html:29-45)
  - **Impacto:** Estrutura não clara
  - **Esforço:** Pequeno-médio (1h)
  - **Ganho:** Semântica HTML correta

- [ ] **A2.9** - Contraste de cores em hover (catalogo.css:65-67)
  - **Impacto:** Texto difícil de ler no hover
  - **Esforço:** Mínimo (15m)
  - **Ganho:** Contraste WCAG AAA

- [ ] **A2.12** - Sem skip links (catalogo.html)
  - **Impacto:** Navegação por teclado lenta
  - **Esforço:** Pequeno (1h)
  - **Ganho:** Navegação rápida por teclado

- [ ] **A2.10** - Sem <h1> na página catálogo
  - **Impacto:** Estrutura heading inadequada
  - **Esforço:** Mínimo (15m)
  - **Ganho:** Hierarquia HTML correta

### Melhores Práticas (8)
- [ ] **MP3.13** - Sem Content-Security-Policy (Todos)
  - **Impacto:** Vulnerabilidade XSS
  - **Esforço:** Médio (1-2h)
  - **Ganho:** Segurança crítica

- [ ] **MP3.11** - Sem validação de URLs (utils.js:1-3)
  - **Impacto:** Erros em YouTube URLs inválidas
  - **Esforço:** Pequeno (1h)
  - **Ganho:** Tratamento de erros robusto

- [ ] **MP3.7** - Sem tratamento de erros em imports (main.js:1-2)
  - **Impacto:** Erro silencioso se módulo falhar
  - **Esforço:** Pequeno-médio (1h)
  - **Ganho:** Debug facilitado

- [ ] **MP3.9** - localStorage sem validação (script.js:15-19)
  - **Impacto:** Possível erro se quota excedida
  - **Esforço:** Pequeno (1h)
  - **Ganho:** Fallback seguro

- [ ] **MP3.14** - Sem dados estruturados JSON-LD
  - **Impacto:** Sem rich snippets
  - **Esforço:** Pequeno (1h)
  - **Ganho:** Rich snippets implementados

- [ ] **MP3.15** - Inconsistência de idioma (Várias)
  - **Impacto:** Pequena inconsistência
  - **Esforço:** Mínimo (15m)
  - **Ganho:** Padronização

- [ ] **MP3.17** - Sem manifest.json (PWA)
  - **Impacto:** Não é PWA
  - **Esforço:** Médio (1-2h)
  - **Ganho:** Installable app

- [ ] **MP3.6** - Estrutura de pastas desorganizada
  - **Impacto:** Manutenção difícil
  - **Esforço:** Médio-Alto (2-3h refactoring)
  - **Ganho:** Projeto organizado

---

## 🟡 PROBLEMAS MÉDIOS (14)

### Performance (5)
- [ ] **P1.5** - CSS/JS sem minificação
  - **Esforço:** Médio (2-3h setup)
  - **Ganho:** -30-40% tamanho

- [ ] **P1.7** - Sem compressão Gzip
  - **Esforço:** Pequeno (30m infra)
  - **Ganho:** -70% tamanho

- [ ] **P1.8** - Sem Service Worker
  - **Esforço:** Médio-Alto (3-4h)
  - **Ganho:** Offline support + PWA

- [ ] **P1.10** - Viewport meta tag não otimizado
  - **Esforço:** Mínimo (10m)
  - **Ganho:** Melhor mobile UX

- [ ] **P1.12** - Renderização bloqueante
  - **Esforço:** Mínimo (5m)
  - **Ganho:** Renderização mais rápida

### Acessibilidade (4)
- [ ] **A2.7** - "Gerenciar Perfis" sem context
  - **Esforço:** Pequeno (30m)
  - **Ganho:** Melhor acessibilidade

- [ ] **A2.11** - Links externos sem "abre em nova aba"
  - **Esforço:** Pequeno (30m)
  - **Ganho:** Expectativa do usuário melhor

- [ ] **A2.13** - Badges sem ARIA labels
  - **Esforço:** Pequeno (1h)
  - **Ganho:** Badges acessíveis

- [ ] **A2.14** - Sem feedback auditivo
  - **Esforço:** Médio (2h)
  - **Ganho:** Acessibilidade completa

### Melhores Práticas (5)
- [ ] **MP3.4** - Arquivo vazio js/index.js
  - **Esforço:** Mínimo (5m)
  - **Ganho:** Código limpo

- [ ] **MP3.5** - Sem "use strict"
  - **Esforço:** Mínimo (15m)
  - **Ganho:** Modo strict ativado

- [ ] **MP3.8** - Comentários em português desnecessários
  - **Esforço:** Pequeno (1h)
  - **Ganho:** Código mais limpo

- [ ] **MP3.12** - Sem versionamento de assets
  - **Esforço:** Médio (2h setup)
  - **Ganho:** Cache-busting automático

- [ ] **MP3.16** - Sem breadcrumb navigation
  - **Esforço:** Pequeno-médio (1-2h)
  - **Ganho:** UX melhorada

---

## 📈 IMPACTO POR CATEGORIA

### Lighthouse Score Esperado

**Antes da análise:**
- Performance: ~60/100
- Accessibility: ~65/100
- Best Practices: ~70/100
- SEO: ~50/100

**Depois da implementação (Críticos + Altos):**
- Performance: ~85/100 (+25)
- Accessibility: ~90/100 (+25)
- Best Practices: ~85/100 (+15)
- SEO: ~75/100 (+25)

**Depois de implementar TODOS os problemas:**
- Performance: ~95/100 (+35)
- Accessibility: ~97/100 (+32)
- Best Practices: ~95/100 (+25)
- SEO: ~92/100 (+42)

---

## ⏱️ TIMELINE RECOMENDADA

### Sprint 1 (1-2 semanas) - CRÍTICOS
**Tempo total: ~20-25h**
```
Dia 1-2: Setup e infra
  - Corrigir caminhos de arquivo (MP3.3) - 30m
  - Adicionar favicon (MP3.3.1) - 20m
  - Remover rel security issues (MP3.10) - 15m

Dia 3-4: Performance base
  - Lazy loading de imagens (P1.3) - 3-4h
  - Lazy load iframes (P1.4) - 2h
  - Cache headers (P1.6) + Gzip (P1.7) - 1h

Dia 5: Acessibilidade base
  - Alt text descritivo (A2.1) - 1h
  - ARIA labels em botões (A2.4) - 2h
  - Focus indicators (A2.8) - 1-2h

Dia 6-7: Meta tags e entrega
  - Meta tags SEO (MP3.2) - 1h
  - Testar com Lighthouse - 2h
  - Ajustes finais - 2h
```

### Sprint 2 (2-4 semanas) - ALTOS
**Tempo total: ~30-35h**
```
- Otimizar fonts (P1.1, P1.2) - 2-3h
- Estrutura de pastas (MP3.6) - 2-3h
- Semântica HTML (A2.6) - 1-2h
- Validação URLs (MP3.11) - 1h
- Skip links + Breadcrumb (A2.12, MP3.16) - 2-3h
- JSON-LD + Structured data (MP3.14) - 1-2h
- PWA setup (manifest.json, MP3.17) - 2-3h
- Service Worker básico (P1.8) - 3-4h
- Tratamento erros (MP3.7, MP3.9) - 2-3h
- Testing + QA - 3-4h
```

### Sprint 3 (4-8 semanas) - MÉDIOS
**Tempo total: ~25-30h**
```
- Minificação (P1.5) - 2-3h
- Setup build tool (Webpack/Vite) - 4-5h
- Remover comentários (MP3.8) - 1-2h
- Cache-busting (MP3.12) - 1-2h
- Melhorar contrastes (A2.9) - 30m
- Badges ARIA (A2.13) - 1h
- Refactor components - 2-3h
- Testes de acessibilidade completos - 4-5h
- Documentação - 2-3h
- Deploy + Monitoring - 2-3h
```

---

## 🎯 QUICK WINS (Máximo impacto, mínimo esforço)

**Implementar estes 5 itens primeiro (30 minutos - 1h):**

1. **Corrigir caminhos de arquivo** (MP3.3)
   - Antes: `src="/assets/perfil-1.jpg"`
   - Depois: `src="assets/perfil-1.jpg"`
   - ⏱️ 10 minutos

2. **Adicionar favicon** (MP3.3.1)
   - ```html
     <link rel="icon" type="image/svg+xml" href="/favicon.svg">
     ```
   - ⏱️ 10 minutos

3. **Corrigir rel attribute** (MP3.10)
   - Adicionar `rel="noopener noreferrer"` em links externos
   - ⏱️ 10 minutos

4. **Corrigir contraste hover** (A2.9)
   - Trocar `#b3b3b3` por `#ffffff`
   - ⏱️ 5 minutos

5. **Adicionar basic ARIA labels** (A2.4 + A2.1)
   - Adicionar `aria-label` em botões principais
   - Melhorar alt text de perfil
   - ⏱️ 30 minutos

**Resultado:** +15-20 pontos Lighthouse, 100% rápido.

---

## 🔗 REFERÊNCIAS ÚTEIS

- **Lazy Loading:** https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
- **ARIA Labels:** https://www.w3.org/WAI/tutorials/images/
- **Web Vitals:** https://web.dev/vitals/
- **Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **CSP:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

---

## ✅ VALIDAÇÃO

Após implementar mudanças:

- [ ] Rodar Lighthouse (Target: 90+)
- [ ] Testar com keyboard (Tab, Enter, Escape)
- [ ] Testar com screen reader (NVDA, JAWS)
- [ ] Verificar contraste (WebAIM, WCAG Contrast Checker)
- [ ] Testar em mobile (Chrome DevTools)
- [ ] Verificar 404s em console
- [ ] Validar HTML (W3C Validator)
- [ ] Validar CSS (W3C Validator)
- [ ] Testar offline (se Service Worker implementado)
- [ ] Verificar bundle size antes/depois

---

Última atualização: 28 de Março de 2026
