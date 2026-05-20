# ⚡ Galeria Arte Iel — Artes Plásticas & Design

Um portfólio digital disruptivo desenvolvido com **React**, **Tailwind CSS** e **Framer Motion**, projetado com uma estética pesada e expressionista inspirada em cartazes clássicos, fanzines e texturas analógicas de xerox. O projeto é totalmente responsivo, integrado ao **Sanity.io CMS** para gerenciamento dinâmico de obras e publicado de forma performática na **Vercel**.

---

## 🔬 Engenharia Visual & Funcionalidades

O projeto foge dos templates genéricos e limpos da web moderna para entregar uma experiência sensorial crua através de:

* **Efeito Estática de TV & Granulação Estocástica:** Camada de ruído dinâmico gerada nativamente via filtros matemáticos SVG em loop infinito de alta velocidade, simulando películas antigas de cinema ou monitores analógicos fora do ar.
* **Transição de Opacidade Cruzada na Logo:** Efeito suave e gradual no cabeçalho focado em hover, sem disparar cliques falsos ou quebras na renderização.
* **Seção de Citação com Scroll Travado:** Mecânica assíncrona baseada em `h-[200vh]` que congela a rolagem da página para consumir a energia do scroll do mouse e revelar o manifesto visual em etapas de texto rítmicas e independentes.
* **Efeito Túnel na Seção de Vendas:** Uso calibrado de `useScroll` e `useTransform` do Framer Motion para rotacionar e escalar quadros de forma assimétrica durante a rolagem, criando um efeito imersivo de descida.
* **Galeria com Filtros Dinâmicos (AnimatePresence):** Reorganização automática do grid de obras baseado em superfícies e estados sem os "pulos" secos do HTML puro.
* **Gestão de Conteúdo via Sanity.io:** Arquitetura limpa conectada ao Sanity via queries `GROQ` nativas, permitindo que o cliente atualize fotos, tags e metadados técnicos sem encostar no código do repositório.

## 🛠️ Tecnologias Utilizadas

* **Front-end:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) (Build rápido e otimizado)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) v4
* **Motion Design:** [Framer Motion](https://www.framer.com/motion/) (Animações baseadas em hardware)
* **CMS:** [Sanity.io](https://www.sanity.io/) (Headless CMS e CDN otimizado de imagens)
* **Hospedagem:** [Vercel](https://vercel.com/) (Deploy contínuo integrado ao Git)

---

## 📦 Deploy na Vercel
O projeto foi configurado com a branch main travada como gatilho de produção. Qualquer alteração ou refatoração enviada via Git passará pelo pipeline de automação da Vercel:

Bash
git add .
git commit -m "feat: ajustes de padding e granulação brutalista"
git push origin main

Criado por Eduardo Serpa. Inspirado na estética das artes de Iel. ⚡
