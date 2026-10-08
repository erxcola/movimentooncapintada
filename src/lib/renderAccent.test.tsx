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
