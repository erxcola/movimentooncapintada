import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PESO, TIMELINE } from '@/content/site';
import { renderAccent } from '@/lib/renderAccent';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Timeline from './Timeline';

export const PesoDoVoto: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.peso-paragraph',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.timeline-rail',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-rail',
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 0.9, opacity: 0, rotate: -2 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.5,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        '.peso-callout',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.peso-callout',
            start: 'top 88%',
            once: true,
          },
        }
      );

      // Refresh ScrollTrigger after fonts are loaded to recalc positions
      if (document?.fonts?.ready) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }
    }, ref);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="peso"
      aria-labelledby="peso-title"
      ref={ref}
      className="relative bg-ink text-paper px-6 sm:px-8 py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-y-0 left-4 lg:left-8 w-px bg-paper/20 hidden sm:block" aria-hidden="true" />
      <div className="absolute inset-y-0 right-4 lg:right-8 w-px bg-paper/20 hidden sm:block" aria-hidden="true" />
      <div className="max-w-3xl mx-auto">
        <h2
          id="peso-title"
          className="font-display text-[clamp(2.3rem,5.5vw,4.5rem)] uppercase leading-[1.12] mb-10"
        >
          {PESO.title}
        </h2>

        <div className="space-y-6">
          {PESO.history.map((paragraph, index) => (
            <p key={index} className="peso-paragraph font-body text-paper/80 max-w-prose">
              {renderAccent(paragraph)}
            </p>
          ))}
        </div>

        <Timeline milestones={TIMELINE} />

        <div className="peso-callout max-w-prose border-l-4 border-yellow bg-paper text-ink p-6 sm:p-8 -rotate-1 shadow-[8px_8px_0_rgba(255,196,0,0.25)]">
          <p className="font-body text-ink/80">{renderAccent(PESO.closing)}</p>
        </div>
      </div>
    </section>
  );
};

export default PesoDoVoto;
