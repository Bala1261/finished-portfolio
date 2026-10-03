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
 * - If window.__BEXO_PORTFOLIO__ is present (injected by BEXO runtime), uses it directly.
 * - If running as a standalone demo/preview (e.g. Vercel deployment without host injection),
 *   it renders the realistic Alex Morgan developer preview so the template can be evaluated live.
 *
 * Query Parameter Overrides:
 * - ?fixture=minimal     -> Tests empty states
 * - ?fixture=edge-cases  -> Tests stress cases
 * - ?fixture=alex-morgan -> Full developer profile
 */
export function getInitialPortfolio(): Portfolio {
  // 1. Strict Priority: Canonical BEXO Host Injection
  if (typeof window !== 'undefined' && window.__BEXO_PORTFOLIO__) {
    return window.__BEXO_PORTFOLIO__;
  }

  // 2. Query param fixture selector for live QA and test evaluation
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const fixtureParam = params.get('fixture') as FixtureKey | null;
      if (fixtureParam && FIXTURES[fixtureParam]) {
        return FIXTURES[fixtureParam].data;
      }
    } catch {
      // Fallback safely if URLSearchParams is unavailable
    }
  }

  // 3. Fallback to representative Alex Morgan fixture for standalone preview / Vercel demo
  return fixtureAlexMorgan;
}
