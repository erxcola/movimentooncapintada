# Movimento Onça Pintada — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Movimento Onça Pintada vote-awareness site as a single-page immersive scroll experience with a street-poster visual identity, preserving all original copy.

**Architecture:** One-page React app composed of five section components (Hero, PesoDoVoto, Reflita, ChamadaFinal, Footer). All copy lives in a typed content module; components only render and animate it. GSAP + ScrollTrigger drive cinematic scroll animations, gated by a `prefers-reduced-motion` hook. Tailwind 4 `@theme` tokens carry the poster palette.

**Tech Stack:** Vite 8, React 19, TypeScript 5.7, Tailwind CSS 4 (`@tailwindcss/vite`), GSAP (with ScrollTrigger), Vitest + jsdom + @testing-library/react.

**Spec:** `Movimento/docs/superpowers/specs/2026-10-06-movimento-onca-pintada-design.md`

## Global Constraints

- Language: all user-facing copy is Brazilian Portuguese, preserved **verbatim** from the original Wix site (including hashtags, capitalization, and the original "ÁS URNAS" spelling). Do not rewrite, correct, or translate.
- Identity name everywhere: **"Movimento Onça Pintada"** (including footer). Never "Movimento de Relações Públicas".
- Palette tokens (exact): `--color-ink: #0d0d0b`, `--color-paper: #f2ede3`, `--color-yellow: #ffc400`, `--color-green: #0a7d33`, `--color-raw: #4a463f`.
- Fonts: headlines **Anton**, body **Archivo**, stamps/hashtags **Space Mono** (Google Fonts, single `<link>`).
- No contact form, no backend, no CMS, no i18n, no social links with real URLs (use `href="#"`).
- Every animation must be disabled under `prefers-reduced-motion: reduce`, and content must remain visible (never stuck at `opacity: 0`).
- Path alias `@/` → `src/` (match the sibling `Fabricio/` project).
- The numeric date "NO DIA 25" is correct and must not be changed.

## Review Focus

Failure modes this plan's tests do not fully exercise, most likely first:

1. **Accent-marker leakage** — copy uses `**…**` to mark highlighted spans; an unclosed or stray marker must never reach the DOM as literal `**`. Owned by Task 2's tests.
2. **Oversized headlines on narrow screens** — condensed display text can overflow horizontally at 390px. Owned by Tasks 4–7 verification (no horizontal scroll at 390px).
3. **Reduced-motion leaving content invisible** — sections set initial `opacity: 0` for GSAP; if the animation is skipped they must be forced visible. Owned by Task 3's hook tests + Task 9 verification.
4. **ScrollTrigger pinning jank on mobile** — dynamic browser chrome resize can destabilize the pinned Reflita section. Owned by Task 6 (`ignoreMobileResize`) + Task 9 device check.
5. **Contrast in the inverted section** — dark text on yellow/green must still clear WCAG AA 4.5:1. Owned by Task 3's token comments + Task 9 verification.

---

### Task 1: Project scaffold and toolchain

**Files:**
- Create: `Movimento/package.json`
- Create: `Movimento/vite.config.ts`
- Create: `Movimento/tsconfig.json`
- Create: `Movimento/index.html`
- Create: `Movimento/src/main.tsx`
- Create: `Movimento/src/App.tsx`
- Create: `Movimento/src/index.css`
- Create: `Movimento/src/vite-env.d.ts`
- Create: `Movimento/vitest.config.ts`
- Create: `Movimento/netlify.toml`
- Create: `Movimento/public/robots.txt`
- Create: `Movimento/.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces: a runnable Vite project; `npm run build`, `npm run dev`, `npm run test` all work; `App.tsx` default-exports a placeholder root component.

- [ ] **Step 1: Create `package.json`**

Mirror the sibling project's versions; add GSAP and Vitest to devDependencies.

```json
{
  "name": "movimento-onca-pintada",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "gsap": "^3.13.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^6.0.0",
    "jsdom": "^25.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^8.0.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`**

`vite.config.ts` (same shape as sibling):

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  server: { host: '0.0.0.0', port: 5173 },
  preview: { host: '0.0.0.0', port: 5173 },
});
```

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  test: { environment: 'jsdom', globals: true, setupFiles: [] },
});
```

`tsconfig.json`: copy the sibling's compilerOptions verbatim (`target ES2020`, `strict`, `jsx react-jsx`, `paths @/*`), and set `"include": ["src", "vite.config.ts", "vitest.config.ts"]`. Add `"types": ["node", "vitest/globals"]`.

- [ ] **Step 3: Create `index.html` with SEO/meta matching the original theme**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movimento Onça Pintada | O peso do seu voto</title>
    <meta name="description" content="Quando você não escolhe, alguém escolhe por você. Conscientização sobre a importância do voto e o peso da sua escolha." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Movimento Onça Pintada" />
    <meta property="og:description" content="Quando você não escolhe, alguém escolhe por você. Seu voto é a sua principal ferramenta de mudança." />
    <meta property="og:locale" content="pt_BR" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `src/index.css` with palette tokens and base reset**

```css
@import "tailwindcss";

@theme {
  --font-display: 'Anton', sans-serif;
  --font-body: 'Archivo', sans-serif;
  --font-mono: 'Space Mono', monospace;
  --color-ink: #0d0d0b;
  --color-paper: #f2ede3;
  --color-yellow: #ffc400;
  --color-green: #0a7d33;
  --color-raw: #4a463f;
}
```

Plus base styles: `body` uses `font-body`, `background-color: var(--color-ink)`, `color: var(--color-paper)`; `h1–h6` use `font-display`. Add a `.grain` utility: an `::after` pseudo-element with an inline SVG feTurbulence data-URI at low opacity, `pointer-events: none`. Add `:focus-visible { outline: 2px solid var(--color-yellow); outline-offset: 2px; }`. Add a comment block recording the contrast pairs: `paper (#f2ede3)` on `ink (#0d0d0b)` ≈ 16:1; `ink` on `yellow (#ffc400)` ≈ 12:1; `ink` on `green (#0a7d33)` ≈ 5.3:1 — all pass AA.

- [ ] **Step 5: Create `main.tsx`, `vite-env.d.ts`, `App.tsx` (placeholder), `netlify.toml`, `public/robots.txt`, `.gitignore`**

`main.tsx`: standard React 19 `createRoot` + `StrictMode` render of `<App />`, importing `./index.css`.

`vite-env.d.ts`: `/// <reference types="vite/client" />`.

`App.tsx` placeholder returns `<main><h1 className="font-display text-5xl p-8">Movimento Onça Pintada</h1></main>`.

`netlify.toml`: `[build] command = "npm run build"`, `publish = "dist"`; SPA catch-all redirect `/* → /index.html 200`; security headers block (X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera/mic/geolocation off).

`robots.txt`: `User-agent: *` / `Allow: /`.

`.gitignore`: `node_modules`, `dist`, `.DS_Store`, `*.local`.

- [ ] **Step 6: Create `public/favicon.svg`**

A monochrome yellow-on-transparent simplified onça silhouette (reuse the `OncaMark` paths from Task 3 later if convenient; a simple paw print is acceptable for the favicon).

- [ ] **Step 7: Install and verify build**

Run: `npm install` then `npm run build`
Expected: build completes, `dist/index.html` exists, no TypeScript errors.

- [ ] **Step 8: Verify dev server**

Run: `npm run dev` (in background), fetch `http://localhost:5173` and confirm the placeholder heading renders; then stop the server.

- [ ] **Step 9: Commit**

```bash
git add Movimento/package.json Movimento/package-lock.json Movimento/vite.config.ts Movimento/vitest.config.ts Movimento/tsconfig.json Movimento/index.html Movimento/src Movimento/netlify.toml Movimento/public Movimento/.gitignore
git commit -m "chore(movimento): scaffold Vite + React + TS + Tailwind + Vitest"
```

---

### Task 2: Content module (all original copy)

**Files:**
- Create: `Movimento/src/content/site.ts`
- Create: `Movimento/src/content/site.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces, all `readonly`-typed named exports used by every section:
  - `HERO: { headline: string; cta: string }`
  - `PESO: { title: string; history: string[]; closing: string }`
  - `TIMELINE: readonly TimelineMilestone[]` where `TimelineMilestone = { year: string; title: string; description: string }`
  - `REFLITA: { anchor: string; body: string[] }`
  - `CHAMADA: { lines: string[]; hashtags: string[]; bloco: string }`
  - `FOOTER: { question: string; copyright: string }`

- [ ] **Step 1: Write the failing tests**

```ts
// src/content/site.test.ts
import { describe, it, expect } from 'vitest';
import { HERO, PESO, TIMELINE, REFLITA, CHAMADA, FOOTER } from './site';

const allStrings = [HERO.headline, HERO.cta, PESO.title, PESO.closing, REFLITA.anchor, CHAMADA.bloco, FOOTER.question, FOOTER.copyright, ...PESO.history, ...REFLITA.body, ...CHAMADA.lines, ...TIMELINE.flatMap((m) => [m.year, m.title, m.description])];

describe('site copy', () => {
  it('preserves the hero headline verbatim', () => {
    expect(HERO.headline).toBe('SE VOCÊ NÃO VOTOU NO PRIMEIRO TURNO DAS ELEIÇÕES, VOCÊ AINDA PODE FAZER A DIFERENÇA!');
  });
  it('preserves the three hashtags verbatim', () => {
    expect(CHAMADA.hashtags).toEqual(['#ELENÃO', '#OFILHOTAMBÉMNÃO', '#FASCISTASNÃOPASSARÃO']);
  });
  it('keeps the original "ÁS URNAS" spelling', () => {
    expect(CHAMADA.lines).toContain('NO DIA 25 VÁ ÁS URNAS E EXERÇA ESSE DIREITO.');
  });
  it('every highlight marker is balanced', () => {
    for (const s of allStrings) {
      const count = (s.match(/\*\*/g) ?? []).length;
      expect(count % 2, `unbalanced markers in: ${s}`).toBe(0);
    }
  });
  it('has four timeline milestones ending in 1988', () => {
    expect(TIMELINE.length).toBe(4);
    expect(TIMELINE.at(-1)!.year).toBe('1988');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `./site`.

- [ ] **Step 3: Implement `src/content/site.ts`**

Use `**…**` to mark highlighted spans inside the copy (rendered later by Task 3's `renderAccent`). Exact values:

```ts
export const HERO = {
  headline: 'SE VOCÊ NÃO VOTOU NO PRIMEIRO TURNO DAS ELEIÇÕES, VOCÊ AINDA PODE FAZER A DIFERENÇA!',
  cta: 'SAIBA MAIS',
} as const;

export interface TimelineMilestone { year: string; title: string; description: string }

export const PESO = {
  title: 'O PESO DO SEU VOTO',
  history: [
    'Historicamente no Brasil, o direito ao voto para todos ainda é uma conquista recente, que só foi plenamente alcançada na **Constituição Federal de 1988**, com a redemocratização do país no pós-ditadura.',
    'Antes disso, passamos por várias mudanças no que diz respeito ao direito ao voto censitário, as eleições indiretas, a ditadura e, por fim o voto universal (para todos os cidadãos maiores de 18 anos) com a redemocratização do país e a Constituição Federal de 1988.',
    'Ou seja, pessoas do sexo feminino, de ascendência indígena, africana, cigana, de religião matriz-africana ou pobre, não poderiam votar 60 anos atrás, muito menos á 100 ou 200 anos atrás.',
  ],
  closing: 'Se você se identificou com algum desses grupos que foi citado, o peso da sua escolha hoje é ainda maior.',
} as const;

export const TIMELINE: readonly TimelineMilestone[] = [
  { year: '1824', title: 'Voto censitário', description: 'O direito ao voto era restrito por renda: só votava quem tinha posses.' },
  { year: '1932', title: 'Voto feminino', description: 'O Código Eleitoral garantiu o voto às mulheres.' },
  { year: '1964', title: 'Ditadura e voto indireto', description: 'Eleições indiretas e supressão de direitos durante o regime militar.' },
  { year: '1988', title: 'Voto universal', description: 'A Constituição Cidadã consagra o voto para todos os maiores de 18 anos.' },
] as const;

export const REFLITA = {
  anchor: 'QUANDO VOCÊ NÃO ESCOLHE, ALGUÉM ESCOLHE POR VOCÊ.',
  body: [
    'Votar não é apenas cumprir uma obrigação ou escolher um nome nas urnas; é definir quem vai tomar as decisões sobre a sua rotina, o seu bolso, a sua saúde e o futuro da sua comunidade.',
    'Quando você se abstém de votar, o seu silêncio não anula a eleição. Ele apenas transfere o seu poder de escolha para os outros. O resultado vai impactar a sua vida da mesma forma, quer você tenha participado ou não.',
    'Não deixe que decidam o seu amanhã por você. **Pesquise, questione, avalie e faça a sua voz ser ouvida.** O seu voto é a sua principal ferramenta de mudança.',
  ],
} as const;

export const CHAMADA = {
  lines: ['SEU VOTO FAZ A DIFERENÇA.', 'JUNTOS SOMOS MAIS FORTES.', 'NO DIA 25 VÁ ÁS URNAS E EXERÇA ESSE DIREITO.'],
  hashtags: ['#ELENÃO', '#OFILHOTAMBÉMNÃO', '#FASCISTASNÃOPASSARÃO'],
  bloco: 'MEU BRASIL VERDE E AMARELO',
} as const;

export const FOOTER = {
  question: 'QUEM VOCÊ ESTÁ DEIXANDO DECIDIR POR VOCÊ?',
  copyright: '© 2026 Movimento Onça Pintada. Todos os direitos reservados.',
} as const;
```

Note in a code comment: the timeline years are standard historical anchors that support the original prose (censitário, indiretas, ditadura, 1988); they add no claim beyond it.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add Movimento/src/content
git commit -m "feat(movimento): centraliza todo o texto original em content/site.ts"
```

---

### Task 3: Design system — accent renderer, reduced-motion hook, onça mark

**Files:**
- Create: `Movimento/src/lib/renderAccent.tsx`
- Create: `Movimento/src/lib/renderAccent.test.tsx`
- Create: `Movimento/src/hooks/useReducedMotion.ts`
- Create: `Movimento/src/hooks/useReducedMotion.test.tsx`
- Create: `Movimento/src/components/OncaMark.tsx`

**Interfaces:**
- Consumes: nothing (marker literals `**` are defined here).
- Produces:
  - `renderAccent(text: string): React.ReactNode` — splits `**…**` spans into `<mark>` elements (yellow background, ink text); strips markers. Unpaired marker renders as literal text (never crashes).
  - `useReducedMotion(): boolean` — reactive to `(prefers-reduced-motion: reduce)`.
  - `OncaMark: React.FC<{ className?: string; title?: string }>` — decorative SVG silhouette; `aria-hidden` unless `title` given.

- [ ] **Step 1: Write failing tests**

`renderAccent.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderAccent } from './renderAccent';

describe('renderAccent', () => {
  it('renders plain text unchanged', () => {
    render(<p>{renderAccent('sem marcador')}</p>);
    expect(screen.getByText('sem marcador')).toBeTruthy();
  });
  it('wraps marked span in <mark> and strips the markers', () => {
    const { container } = render(<p>{renderAccent('antes **destaque** depois')}</p>);
    expect(container.querySelector('mark')?.textContent).toBe('destaque');
    expect(container.textContent).toBe('antes destaque depois');
    expect(container.textContent).not.toContain('**');
  });
  it('does not crash on an unpaired marker', () => {
    const { container } = render(<p>{renderAccent('quebrado **aqui')}</p>);
    expect(container.textContent).toContain('quebrado');
    expect(container.textContent).not.toContain('**');
  });
});
```

`useReducedMotion.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

beforeEach(() => {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: false, media: q,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

describe('useReducedMotion', () => {
  it('returns a boolean and false when motion is allowed', () => {
    expect(renderHook(() => useReducedMotion()).result.current).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the three modules**

`renderAccent.tsx`: split on `/\*\*(.+?)\*\*/g`; return array of strings and `<mark key style={{background:'var(--color-yellow)', color:'var(--color-ink)'}}>`. If a `**` remains with no closing pair, strip remaining literal `**` and render surrounding text (regex with global flag + a final `.replace(/\*\*/g,'')` on leftover segments).

`useReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

`OncaMark.tsx`: export a functional component returning an inline `<svg viewBox="0 0 200 120">` with a hand-authored simplified onça-pintada head/torso silhouette path in `currentColor`, plus a few small spots. `aria-hidden={!title}`, `role={title ? 'img' : undefined}`, `<title>{title}</title>` when provided.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all tests).

- [ ] **Step 5: Commit**

```bash
git add Movimento/src/lib Movimento/src/hooks Movimento/src/components/OncaMark.tsx
git commit -m "feat(movimento): renderizador de destaque, hook reduced-motion e marca da onca"
```

---

### Task 4: Hero section

**Files:**
- Create: `Movimento/src/components/Hero.tsx`
- Modify: `Movimento/src/App.tsx`

**Interfaces:**
- Consumes: `HERO` from `@/content/site`; `OncaMark`, `useReducedMotion` from Task 3.
- Produces: `Hero: React.FC` — `<section id="hero" aria-labelledby="hero-title" className="grain">`.

- [ ] **Step 1: Implement `Hero.tsx`**

Structure: full-viewport (`min-h-screen`) dark `bg-ink text-paper` section. Small eyebrow `font-mono text-yellow` "MOVIMENTO ONÇA PINTADA". `<h1 id="hero-title" className="font-display">` rendering `HERO.headline` in condensed uppercase, sizing `text-[clamp(2.5rem,9vw,7rem)] leading-[0.92]`, each word wrapped in a `<span className="hero-line inline-block">` for stagger. `OncaMark` positioned as a large low-opacity (`text-yellow/20`) graphical element behind/beside the text. An anchor `<a href="#peso" className="...">` with `HERO.cta`, styled as a bold yellow stamp button with slight rotation.

- [ ] **Step 2: Wire animation with GSAP**

In a `useEffect`, if `useReducedMotion()` is true, return early (content already visible). Otherwise `gsap.registerPlugin(ScrollTrigger)` and within `gsap.context(() => {...}, ref)` animate `.hero-line` from `{ yPercent: 110, opacity: 0 }` to `{ yPercent: 0, opacity: 1, stagger: 0.08, ease: 'power3.out' }` and fade/scale `OncaMark`. Clean up with `ctx.revert()`.

- [ ] **Step 3: Mount in `App.tsx`**

Replace the placeholder with `<Hero />` inside `<main>`.

- [ ] **Step 4: Verify build and visually**

Run: `npm run build`
Expected: PASS.
Run: `npm run dev`; confirm at 1440px and 390px: headline fits, no horizontal scroll, CTA visible, onça mark behind text. Toggle DevTools "Emulate prefers-reduced-motion: reduce" — headline is instantly visible.

- [ ] **Step 5: Commit**

```bash
git add Movimento/src/components/Hero.tsx Movimento/src/App.tsx
git commit -m "feat(movimento): secao hero com titular de impacto e animacao de entrada"
```

---

### Task 5: "O peso do seu voto" section with timeline

**Files:**
- Create: `Movimento/src/components/PesoDoVoto.tsx`
- Create: `Movimento/src/components/Timeline.tsx`
- Modify: `Movimento/src/App.tsx`

**Interfaces:**
- Consumes: `PESO`, `TIMELINE` from `@/content/site`; `renderAccent` (Task 3); `useReducedMotion` (Task 3).
- Produces: `PesoDoVoto: React.FC` (`<section id="peso" aria-labelledby="peso-title">`); `Timeline: React.FC<{ milestones: readonly TimelineMilestone[] }>`.

- [ ] **Step 1: Implement `PesoDoVoto.tsx`**

Paper-on-ink invert is not used here; keep dark. `<h2 id="peso-title" className="font-display text-[clamp(2.5rem,6vw,5rem)]">` = `PESO.title`. Map `PESO.history` to paragraphs with `font-body text-paper/80 max-w-prose`, passing each through `renderAccent`. Render `Timeline` between paragraphs 3 and the closing. Closing paragraph `PESO.closing` rendered via `renderAccent` inside a yellow-bordered callout with a slight rotation.

- [ ] **Step 2: Implement `Timeline.tsx`**

Vertical list: a left rail line (`bg-yellow/40`) and one row per milestone. Each row: `font-display text-yellow` year, `font-body font-bold` title, `font-body text-paper/70` description. Each row carries class `timeline-item`.

- [ ] **Step 3: Animate**

`useReducedMotion` early-return. ScrollTrigger on the section: paragraphs fade/translate in with stagger on enter; the rail line's `scaleY` grows from 0→1 scrubbed to scroll (`scrub: true`); each `.timeline-item` stamps in (`scale: 0.9 → 1, opacity 0 → 1, rotate: -2deg → 0`) when entering. Clean up with `gsap.context`.

- [ ] **Step 4: Mount in `App.tsx`** below `Hero`.

- [ ] **Step 5: Verify build and visually**

Run: `npm run build`; then `npm run dev` and confirm timeline rail draws on scroll, items stamp in, and the closing callout is readable. Re-check 390px (rail stays vertical, no overflow).

- [ ] **Step 6: Commit**

```bash
git add Movimento/src/components/PesoDoVoto.tsx Movimento/src/components/Timeline.tsx Movimento/src/App.tsx
git commit -m "feat(movimento): secao peso do voto com linha do tempo animada"
```

---

### Task 6: "Reflita" pinned section

**Files:**
- Create: `Movimento/src/components/Reflita.tsx`
- Modify: `Movimento/src/App.tsx`

**Interfaces:**
- Consumes: `REFLITA` from `@/content/site`; `renderAccent`, `useReducedMotion` (Task 3).
- Produces: `Reflita: React.FC` (`<section id="reflita" aria-labelledby="reflita-anchor">`).

- [ ] **Step 1: Implement `Reflita.tsx`**

Darkest section. `<h2 id="reflita-anchor" className="refilta-anchor font-display text-[clamp(2.5rem,10vw,8rem)] leading-[0.9]">` = `REFLITA.anchor`. Below it, a container `refilta-body` mapping `REFLITA.body` to paragraphs (with `renderAccent`).

- [ ] **Step 2: Animate with a pinned ScrollTrigger**

`useReducedMotion` early-return (content visible, no pin). Otherwise create a ScrollTrigger with `trigger: section, start: 'top top', end: '+=120%', pin: true, scrub: 1, ignoreMobileResize: true`, animating `scale: 0.6 → 1` and slight `letterSpacing` on `.refilta-anchor`, and fading `.refilta-body` paragraphs in near the end. Register cleanup.

- [ ] **Step 3: Reduced-motion fallback sizing**

When reduced motion is on, ensure the section is normal-flow (`position: static`) and the anchor renders at its clamped font-size with no scale transform. Achieve by only adding pinning/scaling in the animated branch; base CSS must not set `transform`/`opacity: 0`.

- [ ] **Step 4: Mount in `App.tsx`** below `PesoDoVoto`.

- [ ] **Step 5: Verify build and visually**

Run: `npm run build`; then `npm run dev`. Confirm the anchor scales up and pins while body paragraphs reveal. Test mobile viewport scroll (pinning stable, no jump). Test reduced-motion: no pin, all text visible.

- [ ] **Step 6: Commit**

```bash
git add Movimento/src/components/Reflita.tsx Movimento/src/App.tsx
git commit -m "feat(movimento): secao reflita com pinning e escala cinematografica"
```

---

### Task 7: Final call section

**Files:**
- Create: `Movimento/src/components/ChamadaFinal.tsx`
- Modify: `Movimento/src/App.tsx`

**Interfaces:**
- Consumes: `CHAMADA` from `@/content/site`; `useReducedMotion` (Task 3).
- Produces: `ChamadaFinal: React.FC` (`<section id="chamada" aria-labelledby="chamada-title">`).

- [ ] **Step 1: Implement `ChamadaFinal.tsx`**

Palette inversion: `bg-yellow text-ink`. `<h2 id="chamada-title" className="font-display">` with each of `CHAMADA.lines` on its own huge line (`text-[clamp(2rem,7vw,6rem)]`). Render `CHAMADA.hashtags` as overlapping stamps: `font-mono uppercase` chips, `bg-ink text-yellow` (or outlined), each with slight random-ish rotation (-3deg/+2deg/-1deg) and `shadow-[...]`. Render `CHAMADA.bloco` ("MEU BRASIL VERDE E AMARELO") on a green (`bg-green text-paper`) band as the section closer.

- [ ] **Step 2: Animate**

`useReducedMotion` early-return. ScrollTrigger: lines stamp in (`scale 0.85→1, rotate`, stagger), hashtag chips pop in with a slight overshoot (`back.out(2)`), then the green band wipes in (`scaleY 0→1` transform-origin top).

- [ ] **Step 3: Mount in `App.tsx`** below `Reflita`.

- [ ] **Step 4: Verify build and visually**

Run: `npm run build`; then `npm run dev`. Confirm contrast of ink-on-yellow and paper-on-green is readable, hashtags don't overflow at 390px (wrap or shrink), and stamps animate on entry.

- [ ] **Step 5: Commit**

```bash
git add Movimento/src/components/ChamadaFinal.tsx Movimento/src/App.tsx
git commit -m "feat(movimento): chamada final com inversao de paleta e carimbos"
```

---

### Task 8: Footer

**Files:**
- Create: `Movimento/src/components/Footer.tsx`
- Modify: `Movimento/src/App.tsx`

**Interfaces:**
- Consumes: `FOOTER` from `@/content/site`; `OncaMark` (Task 3).
- Produces: `Footer: React.FC` (`<footer>`).

- [ ] **Step 1: Implement `Footer.tsx`**

Dark `bg-ink text-paper` footer. Large `font-display` rendering of `FOOTER.question` as a full-width statement. Below: row with small `OncaMark` (`className="text-yellow"`), the `FOOTER.copyright` line (`font-mono text-xs text-paper/60`), and simple social icon links (`href="#"`) for Facebook, Instagram, YouTube, X, LinkedIn, TikTok (inline SVGs). Each `aria-label` names the network.

- [ ] **Step 2: Mount in `App.tsx`** after `</main>`.

- [ ] **Step 3: Verify build and visually**

Run: `npm run build`; then `npm run dev`. Confirm footer renders, social icons keyboard-focusable, focus ring visible.

- [ ] **Step 4: Commit**

```bash
git add Movimento/src/components/Footer.tsx Movimento/src/App.tsx
git commit -m "feat(movimento): rodape com pergunta final e onca"
```

---

### Task 9: Full composition, reduced-motion pass, and responsive QA

**Files:**
- Modify: `Movimento/src/App.tsx` (final composition + page shell)
- Modify: `Movimento/src/index.css` (only if QA reveals token/utility gaps)

**Interfaces:**
- Consumes: all section components.
- Produces: the complete page; final QA evidence.

- [ ] **Step 1: Finalize `App.tsx`**

Compose: a wrapper `<div className="min-h-screen bg-ink text-paper font-body selection:bg-yellow selection:text-ink">`, then `<main>` with `Hero`, `PesoDoVoto`, `Reflita`, `ChamadaFinal`, then `<Footer />`.

- [ ] **Step 2: Reduced-motion audit**

With DevTools emulating `prefers-reduced-motion: reduce`, scroll the whole page top to bottom. Confirm every section's text is visible with no transforms/opacity gating, and no ScrollTrigger pinning occurs. Record the result in the commit message.

- [ ] **Step 3: Responsive audit**

Check 390px, 768px, 1024px, 1440px. Confirm: no horizontal scrollbar at any width (check `document.documentElement.scrollWidth <= window.innerWidth`); headlines never clip; hashtags wrap; timeline stays vertical.

- [ ] **Step 4: Contrast audit**

Spot-check rendered foreground/background pairs in the yellow and green sections. Confirm ink-on-yellow and paper-on-green both read as AA.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: PASS, no TS errors.

- [ ] **Step 6: Commit**

```bash
git add Movimento/src/App.tsx Movimento/src/index.css
git commit -m "feat(movimento): composicao final da pagina e aprovacao de QA responsivo/a11y"
```

---

### Task 10: SEO files and deployment config

**Files:**
- Create: `Movimento/public/sitemap.xml`
- Verify: `Movimento/netlify.toml`, `Movimento/public/robots.txt`

**Interfaces:**
- Consumes: nothing new.
- Produces: shippable static output.

- [ ] **Step 1: Create `public/sitemap.xml`**

Single-URL sitemap (placeholder origin `https://movimentooncapintada.example/`, to be replaced when a domain is chosen):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://movimentooncapintada.example/</loc>
    <lastmod>2026-10-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Verify robots and netlify config**

Confirm `robots.txt` allows all and reference the placeholder sitemap URL; confirm `netlify.toml` publish dir is `dist` with the SPA fallback and security headers.

- [ ] **Step 3: Final build and preview**

Run: `npm run build && npm run preview`; load the preview URL and confirm the whole page renders.

- [ ] **Step 4: Commit**

```bash
git add Movimento/public/sitemap.xml
git commit -m "chore(movimento): adiciona sitemap e finaliza config de deploy"
```
