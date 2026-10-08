import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAMADA } from '@/content/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TAG_ROTATION = [-3, 2, -1] as const;
const TAG_ROTATION_CLASS = ['-rotate-3', 'rotate-2', '-rotate-1'] as const;

export const ChamadaFinal: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          once: true,
        },
      });

      tl.fromTo(
        '.chamada-line',
        { scale: 0.85, rotate: -6, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: 'back.out(1.7)',
        },
        0
      );

      tl.fromTo(
        '.chamada-tag',
        { scale: 0.4, opacity: 0, rotate: -14 },
        {
          scale: 1,
          opacity: 1,
          rotate: (index: number) => TAG_ROTATION[index % TAG_ROTATION.length],
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(2)',
        },
        '>-0.15'
      );

      tl.fromTo(
        '.chamada-bloco',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          ease: 'power3.out',
          transformOrigin: 'top',
        },
        '>-0.05'
      );

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
      id="chamada"
      aria-labelledby="chamada-title"
      ref={ref}
      className="bg-yellow text-ink py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <h2
          id="chamada-title"
          className="font-display uppercase leading-[1.12] flex flex-col gap-2 sm:gap-4"
        >
          {CHAMADA.lines.map((line) => (
            <span key={line} className="chamada-line block text-[clamp(2rem,7vw,6rem)]">
              {line}
            </span>
          ))}
        </h2>

        <ul className="mt-10 sm:mt-14 flex flex-wrap items-center gap-y-3 max-w-full">
          {CHAMADA.hashtags.map((tag, index) => (
            <li
              key={tag}
              className={`chamada-tag font-mono uppercase text-[0.7rem] sm:text-sm px-3 py-2 bg-ink text-yellow border-2 border-ink shadow-[4px_4px_0_rgba(13,13,11,0.35)] whitespace-nowrap -ml-2 first:ml-0 ${TAG_ROTATION_CLASS[index % TAG_ROTATION_CLASS.length]}`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="chamada-bloco mt-14 sm:mt-20 bg-green text-paper origin-top">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
          <p className="font-display uppercase leading-[1] text-[clamp(1.75rem,5vw,4rem)] text-center">
            {CHAMADA.bloco}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChamadaFinal;
