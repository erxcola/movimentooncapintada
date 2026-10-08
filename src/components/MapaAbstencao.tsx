import React, { Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { UfStat } from './MapaLeaflet';

const MapaLeafletLazy = React.lazy(() => import('./MapaLeaflet'));

interface Br extends UfStat {}

const MapaAbstencao: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [stats, setStats] = useState<Map<string, UfStat> | null>(null);
  const [geojson, setGeojson] = useState<any>(null);
  const [hovered, setHovered] = useState<UfStat | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = ref.current;
    if (prefersReducedMotion || !section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.mapa-title', { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.fromTo('.mapa-sub', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
    }, section);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const el = mapAreaRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || stats) return;
    Promise.all([
      fetch('/data/abstencao-2026-uf.json').then((r) => r.json() as Promise<UfStat[]>),
      fetch('/data/brazil-states.geojson').then((r) => r.json()),
    ]).then(([ufs, gj]) => {
      setStats(new Map(ufs.map((u) => [u.uf, u])));
      setGeojson(gj);
    });
  }, [visible, stats]);

  return (
    <section
      id="mapa-abstencao"
      aria-labelledby="mapa-abstencao-title"
      ref={ref}
      className="bg-ink text-paper px-6 sm:px-8 py-24 sm:py-32 grain"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          id="mapa-abstencao-title"
          className="mapa-title font-display text-[clamp(2rem,7vw,5rem)] leading-[0.92] uppercase mb-4"
        >
          MAPA DA ABSTENÇÃO
        </h2>
        <p className="mapa-sub font-body text-paper/80 max-w-2xl mb-4">
          Quando você não escolhe, alguém escolhe por você. Quanto maior a abstenção no seu estado, mais o amarelo acende.
        </p>
        <p className="mapa-sub font-mono text-[11px] uppercase tracking-widest text-yellow/70 mb-10">
          Fonte: TSE — Boletins de Urna, 1º turno 2026 (dados oficiais agregados por seção)
        </p>

        <div className="mapa-card bg-paper text-ink border-l-4 border-yellow rounded-r-lg p-4 sm:p-6 shadow-[8px_8px_0_rgba(10,125,51,0.9)]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              {hovered ? (
                <div className="font-body">
                  <p className="font-display text-3xl sm:text-4xl uppercase leading-none">
                    {hovered.uf}
                  </p>
                  <p className="font-mono text-green text-2xl sm:text-3xl mt-1 font-bold">
                    {hovered.taxa_abstencao.toFixed(2).replace('.', ',')}%
                  </p>
                  <p className="text-ink/70 text-sm mt-1">
                    de {hovered.aptos.toLocaleString('pt-BR')} aptos · {hovered.abstencoes.toLocaleString('pt-BR')} não votaram
                  </p>
                </div>
              ) : (
                <div className="font-body">
                  <p className="font-display text-3xl sm:text-4xl uppercase leading-none">
                    BRASIL
                  </p>
                  <p className="font-mono text-green text-2xl sm:text-3xl mt-1 font-bold">20,85%</p>
                  <p className="text-ink/70 text-sm mt-1">
                    de 157,6 milhões de aptos, 32,9 milhões deixaram de votar no 1º turno
                  </p>
                </div>
              )}
            </div>
            <div className="hidden sm:block text-right shrink-0">
              <div className="w-40 h-2 rounded bg-gradient-to-r from-[#4a463f] to-[#ffc400]" aria-hidden="true" />
              <div className="flex justify-between font-mono text-[10px] text-ink/60 mt-1">
                <span>12%</span>
                <span>26%</span>
              </div>
            </div>
          </div>

          <div
            ref={mapAreaRef}
            className="aspect-[4/5] sm:aspect-[16/11] w-full bg-[#14130f] rounded overflow-hidden border border-ink/20"
          >
            {visible && stats && geojson ? (
              <Suspense fallback={<p className="font-mono text-yellow/60 text-xs p-4 uppercase">carregando mapa…</p>}>
                <MapaLeafletLazy stats={stats} geojson={geojson} onHover={setHovered} />
              </Suspense>
            ) : (
              <p className="font-mono text-yellow/60 text-xs p-4 uppercase">carregando dados…</p>
            )}
          </div>

          <p className="font-body text-ink/70 text-xs sm:text-sm mt-4 leading-relaxed">
            Passe o mouse (ou toque) num estado para ver sua taxa de abstenção. No Brasil, 32,9 milhões de pessoas não compareceram — o equivalente a toda a população do quarto maior país da América do Sul ausente das urnas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MapaAbstencao;
