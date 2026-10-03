import { Portfolio } from '../../types/bexo';

/**
 * Alex Morgan - Realistic Senior Systems & Full Stack Engineer Fixture
 * Strictly conforms to canonical BEXO Data Contract v1
 * FOR LOCAL DEVELOPMENT AND PREVIEW PURPOSES ONLY
 */
export const fixtureAlexMorgan: Portfolio = {
  profile: {
    name: 'Alex Morgan',
    handle: 'alexmorgan',
    headline: 'Staff Distributed Systems & Infrastructure Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    careerGoal: 'Pioneering low-latency event-driven runtimes and reliable cloud primitives.',
    openToHire: true,
  },
  summary: {
    text: 'Staff-level engineer with 8+ years architecting fault-tolerant distributed platforms, high-throughput streaming systems, and developer ergonomics. Passionate about systems programming in Rust, TypeScript runtime tooling, and zero-downtime database migrations.',
  },
  about: {
    currentStatus: 'Leading distributed data plane architecture for multi-region edge runtimes; contributing to open-source RPC engines and mentoring engineers.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Veloce Systems',
      role: 'Staff Infrastructure Engineer',
      dates: {
        start: { value: '2022-03-01', precision: 'month' },
        ongoing: true,
      },
      location: 'San Francisco, CA (Remote)',
      description: 'Architected and orchestrated the core distributed control plane, managing over 450k concurrent tenant workloads with sub-millisecond tail latencies.',
      responsibilities: [
        'Redesigned the cluster gossip consensus algorithm, eliminating cold-start partitions and lowering p99 response times by 38%.',
        'Implemented automatic sharding and dynamic load balancing across 14 multi-cloud availability zones.',
        'Mentored 12 senior and staff engineers across 3 time zones and authored internal RFCs for telemetry standards.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Aether Cloud',
      role: 'Senior Backend Engineer',
      dates: {
        start: { value: '2019-06-01', precision: 'month' },
        end: { value: '2022-02-28', precision: 'month' },
        ongoing: false,
      },
      location: 'Seattle, WA',
      description: 'Owned the high-volume streaming ingest pipeline processing 1.2 billion events daily for enterprise observability customers.',
      responsibilities: [
        'Migrated telemetry ingest microservices to Rust, slashing fleet compute costs by $420k annually.',
        'Engineered an append-only WAL cache backed by NVMe block storage with strict ACID semantics.',
        'Collaborated directly with enterprise customer architects to resolve high-concurrency ingestion bottlenecks.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Hexagon Labs',
      role: 'Software Engineer',
      dates: {
        start: { value: '2017-08-01', precision: 'month' },
        end: { value: '2019-05-31', precision: 'month' },
        ongoing: false,
      },
      location: 'Boston, MA',
      description: 'Built customer-facing data visualization tools and GraphQL gateway services for real-time analytics dashboards.',
      responsibilities: [
        'Implemented query batching and DataLoader caching, reducing database read amplification by 65%.',
        'Built full-stack end-to-end testing suite achieving 92% coverage with automated CI/CD gating.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'KestrelDB: High-Concurrency Embedded Time-Series Engine',
      category: 'Distributed Systems',
      description: 'An open-source embedded time-series database written in Rust. Features vectorized query evaluation, adaptive Gorilla compression, and zero-copy columnar scanning for IoT telemetry.',
      technologies: ['Rust', 'Apache Arrow', 'SIMD', 'LSM-Tree', 'gRPC'],
      role: 'Creator & Lead Maintainer',
      date: { value: '2024-01-15', precision: 'month' },
      dateLabel: 'Jan 2024',
      assets: [
        {
          id: 'kestrel-main',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
          name: 'KestrelDB Vector Benchmark Dashboard',
          alt: 'KestrelDB performance graph showing 2M writes per second',
        },
        {
          id: 'kestrel-arch',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
          name: 'KestrelDB Storage Engine Architecture',
          alt: 'Architecture diagram of the columnar storage engine',
        },
      ],
      links: [
        {
          id: 'link-kestrel-gh',
          label: 'GitHub Repository',
          url: 'https://github.com/alexmorgan/kestreldb',
          platform: 'github',
        },
        {
          id: 'link-kestrel-docs',
          label: 'Technical Whitepaper',
          url: 'https://kestreldb.dev/whitepaper',
          platform: 'generic',
        },
      ],
      credits: 'Special thanks to Apache Arrow PMC contributors and the Tokio async runtime community.',
    },
    {
      id: 'proj-2',
      title: 'PrismPulse: Real-Time Distributed Trace Visualizer',
      category: 'Developer Tools',
      description: 'Flamegraph visualization engine rendering million-span trace profiles at 60 FPS using WebGL canvas shaders. Integrates seamlessly with OpenTelemetry collectors.',
      technologies: ['TypeScript', 'WebGL', 'React', 'OpenTelemetry', 'Web Workers'],
      role: 'Principal Architect',
      date: { value: '2023-09-01', precision: 'month' },
      dateLabel: 'Sep 2023',
      assets: [
        {
          id: 'prism-shot',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          name: 'Trace Flamegraph Interface',
          alt: 'WebGL canvas flamegraph rendering deep distributed trace stacks',
        },
      ],
      links: [
        {
          id: 'prism-gh',
          label: 'Source Code',
          url: 'https://github.com/alexmorgan/prismpulse',
          platform: 'github',
        },
      ],
    },
    {
      id: 'proj-3',
      title: 'SynapseGate: eBPF-Powered Kubernetes Ingress Controller',
      category: 'Cloud Infrastructure',
      description: 'Zero-overhead L7 proxy bypass using eBPF kernel socket programs, lowering inter-pod networking latency by 45% compared to standard iptables NAT routing.',
      technologies: ['C', 'eBPF', 'Go', 'Kubernetes', 'Linux Kernel'],
      role: 'Co-Author',
      date: { value: '2023-04-10', precision: 'month' },
      dateLabel: 'Apr 2023',
      assets: [
        {
          id: 'synapse-img',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
          name: 'eBPF Kernel Socket Flow Diagram',
          alt: 'Networking socket route comparison between iptables and eBPF',
        },
      ],
      links: [
        {
          id: 'synapse-repo',
          label: 'GitHub Project',
          url: 'https://github.com/alexmorgan/synapsegate',
          platform: 'github',
        },
      ],
    },
    {
      id: 'proj-4',
      title: 'FluxWire: Deterministic Raft Consensus Laboratory',
      category: 'Distributed Systems',
      description: 'Interactive visualization and chaos-injection test harness for Raft consensus algorithms with reproducible deterministic simulation testing (DST).',
      technologies: ['Rust', 'WebAssembly', 'Svelte', 'Canvas API'],
      role: 'Author',
      date: { value: '2022-11-20', precision: 'month' },
      dateLabel: 'Nov 2022',
      assets: [
        {
          id: 'flux-img',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
          name: 'Chaos Simulation Grid',
          alt: 'Interactive Raft node state machine simulation',
        },
      ],
      links: [
        {
          id: 'flux-link',
          label: 'Live Simulation Lab',
          url: 'https://fluxwire.dev',
          platform: 'generic',
        },
      ],
    },
  ],
  skills: [
    { id: 'sk-1', name: 'Rust', category: 'Programming Languages' },
    { id: 'sk-2', name: 'Go', category: 'Programming Languages' },
    { id: 'sk-3', name: 'TypeScript', category: 'Programming Languages' },
    { id: 'sk-4', name: 'C/C++', category: 'Programming Languages' },
    { id: 'sk-5', name: 'Python', category: 'Programming Languages' },
    { id: 'sk-6', name: 'SQL', category: 'Programming Languages' },

    { id: 'sk-7', name: 'Distributed Consensus (Raft / Paxos)', category: 'Systems Architecture' },
    { id: 'sk-8', name: 'Vectorized Query Engines', category: 'Systems Architecture' },
    { id: 'sk-9', name: 'Event-Driven Architectures', category: 'Systems Architecture' },
    { id: 'sk-10', name: 'Microservices & Service Meshes', category: 'Systems Architecture' },
    { id: 'sk-11', name: 'High-Concurrency Concurrency Primitives', category: 'Systems Architecture' },

    { id: 'sk-12', name: 'PostgreSQL', category: 'Data & Storage' },
    { id: 'sk-13', name: 'Redis', category: 'Data & Storage' },
    { id: 'sk-14', name: 'Apache Kafka', category: 'Data & Storage' },
    { id: 'sk-15', name: 'ClickHouse', category: 'Data & Storage' },
    { id: 'sk-16', name: 'S3 & Object Stores', category: 'Data & Storage' },

    { id: 'sk-17', name: 'Kubernetes & CRDs', category: 'Infrastructure & DevOps' },
    { id: 'sk-18', name: 'Terraform / OpenTofu', category: 'Infrastructure & DevOps' },
    { id: 'sk-19', name: 'Docker / Containerd', category: 'Infrastructure & DevOps' },
    { id: 'sk-20', name: 'eBPF & Linux Tracing', category: 'Infrastructure & DevOps' },
    { id: 'sk-21', name: 'GitHub Actions CI/CD', category: 'Infrastructure & DevOps' },

    { id: 'sk-22', name: 'React', category: 'Frontend & Tooling' },
    { id: 'sk-23', name: 'GraphQL', category: 'Frontend & Tooling' },
    { id: 'sk-24', name: 'gRPC & Protobuf', category: 'Frontend & Tooling' },
    { id: 'sk-25', name: 'OpenTelemetry', category: 'Frontend & Tooling' },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Carnegie Mellon University',
      degree: 'Master of Science in Computer Science (Distributed Systems)',
      dates: {
        start: { value: '2015-09-01', precision: 'month' },
        end: { value: '2017-05-15', precision: 'month' },
        ongoing: false,
      },
      grade: '3.94 GPA / Dean’s Honors',
    },
    {
      id: 'edu-2',
      institution: 'University of Michigan',
      degree: 'Bachelor of Science in Computer Engineering',
      dates: {
        start: { value: '2011-09-01', precision: 'month' },
        end: { value: '2015-05-01', precision: 'month' },
        ongoing: false,
      },
      grade: 'Summa Cum Laude',
    },
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: { value: '2023-06-12', precision: 'day' },
      dateLabel: 'Jun 2023',
      credentialUrl: 'https://www.credly.com/org/linux-foundation',
      assets: [
        {
          id: 'cka-badge',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80',
          name: 'CKA Verified Badge',
          alt: 'CNCF CKA Certification Badge',
        },
      ],
    },
    {
      id: 'cert-2',
      title: 'AWS Certified Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      date: { value: '2022-10-18', precision: 'day' },
      dateLabel: 'Oct 2022',
      credentialUrl: 'https://aws.amazon.com/certification/',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner - Global Systems Hackathon',
      organization: 'Open Infrastructure Summit',
      project: 'SynapseGate eBPF Ingress',
      date: { value: '2023-05-10', precision: 'day' },
      dateLabel: 'May 2023',
      assets: [
        {
          id: 'hackathon-trophy',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
          name: 'Grand Prize Presentation',
          alt: 'Grand prize trophy presentation ceremony',
        },
      ],
    },
    {
      id: 'ach-2',
      title: 'Author of RFC-8842: Distributed Telemetry Ring Standard',
      organization: 'Cloud Observability Working Group',
      date: { value: '2022-08-01', precision: 'month' },
      dateLabel: 'Aug 2022',
    },
  ],
  research: [
    {
      id: 'res-1',
      title: 'Sub-Millisecond Tail Latency Guarantee via Predictive Sharding in Edge Distributed Runtimes',
      authors: ['Alex Morgan', 'Dr. Elena Rostova', 'K. Takahashi'],
      publication: 'IEEE International Conference on Distributed Computing Systems (ICDCS)',
      date: { value: '2023-07-20', precision: 'day' },
      dateLabel: 'Jul 2023',
      links: [
        {
          id: 'res-ieee-link',
          label: 'IEEE Xplore Digital Library',
          url: 'https://ieeexplore.ieee.org',
          platform: 'generic',
        },
      ],
      assets: [
        {
          id: 'res-paper-thumb',
          kind: 'image',
          url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
          name: 'Conference Presentation Slide',
          alt: 'Conference presentation slide on predictive sharding',
        },
      ],
    },
  ],
  contact: {
    email: 'alex.morgan.systems@gmail.com',
    links: [
      {
        id: 'c-gh',
        label: 'GitHub',
        url: 'https://github.com/alexmorgan',
        platform: 'github',
      },
      {
        id: 'c-in',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/alexmorgansystems',
        platform: 'linkedin',
      },
      {
        id: 'c-x',
        label: 'Twitter / X',
        url: 'https://twitter.com/alexmorgan_sys',
        platform: 'twitter',
      },
    ],
  },
  resume: {
    id: 'resume-pdf',
    kind: 'pdf',
    url: '/alex_morgan_resume.pdf',
    name: 'Alex_Morgan_Staff_Systems_Engineer_CV.pdf',
    sizeBytes: 1420000,
  },
};
