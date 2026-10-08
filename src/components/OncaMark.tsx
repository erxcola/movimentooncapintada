import React from 'react';

const rosette = (cx: number, cy: number, r: number, seed: number) => {
  const petals = 6;
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2 + seed;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r * 0.85;
    dots.push(<circle key={i} cx={px} cy={py} r={r * 0.32} fill="var(--color-ink)" />);
  }
  dots.push(<circle key="c" cx={cx} cy={cy} r={r * 0.3} fill="var(--color-ink)" />);
  return <g key={`${cx}-${cy}`}>{dots}</g>;
};

export const OncaMark: React.FC<{ className?: string; title?: string }> = ({
  className,
  title,
}) => {
  const ariaHidden = !title;
  const role = title ? 'img' : undefined;

  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden={ariaHidden}
      role={role}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path
        d="M 20 80 C 10 70, 5 55, 10 40 C 20 20, 45 10, 65 15 C 75 5, 95 5, 110 10 C 135 5, 165 10, 180 30 C 190 45, 190 70, 175 80 L 160 90 L 140 95 L 110 100 L 80 95 L 60 90 L 40 85 Z"
        fill="currentColor"
        stroke="none"
      />
      {rosette(55, 48, 6.5, 0.4)}
      {rosette(85, 42, 5.5, 1.7)}
      {rosette(120, 42, 5.5, 2.9)}
      {rosette(147, 48, 6.5, 0.9)}
      {rosette(100, 60, 4.5, 2.1)}
    </svg>
  );
};
