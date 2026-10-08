# Movimento Onça Pintada — Repaginação Completa do Site

**Data:** 2026-10-06
**Status:** Aprovado em conversa; aguardando revisão da spec
**Origem:** Migração do site Wix `https://movimentooncapintada.wixsite.com/movimentoncapintada`

## 1. Objetivo

Recriar o site do Movimento Onça Pintada como um site próprio (fora do Wix), focado em **conscientização do voto**. O sucesso do site se mede pela força da mensagem transmitida, não por funcionalidades.

Todo o **texto original é preservado integralmente** (incluindo as hashtags #ELENÃO, #OFILHOTAMBÉMNÃO, #FASCISTASNÃOPASSARÃO e o posicionamento político explícito). A repaginação é 100% visual e de experiência.

## 2. Decisões tomadas com o parceiro

| Decisão | Escolha |
|---|---|
| Conteúdo textual | Manter os textos do site original, sem alterações |
| Direção visual | Pôster de rua / movimento popular (cartaz de manifesto) |
| Estrutura | Página única imersiva, scroll contínuo |
| Animações | Cinematográficas (scroll-driven, marcantes porém contidas) |
| Identidade | "Movimento Onça Pintada" em todo o site (rodapé inclusive) |

## 3. Escopo

### Inclui
- Página única (one-page) com 5 seções: Hero, O Peso do Seu Voto, Reflita, Chamada Final, Rodapé.
- Textos originais do site Wix, integralmente.
- Animações de scroll (revelação, pinning, escala tipográfica).
- Design responsivo (mobile-first; a maioria do público acessará por celular).
- Identidade visual nova: paleta, tipografia, texturas, logo vetorial da onça.

### Exclui
- Formulário de contato/apoio funcional (o original só linka para uma página de contato do Wix; sem backend definido).
- CMS ou edição de conteúdo por não-desenvolvedores.
- Multi-idioma.
- Novos textos ou reescrita dos existentes.

## 4. Stack

- **Vite 8 + React 19 + TypeScript** — base de build moderna.
- **Tailwind CSS 4** (via plugin Vite) — estilização com tokens customizados.
- **GSAP + ScrollTrigger** — motor das animações cinematográficas de scroll (pinning, escala, stagger, timeline).
- Fontes via Google Fonts.
- Deploy: estático (Netlify, como o projeto irmão em `Fabricio/`).

### Por que não as alternativas
- HTML/JS puro: animações de scroll cinematográficas ficam limitadas; código de uma página rica em um único arquivo vira manutenção difícil.
- Astro: vantagens de conteúdo multi-página não se aplicam a uma one-page; setup adicional sem ganho.

## 5. Direção visual

### Paleta
| Token | Valor aproximado | Uso |
|---|---|---|
| `--ink` | Preto cru (~#0d0d0b) | Fundo principal, parecido com tinta de serigrafia sobre papel escuro |
| `--paper` | Off-white (~#f2ede3) | Corpo de texto, inversões |
| `--yellow` | Amarelo onça vibrante (~#ffc400) | Destaques, marcas de carimbo, destaques em caixa alta |
| `--green` | Verde bandeira (~#0a7d33) | Acentos, seção de chamada, detalhes da onça |
| `--raw` | Cinza concreto (~#4a463f) | Texturas, grão, sombras de carimbo |

### Tipografia
- **Manchetes:** "Anton" — condensada pesada, cartaz de rua, caixa alta, letras enormes que sangram as margens.
- **Corpo:** "Archivo" — grotesca de leitura, legível em texto corrido longo.
- **Carimbos/hashtags:** "Space Mono" — monoespaçada, textura de "carimbado à mão".
- Todas via Google Fonts, em uma única requisição.

### Textura e linguagem gráfica
- Grão de papel/concreto sobre os fundos (ruído sutil em CSS/SVG).
- Elementos de carimbo: bordas irregulares, leve rotação (-2° a +2°), opacidade de tinta não uniforme.
- Recortes de texto estilo pichação criativa: palavras destacadas com marcador amarelo atrás.
- A onça-pintada como símbolo: logo vetorial simplificado (silhueta), usado no hero como elemento gráfico grande e no rodapé pequeno.

## 6. Estrutura da página (topo → rodapé)

### 6.1 Hero
- Fundo escuro com textura. Logotipo tipográfico gigante "MOVIMENTO ONÇA PINTADA" em duas ou três linhas condensadas, com silhueta da onça integrada.
- Frase de abertura (do original): **"SE VOCÊ NÃO VOTOU NO PRIMEIRO TURNO DAS ELEIÇÕES, VOCÊ AINDA PODE FAZER A DIFERENÇA!"**
- Botão "SAIBA MAIS" (âncora para a próxima seção).
- Animação de entrada: linhas do título sobem em stagger; a onça surge com fade/scale.

### 6.2 O peso do seu voto
- Título "O PESO DO SEU VOTO".
- Texto histórico do original, quebrado em parágrafos com destaques (trechos-chave em amarelo).
- **Linha do tempo visual** animada pelo scroll com os marcos citados no texto: voto censitário → conquistas parciais → redemocratização → Constituição de 1988 (voto universal).
- Fechamento com o destaque: "Se você se identificou com algum desses grupos… o peso da sua escolha hoje é ainda maior."

### 6.3 Reflita
- Seção mais teatral: **"QUANDO VOCÊ NÃO ESCOLHE, ALGUÉM ESCOLHE POR VOCÊ."** em tipo gigante que escala/preenche a tela conforme o scroll (pinning do ScrollTrigger).
- O parágrafo completo do original entra em blocos escalonados após a frase-âncora.
- Sem imagens fotográficas; foco no texto e no contraste.

### 6.4 Chamada final
- Inversão de paleta: fundo em verde/amarelo vibrante, texto escuro.
- Frases do original em cartaz: "SEU VOTO FAZ A DIFERENÇA." / "JUNTOS SOMOS MAIS FORTES." / "NO DIA 25 VÁ ÀS URNAS E EXERÇA ESSE DIREITO."
- Hashtags como carimbos/selos sobrepostos: #ELENÃO, #OFILHOTAMBÉMNÃO, #FASCISTASNÃOPASSARÃO.
- Bloco "MEU BRASIL VERDE E AMARELO" (do original) como fechamento de seção.

### 6.5 Rodapé
- Pergunta do original: "QUEM VOCÊ ESTÁ DEIXANDO DECIDIR POR VOCÊ?"
- Silhueta da onça pequena + "© 2026 Movimento Onça Pintada. Todos os direitos reservados."
- Ícones sociais simples (sem links reais definidos no original — o Wix linkava para homepages genéricas; manter como links de placeholder `#`).

## 7. Animações (GSAP ScrollTrigger)

1. **Entrada do hero:** stagger nas linhas do título (clip-path/translateY), onça com fade+scale.
2. **Revelação de seções:** títulos e parágrafos entram por translateY+fade com stagger.
3. **Linha do tempo:** linha desenhada pelo progresso do scroll; marcos "carimbam" ao entrar na viewport.
4. **Reflita:** seção com pinning — a frase-âncora escala de ~0.6 → 1 preenchendo a tela enquanto o usuário rola.
5. **Hashtags:** entram como carimbos (scale down + leve rotação, com "impacto" de estampa).
- Todas as animações respeitam `prefers-reduced-motion` (fallback: conteúdo estático visível).
- Animações disparam uma vez (sem replay reverso ao subir, exceto a seção com pinning).

## 8. Acessibilidade

- Contraste WCAG AA entre texto e fundo em todas as seções (amarelo sobre preto e preto sobre amarelo passam com folga).
- HTML semântico: `<header>`, `<main>`, `<section>` com `aria-labelledby`, `<footer>`.
- Navegação por teclado funcional (âncoras, foco visível).
- `prefers-reduced-motion` desliga animações e pinning.
- Título de tamanho gigante usa `font-size: clamp()` para escalar sem quebrar em telas pequenas.

## 9. Responsividade

- Mobile-first. Tipografia com clamp() em 3 faixas (mobile/desktop-wide).
- Título gigante que sangra margens no desktop vira multi-linha compacta no mobile.
- Linha do tempo vira vertical no mobile (é vertical no desktop também — simplifica).
- Sem dependência de hover para revelar conteúdo (mobile não tem hover).

## 10. Arquitetura de arquivos

```
Movimento/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── netlify.toml
├── public/
│   └── favicon.svg            # silhueta da onça
└── src/
    ├── main.tsx
    ├── App.tsx                # composição das seções
    ├── index.css              # tokens Tailwind 4 (@theme), texturas, base
    ├── components/
    │   ├── Hero.tsx
    │   ├── PesoDoVoto.tsx     # inclui a linha do tempo
    │   ├── Reflita.tsx
    │   ├── ChamadaFinal.tsx
    │   ├── Footer.tsx
    │   └── OncaMark.tsx       # silhueta SVG da onça (reutilizável)
    ├── content/site.ts        # TODOS os textos originais, centralizados
    └── hooks/
        └── useReducedMotion.ts
```

### Fluxo de dados
- Textos ficam em `src/content/site.ts` como constantes tipadas — nenhum texto hardcoded nos componentes. Facilita futura reescrita sem tocar em layout.
- Animações registradas dentro de cada componente com `useEffect` + `gsap.context()`, limpas no unmount.

## 11. Testes e verificação

- `npm run build` sem erros de TypeScript.
- Verificação manual em navegador: desktop (1440px), laptop (1024px), mobile (390px).
- Testar `prefers-reduced-motion` (emulação no DevTools).
- Verificar contraste das seções invertidas (ferramenta ou inspeção visual).
- Se o Chrome DevTools MCP estiver disponível, usar para screenshot e checagem de console.

## 12. Riscos e notas

- **Texto gigante responsivo:** o maior risco visual. Mitigação: clamp() + testes em 3 larguras.
- **Pinning no mobile:** ScrollTrigger pinning pode oscilar em barras de endereço dinâmicas. Mitigação: usar `ignoreMobileResize: true` e testar; se instável, degradar a seção Reflita para animação sem pinning no mobile.
- **Silhueta da onça:** será desenhada como SVG simplificado (path manual). Não é foto nem ilustração complexa — linguagem gráfica de pôster admite forma reduzida.
- O dia "25" citado no texto original é mantido como está (não cabe a nós atualizar datas da campanha).
