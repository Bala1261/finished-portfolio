import { Portfolio } from '../../types/bexo';

/**
 * Minimal Profile: Validates that all optional sections safely hide
 * No projects, no experience, no education, no certs, no achievements, no research, no avatar, no resume
 */
export const fixtureMinimal: Portfolio = {
  profile: {
    name: 'Jordan Vane',
    headline: 'Junior Software Engineer',
    openToHire: true,
  },
  summary: {
    text: 'Building web tools with clean TypeScript and modern CSS.',
  },
  contact: {
    email: 'jordan.vane@example.com',
  },
};

/**
 * Edge Case Profile:
 * Very long name, missing assets, missing links, 16 projects, long descriptions
 */
export const fixtureEdgeCases: Portfolio = {
  profile: {
    name: 'Dr. Montgomery Bartholomew Alistair Fitzgerald-O’Callaghan III',
    handle: 'monty-ultra-long-handle-systems-engineering-lead',
    headline: 'Chief Distributed Cryptographic Protocol & High-Throughput Quantitative Kernel Optimization Fellow',
    openToHire: false,
  },
  summary: {
    text: 'A veteran computing specialist who has spent decades exploring the theoretical limits of deterministic computing engines, memory barriers, micro-architectural side-channel mitigations, and formal verification methodologies across decentralized state machines.',
  },
  about: {
    currentStatus: 'Conducting formal verification of zero-knowledge arithmetic circuits under randomized fault injection attacks.',
  },
  // 15 projects to stress test grid rendering and overflow
  projects: Array.from({ length: 15 }, (_, i) => ({
    id: `stress-proj-${i + 1}`,
    title: `Scalable Distributed Cluster Partition Protocol v${i + 1}.0-alpha`,
    category: i % 3 === 0 ? 'Systems' : i % 3 === 1 ? 'Algorithms' : 'Security',
    description: `Comprehensive evaluation of Byzantine fault tolerance under extreme network asynchronous conditions, packet reordering, arbitrary partition drops, and adversarial sybil node clusters. `.repeat(i % 2 === 0 ? 3 : 1),
    technologies: ['C++', 'Rust', 'LLVM', 'Z3 SMT', 'Assembly'],
    role: 'Principal Investigator',
    dateLabel: `202${(i % 4) + 1}`,
    // Some have no assets, some have missing urls, some have links
    assets: i % 2 === 0 ? undefined : [],
    links: i % 3 === 0 ? [{ id: `l-${i}`, label: 'View Publication', url: 'https://example.com' }] : undefined,
  })),
  contact: {
    email: 'monty.fitzgerald@example.org',
  },
};
