import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APRESENTACAO, SOBRE_CORRUPCAO, SOBRE_VOTO_FEMININO } from '@/content/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { OncaMark } from '@/components/OncaMark';

const docs = [
  { id: 'apresentacao', title: APRESENTACAO.title, body: APRESENTACAO.body },
  { id: 'corrupcao', title: SOBRE_CORRUPCAO.title, body: SOBRE_CORRUPCAO.body },
  { id: 'voto-feminino', title: SOBRE_VOTO_FEMININO.title, body: SOBRE_VOTO_FEMININO.body },
] as const;

export const Documentos: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = ref.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.doc-title', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.fromTo('.doc-card', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.doc-card', start: 'top 80%', once: true },
      });
    }, section);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <section
      id="documentos"
      aria-labelledby="documentos-title"
      ref={ref}
      className="bg-ink text-paper px-6 sm:px-8 py-24 sm:py-32 grain"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="documentos-title"
            className="doc-title font-display text-[clamp(1.8rem,6vw,3.5rem)] leading-[0.95] uppercase mb-3"
          >
            DOCUMENTOS
          </h2>
          <OncaMark className="h-10 w-auto text-paper shrink-0 mt-1" />
        </div>
        <p className="font-mono text-paper/70 text-sm mb-10">
          Comunicados oficiais do movimento — leitura essencial antes do dia 25.
        </p>

        <div className="space-y-5">
          {docs.map((d) => {
            const isOpen = !!open[d.id];
            return (
              <article
                key={d.id}
                className="doc-card border border-yellow/25 rounded-lg overflow-hidden bg-ink/40"
              >
                <button
                  onClick={() => toggle(d.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <div>
                    <p className="font-display text-xl sm:text-2xl uppercase leading-none">
                      {d.title}
                    </p>
                    <p className="font-mono text-yellow text-xs mt-1 uppercase tracking-widest">
                      {isOpen ? 'fechar' : 'abrir'}
                    </p>
                  </div>
                  <svg
                    className={`w-6 h-6 text-yellow transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="border-t border-yellow/15 p-5 sm:p-6 font-body text-paper/75 text-sm whitespace-pre-line leading-relaxed">
                    {d.body}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Documentos;