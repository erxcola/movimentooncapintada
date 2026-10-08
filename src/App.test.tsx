import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.scrollTo = vi.fn();
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: false,
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
    if (url.includes('abstencao')) {
      return Promise.resolve({ ok: true, json: async () => [] });
    }
    if (url.includes('geojson')) {
      return Promise.resolve({ ok: true, json: async () => ({ type: 'FeatureCollection', features: [] }) });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  }));
});

describe('App', () => {
  it('renders the hero section', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeTruthy();
  });
});
