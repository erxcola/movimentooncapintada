import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REFLITA } from '@/content/site';
import { renderAccent } from '@/lib/renderAccent';
import { OncaMark } from '@/components/OncaMark';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const Reflita: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        '.refilta-anchor',
        { scale: 0.6, letterSpacing: '-0.04em' },
        { scale: 1, letterSpacing: '0.02em', duration: 1 },
        0
      );

      tl.fromTo(
        '.refilta-body p',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.05 },
        0.7
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
      id="reflita"
      aria-labelledby="reflita-anchor"
      ref={ref}
      className="bg-black text-paper px-6 sm:px-8 py-16 sm:py-24 min-h-screen flex flex-col items-center justify-center"
    >
      <h2
        id="reflita-anchor"
        className="refilta-anchor font-display uppercase text-center max-w-5xl origin-center text-[clamp(2.3rem,8.5vw,6.5rem)] leading-[1.12]"
      >
        {REFLITA.anchor}
      </h2>

      <OncaMark className="mt-8 h-10 w-auto text-yellow opacity-90" />

      <div className="refilta-body mt-6 sm:mt-10 max-w-2xl space-y-4 sm:space-y-6">
        {REFLITA.body.map((paragraph, index) => (
          <p
            key={index}
            className="font-body text-sm sm:text-base leading-relaxed text-paper/75"
          >
            {renderAccent(paragraph)}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Reflita;
