import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO } from '@/content/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set('.hero-line', { yPercent: 110, opacity: 0 });
      gsap.to('.hero-line', {
        yPercent: 0,
        opacity: 1,
        stagger: 0.08,
        ease: 'power3.out',
      });
      gsap.fromTo(
        '.hero-poster',
        { opacity: 0, scale: 0.96, rotate: -1 },
        { opacity: 1, scale: 1, rotate: -1, duration: 1, ease: 'power3.out', delay: 0.15 }
      );
    }, ref);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = HERO.headline.split(' ');

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="grain bg-ink text-paper relative overflow-hidden"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-10 lg:py-16 grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-12 items-center min-h-screen">
        <div className="order-2 lg:order-1 relative z-10">
          <div className="font-mono text-yellow uppercase tracking-[0.18em] text-xs sm:text-sm mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-yellow/60" aria-hidden="true" />
            Movimento Onça Pintada
          </div>
          <h1
            id="hero-title"
            className="font-display uppercase text-[clamp(2.1rem,6.2vw,4.6rem)] leading-[1.14] tracking-[-0.01em]"
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="hero-line inline-block mr-[0.22em]">
                {word}
              </span>
            ))}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
            <span className="bg-yellow text-ink px-2.5 py-1.5 rounded-sm font-bold">Verde e Amarelo</span>
            <span className="border border-paper/20 text-paper/70 px-2.5 py-1.5 rounded-sm">Preto e Branco</span>
            <span className="bg-green text-paper px-2.5 py-1.5 rounded-sm font-bold">Onça em P&B</span>
          </div>
          <a
            href="#peso"
            className="inline-block mt-8 px-8 py-4 bg-yellow text-ink font-bold uppercase tracking-wider rounded-md shadow-lg -rotate-1 hover:rotate-0 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {HERO.cta}
          </a>
        </div>

        <figure className="hero-poster order-1 lg:order-2 relative mx-auto w-full max-w-[min(88vw,520px)] lg:max-w-[560px] -rotate-1">
          <div className="absolute -top-3 -left-3 w-24 h-6 bg-yellow/90 rotate-6 shadow-md hidden sm:block" aria-hidden="true" />
          <div className="absolute -bottom-3 -right-3 w-20 h-6 bg-green rotate-3 shadow-md hidden sm:block" aria-hidden="true" />
          <img
            src="/onca-pintada-poster.jpg"
            alt="Pôster oficial do Movimento Onça Pintada — onça rugindo em alto contraste preto e branco estilo lambe-lambe com faixas Movimento Onça Pintada"
            width={1600}
            height={1600}
            decoding="async"
            fetchPriority="high"
            className="w-full aspect-square object-cover rounded-sm border border-paper/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-paper"
          />
          <figcaption className="sr-only">Símbolo oficial da onça em preto e branco — apoio cívico em verde e amarelo</figcaption>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-paper/45">
            <span>Movimento Onça Pintada</span>
            <span className="text-yellow/70">Lambe-lambe • Stencil</span>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
