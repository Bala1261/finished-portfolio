import { Portfolio } from '../types/bexo';
import { fixtureAlexMorgan } from './fixtures/fixtureAlexMorgan';
import { fixtureMinimal, fixtureEdgeCases } from './fixtures/fixtureTestScenarios';

declare global {
  interface Window {
    __BEXO_PORTFOLIO__?: Portfolio;
  }
}

export type FixtureKey = 'alex-morgan' | 'minimal' | 'edge-cases';

export const FIXTURES: Record<FixtureKey, { name: string; data: Portfolio }> = {
  'alex-morgan': {
    name: 'Alex Morgan (Full Profile)',
    data: fixtureAlexMorgan,
  },
  'minimal': {
    name: 'Minimal Profile (Empty Sections Check)',
    data: fixtureMinimal,
  },
  'edge-cases': {
    name: 'Edge Cases (15 Projects, Long Text, Missing Assets)',
    data: fixtureEdgeCases,
  },
};

/**
 * Resolves the active portfolio data according to BEXO injection contract.
 *
 * In Production:
 * Resolves directly from window.__BEXO_PORTFOLIO__ (injected by host renderer).
 *
 * In Development:
 * Defaults to the Alex Morgan development fixture, or allows testing different scenarios.
 */
export function getInitialPortfolio(): Portfolio {
  // Check window injection first (standard BEXO host injection)
  if (typeof window !== 'undefined' && window.__BEXO_PORTFOLIO__) {
    return window.__BEXO_PORTFOLIO__;
  }

  // Development environment fallback
  if (import.meta.env.DEV) {
    // Check URL search params for quick testing e.g. ?fixture=minimal
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fixtureParam = params.get('fixture') as FixtureKey | null;
      if (fixtureParam && FIXTURES[fixtureParam]) {
        return FIXTURES[fixtureParam].data;
      }
    }
    return fixtureAlexMorgan;
  }

  // In production if no data was injected yet, return a safe minimal default
  return {
    profile: {
      name: '',
    },
  };
}
