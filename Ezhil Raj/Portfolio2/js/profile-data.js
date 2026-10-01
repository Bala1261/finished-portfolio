/**
 * BEXO Standard Profile Preview Data
 * Template: Business & Management Executive Portfolio
 * Professional: David Vance (Senior Business Analyst & Strategy Consultant)
 */
export const defaultProfile = {
  user: {
    name: "David Vance",
    email: "david.vance.biz@gmail.com",
    phone: "+1 (212) 555-0194",
    photoUrl: "assets/executive_portrait.jpg",
    resumeUrl: "assets/David_Vance_Executive_Resume.pdf",
    openToHire: true,
    location: "New York, NY • Open to Global Relocation",
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com/in/davidvance-consulting", icon: "linkedin" },
      { name: "GitHub", url: "https://github.com/davidvance", icon: "github" },
      { name: "Email", url: "mailto:david.vance.biz@gmail.com", icon: "mail" }
    ]
  },
  profile: {
    handle: "davidvance",
    headline: "Senior Business Analyst & Strategy Consultant",
    careerGoal: "Bridging high-level corporate strategy and rigorous, data-driven analytical execution to unlock margin expansion and scalable governance.",
    bio: "I combine business thinking, analytical skills and practical execution to turn complex commercial challenges into measurable outcomes. Specializing in commercial due diligence, enterprise analytics, unit economics, and operational efficiency.",
    tagline: "Business decisions. Backed by insight.",
    overviewQuote: "Strategy means little without execution. I help leadership teams dissect ambiguity, uncover revenue levers, and streamline operational bottlenecks.",
    heroStats: [
      { value: "05+", label: "Strategic Projects", desc: "Commercial & analytics deliverables" },
      { value: "03", label: "Corporate Roles", desc: "Consulting & Fortune 500 finance" },
      { value: "92%", label: "Project Success", desc: "Client & stakeholder buy-in rate" },
      { value: "$6.5M+", label: "Capital Optimized", desc: "Identified synergies & freed cash" }
    ],
    infoBlocks: [
      { label: "Current Degree", value: "MBA Candidate, Strategy & Analytics", sub: "Stern School of Business, NYU" },
      { label: "Track Record", value: "3+ Years Corporate & Consulting", sub: "FinTech, Enterprise SaaS & Retail" },
      { label: "Primary Base", value: "New York, NY", sub: "Open to Global Relocation" },
      { label: "Availability", value: "Immediate / Fall 2026", sub: "Full-Time Roles & Strategic Advisory" }
    ]
  },
  projectEntries: [
    {
      id: "01",
      title: "Omnichannel Retail Profitability & Inventory Cockpit",
      category: "Business Analytics & Operations",
      year: "2025",
      role: "Lead Analytics Consultant",
      tagline: "Uncovering $2.4M in dormant working capital across 120 retail nodes.",
      description: "Designed a centralized Power BI and SQL analytical system for a multi-regional retail conglomerate to track gross margin return on inventory investment (GMROII), SKU velocity, and supplier SLA compliance in real time.",
      stack: ["Power BI", "SQL / Snowflake", "Advanced Excel", "DAX", "Data Modeling"],
      image: "assets/dashboard_retail.jpg",
      pdfUrl: "assets/David_Vance_Executive_Resume.pdf",
      externalLink: "https://linkedin.com/in/davidvance-consulting",
      metrics: [
        { label: "Working Capital Freed", value: "$2.4M" },
        { label: "Inventory Stockouts", value: "-34%" },
        { label: "Reporting Turnaround", value: "Daily (vs. Monthly)" }
      ],
      caseStudy: {
        challenge: "The client operated 120+ storefronts alongside a booming e-commerce platform. Due to fragmented ERP systems and siloed spreadsheet trackers, inventory planners were making reorder decisions based on 30-day-old lag data, leading to severe stockouts on top-sellers while slow-moving SKUs tied up cash.",
        research: "Conducted 18 stakeholder interviews with regional warehouse managers, inventory controllers, and store operators. Analyzed 2.8 million historical point-of-sale transaction records to map exact stockout frequency and mark-down erosion.",
        approach: "Built a unified star-schema data warehouse model connecting legacy SAP ERP, Shopify Plus webhooks, and third-party logistics (3PL) feeds into a single Snowflake instance. Designed tiered alert thresholds for SKU days of supply.",
        solution: "Engineered an executive Power BI cockpit with drill-down views from regional director oversight down to individual store shelf positions. Implemented automated safety-stock triggers factoring in seasonal delivery variance.",
        toolsUsed: ["Snowflake SQL", "Power BI Service", "Power Query", "Python (ETL verification)", "Excel Scenario Modeling"],
        results: [
          "Unlocked $2.4M in stagnant working capital by systematically liquidating bottom 15% slow-velocity SKUs.",
          "Decreased critical out-of-stock events across top 50 revenue-driving items from 11.2% to 2.8%.",
          "Automated the monthly supplier SLA report card, saving regional buyers 18 hours per procurement cycle."
        ],
        learnings: "Executive adoption hinges on simplicity. Replacing 40 dense data columns with 4 clear color-coded status pills accelerated store manager daily compliance from 40% to 94% within 60 days."
      }
    },
    {
      id: "02",
      title: "B2B SaaS Pricing Restructuring & Unit Economics Model",
      category: "Corporate Strategy & Finance",
      year: "2025",
      role: "Strategic Pricing Analyst",
      tagline: "Repositioning seat-based pricing to consumption tiers, lifting ARR by 28%.",
      description: "Conducted market willingness-to-pay research and built an econometric financial simulation to transition a Series B enterprise workflow SaaS provider from commoditized seat pricing to usage-metric pricing.",
      stack: ["Financial Modeling", "Van Westendorp PSM", "Cohort Analytics", "Excel / VBA", "Python"],
      image: "assets/dashboard_saas.jpg",
      pdfUrl: "assets/David_Vance_Executive_Resume.pdf",
      externalLink: "https://linkedin.com/in/davidvance-consulting",
      metrics: [
        { label: "ARR Expansion", value: "+28%" },
        { label: "Net Revenue Retention", value: "118%" },
        { label: "Payback Period", value: "8.2 Mo (from 14)" }
      ],
      caseStudy: {
        challenge: "A fast-growing workflow software provider with $12M ARR was experiencing margin compression. Competitors were bundling features for free, and large enterprise accounts were sharing single login seats to circumvent per-user license fees.",
        research: "Administered a Van Westendorp Price Sensitivity Meter study across 450 enterprise decision-makers. Analyzed telemetry logs from 45,000 active platform users to isolate the single metric most correlated with perceived business value (API transactions processed).",
        approach: "Modeled 6 distinct pricing architectures ranging from pure usage to hybrid platform fees plus metered consumption tiers. Ran Monte Carlo stress-testing against 1,200 existing contracts to measure renewal attrition risk.",
        solution: "Recommended and rolled out a hybrid 'Platform + Tiered Overages' pricing model. Created a self-serve ROI calculator for sales reps that demonstrated client value creation within 90 seconds during pitch meetings.",
        toolsUsed: ["Excel Dynamic Simulation", "Python (Monte Carlo)", "Stata (Econometric Regression)", "Tableau", "Salesforce CRM API"],
        results: [
          "Delivered a 28% year-over-year lift in Annual Recurring Revenue within 9 months of rollout.",
          "Expanded Net Revenue Retention (NRR) from 98% to 118%, transforming existing accounts into natural expansion engines.",
          "Cut enterprise sales cycle duration by 14 days by eliminating bespoke discounting negotiations."
        ],
        learnings: "Pricing is as much about customer psychology as it is about arithmetic. Grandfathering legacy champions with an exclusive loyalty tier prevented early churn and turned them into internal advocates."
      }
    },
    {
      id: "03",
      title: "Healthcare Network Logistics & Clinic Acquisition Due Diligence",
      category: "Management Consulting & M&A",
      year: "2024",
      role: "Commercial Diligence Associate",
      tagline: "Evaluating 14 ambulatory acquisition targets across the Northeast corridor.",
      description: "Structured an investment committee thesis, patient catchment demographic model, and commercial synergy matrix for a private equity buyout group acquiring regional urgent care and diagnostic facilities.",
      stack: ["M&A Valuation", "GIS Spatial Analytics", "DCF & LBO", "Excel", "Executive Presentations"],
      image: "assets/dashboard_retail.jpg",
      pdfUrl: "assets/David_Vance_Executive_Resume.pdf",
      externalLink: "https://linkedin.com/in/davidvance-consulting",
      metrics: [
        { label: "Targets Screened", value: "14 Assets" },
        { label: "Projected Synergies", value: "$4.1M" },
        { label: "IC Approval", value: "Unanimous" }
      ],
      caseStudy: {
        challenge: "A healthcare-focused private equity firm had 90 days of exclusivity to evaluate a regional network of 14 clinical assets valued at $75M. Leadership required verified patient footfall trends, commercial payer mix viability, and quantified back-office synergy forecasts.",
        research: "Aggregated state health authority inpatient/outpatient filings, regional demographic shift indices, and Medicare/commercial reimbursement fee schedules. Formulated drive-time isochrones around competing hospital systems.",
        approach: "Devised a multi-criteria scoring algorithm balancing geographic population growth, insurance reimbursement favorability, and physical facility expansion capacity. Modeled centralized billing and procurement consolidation benefits.",
        solution: "Delivered a 65-slide Investment Committee Memorandum and dynamic sensitivity workbook modeling base, upside, and downside recessionary cash-flow scenarios.",
        toolsUsed: ["Financial DCF & Synergy Model", "ArcGIS Spatial Mapping", "Alteryx Data Blending", "PowerPoint Pyramid Principle"],
        results: [
          "Secured unanimous Investment Committee approval to proceed with the primary $55M core asset cluster.",
          "Identified $4.1M in run-rate EBITDA synergies via centralized billing, lab contracts, and EHR license consolidation.",
          "Uncovered hidden malpractice liability exposure on 2 secondary facilities, saving the client $6M in contingent liabilities."
        ],
        learnings: "In commercial due diligence, confirming what NOT to acquire provides just as much alpha as picking the winning assets."
      }
    },
    {
      id: "04",
      title: "DTC Brand Churn Diagnostic & Customer Lifetime Value Engine",
      category: "Growth Strategy & Customer Analytics",
      year: "2024",
      role: "Growth Analyst",
      tagline: "Deconstructing subscription decay to extend 12-month LTV by 31%.",
      description: "Constructed survival analysis models and transactional cohort heatmaps for an e-commerce wellness brand experiencing elevated month-3 subscription cancellations.",
      stack: ["Cohort Heatmaps", "Survival Analytics", "SQL", "Tableau", "Marketing Mix Modeling"],
      image: "assets/dashboard_saas.jpg",
      pdfUrl: "assets/David_Vance_Executive_Resume.pdf",
      externalLink: "https://linkedin.com/in/davidvance-consulting",
      metrics: [
        { label: "12-Month LTV", value: "+31%" },
        { label: "Month-3 Churn Drop", value: "-22%" },
        { label: "CAC Payback", value: "3.4 Months" }
      ],
      caseStudy: {
        challenge: "Despite stellar paid social acquisition velocity, the brand was burning cash due to a steep cliff where 45% of subscribers cancelled during their third delivery cycle. Paid marketing spend was masking deep underlying retention decay.",
        research: "Analyzed 90,000 order histories and 3,400 post-cancellation exit surveys. Segmented cohorts by acquisition channel, first-purchase bundle size, and geographic delivery transit times.",
        approach: "Discovered that month-3 cancellations were primarily driven by product surplus accumulation rather than dissatisfaction. Built a flexible subscription frequency cadence algorithm ('Pause, Delay, or Swap').",
        solution: "Instituted proactive automated SMS check-ins at day 65 offering custom delivery rhythm modifications. Partnered with lifecycle marketing to introduce seasonal flavor previews before rebill dates.",
        toolsUsed: ["PostgreSQL", "Tableau Desktop", "Klaviyo API", "Excel Cohort Simulator"],
        results: [
          "Lowered month-3 churn rate by 22% within 90 days of cadence flexibility launch.",
          "Drove a 31% expansion in blended 12-month customer lifetime value across subsequent acquisition cohorts.",
          "Reduced CAC payback window from 5.8 months down to 3.4 months, returning unit economics to profitability."
        ],
        learnings: "Subscribers rarely cancel because they dislike your brand; they cancel because inflexible systems force them to choose between cancellation and unwanted waste."
      }
    }
  ],
  experienceEntries: [
    {
      year: "2025 - Present",
      role: "Strategic Business Analyst",
      company: "Apex Advisory Partners",
      type: "Full-Time Advisory",
      location: "New York, NY",
      description: "Spearheaded operational due diligence and unit-economic restructuring for mid-market B2B portfolio companies. Developed automated valuation models and management dashboards that shaved 25 hours off monthly board reporting cycles.",
      tags: ["Commercial Strategy", "Financial Modeling", "Power BI", "Executive Reporting"],
      isCurrent: true,
      highlights: [
        "Synthesized $42M SKU profitability matrix for consumer portfolio brand",
        "Presented weekly findings directly to C-suite and private equity operating partners",
        "Engineered automated forecast variance analysis across 14 operating subsidiaries"
      ]
    },
    {
      year: "2024 - 2025",
      role: "Strategy & Operations Intern",
      company: "Meridian Global FinTech",
      type: "MBA Internship",
      location: "Boston, MA",
      description: "Conducted churn cohort analysis across 140,000+ active SMB accounts. Identified 3 core onboarding friction points, engineered retention hypotheses, and partnered with Product & Growth teams to lift net revenue retention.",
      tags: ["Cohort Analytics", "SQL / Snowflake", "A/B Testing", "GTM Execution"],
      isCurrent: false,
      highlights: [
        "Boosted 60-day customer retention by 4.2% through streamlined KYC workflows",
        "Built automated daily funnel telemetry in Tableau monitored by executive leadership"
      ]
    },
    {
      year: "2023 - 2024",
      role: "Management Consultant Associate",
      company: "Northbridge Management Group",
      type: "Consulting",
      location: "Chicago, IL",
      description: "Advised industrial clients on logistics network consolidation and procurement renegotiation. Designed dynamic cost-allocation models in Excel/VBA that identified $3.4M in duplicate third-party freight expenditures.",
      tags: ["Operations", "Supply Chain", "Cost Optimization", "Financial Analysis"],
      isCurrent: false,
      highlights: [
        "Modeled multi-facility warehousing scenarios across 7 regional hubs",
        "Facilitated 15+ cross-functional discovery workshops across client stakeholder tiers"
      ]
    },
    {
      year: "2022 - 2023",
      role: "Junior Financial & Market Analyst",
      company: "Vanguard Commercial Analytics",
      type: "Analyst",
      location: "New York, NY",
      description: "Monitored macroeconomic indices, sector earnings trends, and competitor benchmarking reports. Built automated scraping and database pipelines feeding monthly investment committee memos.",
      tags: ["Market Research", "Financial Due Diligence", "Excel", "Data Synthesis"],
      isCurrent: false,
      highlights: [
        "Published 18 comprehensive competitor intelligence dossiers for asset managers",
        "Automated financial statement scraping, saving 12 analyst hours weekly"
      ]
    }
  ],
  educationEntries: [
    {
      degree: "Master of Business Administration (MBA)",
      institution: "Stern School of Business, NYU",
      year: "2024 - 2026",
      specialization: "Strategy & Business Analytics",
      gpa: "3.92 / 4.00",
      honors: "Dean's Honor List • President of Management Consulting Club",
      coursework: ["Corporate Strategy", "Predictive Modeling", "Advanced Corporate Finance", "Operations Strategy", "Executive Decision Making"]
    },
    {
      degree: "Bachelor of Business Administration (BBA)",
      institution: "Baruch College, Zicklin School of Business",
      year: "2019 - 2023",
      specialization: "Finance & Quantitative Economics",
      gpa: "3.88 / 4.00",
      honors: "Summa Cum Laude • Beta Gamma Sigma Honor Society",
      coursework: ["Financial Econometrics", "Managerial Accounting", "Database Management", "Macroeconomics", "Applied Calculus"]
    },
    {
      degree: "Executive Credentials & Certifications",
      institution: "Global Professional Institutions",
      year: "2023 - 2025",
      specialization: "Financial Modeling & Analytics",
      gpa: "Certified Professional",
      honors: "Chartered Financial Analyst (CFA) Level 1 Passed • Google Advanced Data Analytics",
      coursework: ["FMVA® Financial Modeling", "SQL for Enterprise Analytics", "Executive Presentation (Storytelling with Data)"]
    }
  ],
  certificateEntries: [
    {
      title: "Chartered Financial Analyst (CFA) — Level 1 Passed",
      issuer: "CFA Institute",
      year: "2024",
      credentialId: "CFA-L1-98421",
      link: "https://www.cfainstitute.org",
      description: "Scored in the top 10th percentile in Financial Statement Analysis and Quantitative Methods."
    },
    {
      title: "Google Advanced Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      year: "2024",
      credentialId: "GOOG-ADA-2024",
      link: "https://coursera.org",
      description: "Comprehensive credential covering Python regression, predictive modeling, and Tableau."
    },
    {
      title: "Financial Modeling & Valuation Analyst (FMVA®)",
      issuer: "Corporate Finance Institute (CFI)",
      year: "2023",
      credentialId: "CFI-FMVA-77192",
      link: "https://corporatefinanceinstitute.com",
      description: "Advanced mastery in 3-statement models, discounted cash flow (DCF), and LBO modeling."
    },
    {
      title: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
      issuer: "Microsoft",
      year: "2023",
      credentialId: "MSFT-PL300-8832",
      link: "https://learn.microsoft.com",
      description: "Demonstrated competence in enterprise data modeling, star schemas, and DAX formulations."
    }
  ],
  achievementEntries: [
    {
      category: "Leadership",
      title: "President, Management Consulting Club",
      org: "NYU Stern Graduate Association",
      year: "2025",
      desc: "Led a 240-member student chapter. Organized 8 corporate masterclasses with MBB partners and mentored 45 candidates through case interview preparation."
    },
    {
      category: "Competition",
      title: "1st Place Winner — National Business Strategy Cup",
      org: "Inter-Collegiate MBA Challenge",
      year: "2024",
      desc: "Won 1st place among 48 competing national teams for creating an innovative decarbonization supply chain roadmap for a Fortune 100 logistics carrier."
    },
    {
      category: "Honor Society",
      title: "Beta Gamma Sigma International Honor Society",
      org: "AACSB Accredited Chapter",
      year: "2023",
      desc: "Inducted into the highest international academic recognition program for collegiate business scholars (Top 7% of graduating class)."
    },
    {
      category: "Award",
      title: "Best Commercial BI Dashboard Award",
      org: "Northeast Analytics Summit",
      year: "2024",
      desc: "Recognized for designing the most intuitive, actionable enterprise retail telemetry cockpit using Power BI and Snowflake."
    },
    {
      category: "Fellowship",
      title: "Dean's Executive Leadership Fellow",
      org: "Graduate Business Fellowship Program",
      year: "2024",
      desc: "Awarded merit fellowship recognition for distinguished analytical research in commercial operations and corporate governance."
    }
  ],
  researchEntries: [
    {
      title: "Econometric Optimization of Dynamic Freight Logistics Networks",
      publisher: "Stern Working Papers in Applied Economics",
      year: "2025",
      type: "Working Paper",
      link: "https://github.com/davidvance",
      abstract: "Evaluated mixed-integer linear programming formulations to reduce deadhead miles across regional distribution clusters, demonstrating a 14% potential reduction in regional freight expenditure."
    },
    {
      title: "Empirical Evaluation of Consumption-Based vs. Seat-Based SaaS Pricing Elasticity",
      publisher: "Apex Strategic Research Briefing",
      year: "2024",
      type: "Strategic Brief",
      link: "https://github.com/davidvance",
      abstract: "Synthesized contract variance and gross churn indices across 22 B2B software vendors to quantify the expansion multiplier of hybrid overage pricing models."
    }
  ],
  skillEntries: [
    { name: "Corporate Strategy", category: "Strategy", level: "Expert", desc: "Growth vector modeling, GTM planning & market entry" },
    { name: "Market Research & TAM/SAM", category: "Strategy", level: "Advanced", desc: "Competitor profiling, market sizing & customer discovery" },
    { name: "Operations Optimization", category: "Strategy", level: "Advanced", desc: "Bottleneck elimination, lean workflows & capacity planning" },
    { name: "Financial Modeling & DCF", category: "Strategy", level: "Expert", desc: "3-statement models, sensitivity tables & scenario matrices" },
    { name: "Product Unit Economics", category: "Strategy", level: "Advanced", desc: "CAC, LTV, payback period & gross margin analysis" },
    { name: "Advanced Microsoft Excel", category: "Analytics", level: "Expert", desc: "XLOOKUP, Dynamic Arrays, Power Query, Solver & VBA" },
    { name: "Power BI & DAX", category: "Analytics", level: "Expert", desc: "End-to-end data modeling, star schemas & executive dashboards" },
    { name: "SQL (Postgres / Snowflake)", category: "Analytics", level: "Advanced", desc: "Window functions, CTEs, ETL pipelines & performance tuning" },
    { name: "Tableau Visualizations", category: "Analytics", level: "Advanced", desc: "Calculated fields, parameter actions & dashboard UX" },
    { name: "Python for Business", category: "Analytics", level: "Proficient", desc: "Pandas, NumPy, Matplotlib & statistical hypothesis testing" },
    { name: "Cohort & Churn Modeling", category: "Analytics", level: "Expert", desc: "Retention curves, behavioral clustering & survival modeling" },
    { name: "C-Suite Presentation", category: "Leadership", level: "Expert", desc: "Translating granular analytics into high-impact board slides" },
    { name: "Cross-Functional Leadership", category: "Leadership", level: "Advanced", desc: "Aligning Product, Engineering, Sales & Finance teams" },
    { name: "Stakeholder Negotiation", category: "Leadership", level: "Advanced", desc: "Consensus building, vendor renegotiation & trade-off framing" },
    { name: "Structured Problem Solving", category: "Leadership", level: "Expert", desc: "MECE framework, issue trees & hypothesis prioritization" },
    { name: "PowerPoint Pyramid Decks", category: "Tools", level: "Mastery", desc: "McKinsey/Bain pyramid-principle executive deck design" },
    { name: "Notion & Jira", category: "Tools", level: "Advanced", desc: "Knowledge management systems & sprint tracking" },
    { name: "Figma Prototyping", category: "Tools", level: "Proficient", desc: "Wireframing analytics layouts & UI governance" },
    { name: "Git & dbt", category: "Tools", level: "Proficient", desc: "Version control & data transformation workflows" }
  ]
};

// Mount to window for standalone and preview usage
if (typeof window !== "undefined") {
  window.defaultProfile = defaultProfile;
}
