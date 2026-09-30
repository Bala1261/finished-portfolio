/* =========================================
   HEADER & NAVIGATION
   ========================================= */

const header = document.querySelector("#header");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const navLinks = document.querySelectorAll(".main-nav a");

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true }
  );
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    link.classList.add("active");

    if (mainNav) {
      mainNav.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

/* =========================================
   SCROLL REVEAL & STAGGER ANIMATION (CONSOLIDATED)
   ========================================= */

function initRevealAnimation() {
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((element) => {
      element.classList.add("visible");
    });
    return;
  }

  // Immediately reveal elements already in the initial viewport on page load
  targets.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add("visible");
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  targets.forEach((element) => {
    if (!element.classList.contains("visible")) {
      revealObserver.observe(element);
    }
  });
}

/* =========================================
   HERO INTERACTIVE GRADIENT (GetLayers AI inspired)
   ========================================= */

function initHeroInteractiveGradient() {
  const heroSection = document.querySelector("#home");
  const heroWrap = document.querySelector("#heroGradientWrap");
  const canvas = document.querySelector("#heroInteractiveCanvas");
  if (!heroSection || !heroWrap || !canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let animId = null;
  let isVisible = false;
  let width = 0;
  let height = 0;

  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Blob parameters: positions and velocities (Toned down to subtle champagne/gold and ink textures)
  const blobs = [
    {
      x: 0.72,
      y: 0.35,
      radius: 380,
      color: "rgba(214, 179, 110, 0.05)", // Muted champagne gold
      vx: 0.00035,
      vy: 0.00028,
      phase: 0
    },
    {
      x: 0.25,
      y: 0.65,
      radius: 420,
      color: "rgba(30, 32, 45, 0.2)", // Ink charcoal neutral
      vx: 0.00025,
      vy: 0.00042,
      phase: Math.PI / 2
    },
    {
      x: 0.5,
      y: 0.5,
      radius: 300,
      color: "rgba(214, 179, 110, 0.03)", // Subtle gold glow
      vx: 0.00045,
      vy: 0.00032,
      phase: Math.PI
    },
    {
      x: 0.78,
      y: 0.28,
      radius: 260,
      color: "rgba(214, 179, 110, 0.04)", // Warm gold highlight
      vx: 0.0002,
      vy: 0.0003,
      phase: Math.PI * 1.5
    }
  ];

  // Mouse tracking variables (smoothed lerp)
  let targetMouseX = 0.5;
  let targetMouseY = 0.5;
  let currentMouseX = 0.5;
  let currentMouseY = 0.5;
  let hasPointerMoved = false;

  function resize() {
    const rect = heroWrap.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    width = rect.width;
    height = rect.height;

    // Cap DPR at 1.5 for performance while keeping crisp visuals
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    if (reducedMotion) {
      renderFrame(0);
    }
  }

  function renderFrame(time) {
    if (!width || !height || width <= 0 || height <= 0) return;
    ctx.clearRect(0, 0, width, height);

    // Smooth pointer lerp on desktop with fine pointer
    if (isFinePointer && hasPointerMoved) {
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;
    }

    ctx.globalCompositeOperation = "screen";

    blobs.forEach((blob, idx) => {
      // Natural harmonic Lissajous drift
      const t = time || 0;
      let bx = (blob.x + Math.sin(t * blob.vx + blob.phase) * 0.18) * width;
      let by = (blob.y + Math.cos(t * blob.vy + blob.phase) * 0.15) * height;

      // Influence gold blobs slightly toward mouse on desktop
      if (isFinePointer && hasPointerMoved && (idx === 0 || idx === 3)) {
        const influence = idx === 3 ? 0.12 : 0.06;
        bx += (currentMouseX * width - bx) * influence;
        by += (currentMouseY * height - by) * influence;
      }

      // Responsive radial radius
      const r = Math.max(blob.radius * (width / 1200), 200);

      if (!Number.isFinite(bx) || !Number.isFinite(by) || !Number.isFinite(r) || r <= 0) return;

      try {
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(0.55, blob.color.replace(/[\d\.]+\)$/, "0.01)"));
        grad.addColorStop(1, "rgba(9, 10, 16, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fill();
      } catch (e) {
        // Guard against canvas radial gradient errors
      }
    });

    ctx.globalCompositeOperation = "source-over";
  }

  function loop(now) {
    if (!isVisible || reducedMotion) return;
    renderFrame(now);
    animId = window.requestAnimationFrame(loop);
  }

  function startAnimation() {
    if (animId || reducedMotion) return;
    animId = window.requestAnimationFrame(loop);
  }

  function stopAnimation() {
    if (animId) {
      window.cancelAnimationFrame(animId);
      animId = null;
    }
  }

  // Pointer listener on desktop with fine pointer only
  if (isFinePointer && !reducedMotion) {
    heroSection.addEventListener(
      "pointermove",
      (e) => {
        const rect = heroSection.getBoundingClientRect();
        targetMouseX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        targetMouseY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        hasPointerMoved = true;
      },
      { passive: true }
    );

    heroSection.addEventListener("pointerleave", () => {
      targetMouseX = 0.5;
      targetMouseY = 0.5;
    });
  }

  // Pause when hero leaves viewport
  if ("IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.05 }
    );
    heroObserver.observe(heroSection);
  } else {
    isVisible = true;
    startAnimation();
  }

  // Pause when document tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAnimation();
    } else if (isVisible) {
      startAnimation();
    }
  });

  // Resize handling
  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(heroWrap);
  } else {
    window.addEventListener("resize", resize, { passive: true });
  }

  resize();
  if (reducedMotion) {
    renderFrame(0);
  }
}



/* =========================================
   JOURNEY MILESTONE ACTIVATION (INTERSECTIONOBSERVER)
   ========================================= */

function initJourneyMilestones() {
  const journeyItems = document.querySelectorAll(".journey-item");
  if (!journeyItems.length) return;

  const progressLines = document.querySelectorAll(".journey-timeline-progress");

  function updateActiveProgress() {
    const activePanel = document.querySelector(".journey-panel.active");
    if (!activePanel) return;

    const items = activePanel.querySelectorAll(".journey-item");
    const activeItems = activePanel.querySelectorAll(".journey-item.is-active");
    const ratio = items.length > 0 ? Math.min(activeItems.length / items.length, 1) : 0;

    const line = activePanel.querySelector(".journey-timeline-progress");
    if (line) {
      line.style.transform = `scaleY(${ratio})`;
    }
  }

  if ("IntersectionObserver" in window) {
    const milestoneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            updateActiveProgress();
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -40px 0px" }
    );

    journeyItems.forEach((item) => milestoneObserver.observe(item));
  } else {
    journeyItems.forEach((item) => item.classList.add("is-active"));
    progressLines.forEach((line) => {
      line.style.transform = "scaleY(1)";
    });
  }

  // Expose helper to tab switcher
  window.updateJourneyProgress = updateActiveProgress;
}

/* =========================================
   RUNNING SECTION INDEX (OBSERVER & SIDEBAR UPDATE)
   ========================================= */

function initRunningSectionIndex() {
  const indexNum = document.querySelector("#runningIndexNum");
  const indexTitle = document.querySelector("#runningIndexTitle");
  const sections = document.querySelectorAll("section.section, .portfolio-page, .bexo-section-block");

  if (!indexNum || !indexTitle || !sections.length) return;

  const sectionMeta = {
    home: { num: "01", title: "HOME" },
    portfolio: { num: "02", title: "PORTFOLIO" },
    about: { num: "02", title: "PROFILE IDENTITY" },
    skills: { num: "02", title: "SKILLS" },
    experience: { num: "02", title: "EXPERIENCE" },
    education: { num: "02", title: "EDUCATION" },
    work: { num: "02", title: "SELECTED PROJECTS" },
    certificates: { num: "02", title: "CERTIFICATES" },
    leadership: { num: "02", title: "ACHIEVEMENTS" },
    contact: { num: "03", title: "LET’S CONNECT" }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sectionMeta[id]) {
              indexNum.textContent = sectionMeta[id].num;
              indexTitle.textContent = sectionMeta[id].title;
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }
}

/* =========================================
   SKILLS / CAPABILITIES SCROLL STAGE CONTROLLER
   ========================================= */

function initSkillsSectionScroll() {
  const skillsSection = document.querySelector("#skills");
  if (!skillsSection) return;

  const wrapper = skillsSection.querySelector(".skills-scroll-wrapper");
  if (!wrapper) return;

  const cards = skillsSection.querySelectorAll(".skills-card");
  const marqueeTrack = skillsSection.querySelector("#skillsMarqueeTrack");
  const marqueeItems = skillsSection.querySelectorAll(".marquee-item");
  const revealLayer = skillsSection.querySelector("#skillsRevealLayer");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (reducedMotion || isMobile) return;

  let ticking = false;

  function updateSkillsScroll() {
    const rect = wrapper.getBoundingClientRect();
    const scrollDistance = wrapper.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0) return;

    // Calculate section progress from 0.0 to 1.0
    const rawProgress = -rect.top / scrollDistance;
    const progress = Math.max(0, Math.min(1, rawProgress));

    // Staggered parallax & rotation for 5 capability cards
    cards.forEach((card) => {
      const speed = parseFloat(card.dataset.parallaxSpeed || "1.8");
      const rotStart = parseFloat(card.dataset.rotStart || "0");
      const rotEnd = parseFloat(card.dataset.rotEnd || "0");

      const translateY = progress * -540 * speed;
      const rotation = rotStart + (rotEnd - rotStart) * progress;
      const opacity = progress > 0.72 ? Math.max(0, 1 - (progress - 0.72) * 4.5) : 1;

      card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) rotateZ(${rotation.toFixed(2)}deg)`;
      card.style.opacity = opacity.toFixed(2);
    });

    // Translate left vertical marquee track
    if (marqueeTrack) {
      const marqueeY = progress * -150;
      marqueeTrack.style.transform = `translate3d(0, ${marqueeY.toFixed(2)}px, 0)`;

      const activeIdx = Math.min(marqueeItems.length - 1, Math.floor(progress * marqueeItems.length));
      marqueeItems.forEach((item, idx) => {
        item.classList.toggle("active", idx === activeIdx);
      });
    }

    // Reveal background typography as cards scatter away
    if (revealLayer) {
      const revealOpacity = Math.min(1, Math.max(0.15, 0.15 + progress * 0.85));
      const revealTranslateY = (1 - progress) * 25;
      revealLayer.style.opacity = revealOpacity.toFixed(2);
      revealLayer.style.transform = `translate3d(0, ${revealTranslateY.toFixed(2)}px, 0)`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateSkillsScroll);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateSkillsScroll();
}

function initVisuals() {
  try { initRevealAnimation(); } catch (e) { console.error("initRevealAnimation error:", e); }
  try { initHeroInteractiveGradient(); } catch (e) { console.error("initHeroInteractiveGradient error:", e); }
  try { initJourneyMilestones(); } catch (e) { console.error("initJourneyMilestones error:", e); }
  try { initRunningSectionIndex(); } catch (e) { console.error("initRunningSectionIndex error:", e); }
  try { initSkillsSectionScroll(); } catch (e) { console.error("initSkillsSectionScroll error:", e); }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVisuals);
} else {
  initVisuals();
}

/* =========================================
   JOURNEY TABS (EXPERIENCE & EDUCATION)
   ========================================= */

const journeyTabs = document.querySelectorAll(".journey-tab");
const journeyPanels = document.querySelectorAll(".journey-panel");

journeyTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetPanelId = tab.dataset.tab;

    journeyTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    journeyPanels.forEach((panel) => {
      const isActive = panel.id === targetPanelId;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });

    if (window.updateJourneyProgress) {
      window.updateJourneyProgress();
    }
  });
});

/* =========================================
   EXECUTIVE BUSINESS / MBA CASE STUDIES DATA
   // Customization Note: Replace or edit the case studies below with your own projects.
   // To add or remove projects, update this array and corresponding pipeline cards in index.html.
   ========================================= */

const caseProjects = [
  {
    number: "01",
    role: "STRATEGY & MARKET RESEARCH",
    title: "Market Entry & Regional Expansion Strategy",
    summary:
      "Formulated a rigorous strategic framework evaluating regional market entry, customer segmentation, competitor positioning, and sustainable unit economics for a high-growth retail enterprise.",
    situation:
      "An omnichannel consumer brand sought to expand into a high-density regional territory with limited visibility into local pricing sensitivity, fragmented supply channels, and competitive defensive tactics.",
    approach:
      "Executed structured PESTEL and Porter's Five Forces analyses, conducted quantitative survey sampling of 650+ prospective consumers, benchmarked top 4 incumbents, and modeled multi-tier unit economics across retail and direct-to-consumer channels.",
    outcome:
      "Delivered an executive 3-phase go-to-market roadmap, modeled a projected 22% reduction in initial customer acquisition costs, and established a dynamic financial decision scorecard approved by leadership.",
    theme: "strategy",
    visualLabel: "MARKET STRUCTURE / STRATEGIC MAPPING",
    kpis: [
      ["04", "Research Pillars"],
      ["03", "Strategic Inputs"],
      ["01", "GTM Roadmap"]
    ],
    tags: [
      "Market Research",
      "SWOT Analysis",
      "Competitor Benchmarking",
      "Unit Economics"
    ],
    // Replace with your presentation deck link (e.g. PDF, Pitch, or Google Slides URL)
    deckLink: "https://example.com/cases/market-entry-strategy.pdf",
    // Replace with your full case writeup, article, or GitHub repository URL
    referenceLink: "https://example.com/cases/market-entry-framework"
  },
  {
    number: "02",
    role: "BUSINESS ANALYTICS & DECISION-MAKING",
    title: "Business Analytics & Performance Dashboard",
    summary:
      "Designed an interactive executive dashboard architecture converting siloed operational and commercial data into real-time KPI visibility and actionable strategic insights.",
    situation:
      "Disparate divisional reporting systems across four regional operating units caused a 3-week information lag, hindering timely margin monitoring, inventory reallocations, and promotional agility.",
    approach:
      "Engineered relational data schemas using SQL, identified primary business variance drivers, harmonized cross-regional KPIs, and built dynamic Power BI dashboards tracking margin health, churn indicators, and revenue trajectories.",
    outcome:
      "Transformed delayed reporting cycles into automated real-time visibility, pinpointed $1.2M in annual operational cost leakage drivers, and streamlined bi-weekly executive stakeholder briefings.",
    theme: "analytics",
    visualLabel: "DATA ARCHITECTURE / PERFORMANCE INSIGHTS",
    kpis: [
      ["03", "Data Pipelines"],
      ["04", "Dashboard Views"],
      ["01", "Unified System"]
    ],
    tags: [
      "Power BI",
      "SQL",
      "Data Modeling",
      "Variance Analysis"
    ],
    // Replace with your dashboard demo or deck link
    deckLink: "https://example.com/cases/executive-dashboard-demo.pdf",
    // Replace with your full case reference link
    referenceLink: "https://example.com/cases/commercial-analytics-architecture"
  },
  {
    number: "03",
    role: "PRODUCT THINKING & CUSTOMER EXPERIENCE",
    title: "Digital Product Strategy & User Onboarding",
    summary:
      "Conceptualized an end-to-end customer journey redesign to eliminate onboarding friction, accelerate digital product adoption, and maximize user retention.",
    situation:
      "A B2B SaaS analytics portal experienced a 38% user drop-off during its multi-step onboarding flow, diminishing user activation and constraining long-term customer lifetime value (LTV).",
    approach:
      "Mapped full customer lifecycle touchpoints, conducted qualitative interviews with 24 corporate users, audited UX friction heuristics, and restructured the onboarding sequence into a progressive disclosure architecture.",
    outcome:
      "Delivered a clickable prototype and technical specification projected to reduce time-to-first-value by 45%, decrease step drop-off, and establish standardized quarterly customer satisfaction benchmarks.",
    theme: "product",
    visualLabel: "USER EXPERIENCE / PRODUCT SYSTEM",
    kpis: [
      ["03", "User Personas"],
      ["04", "Streamlined Steps"],
      ["01", "UX Blueprint"]
    ],
    tags: [
      "Product Strategy",
      "User Journey Mapping",
      "Customer Research",
      "UX Heuristics"
    ],
    // Replace with your prototype or presentation deck link
    deckLink: "https://example.com/cases/product-onboarding-deck.pdf",
    // Replace with your full case reference link
    referenceLink: "https://example.com/cases/onboarding-ux-heuristics"
  },
  {
    number: "04",
    role: "ENTREPRENEURSHIP & GROWTH STRATEGY",
    title: "Sustainable Business Model & Growth Strategy",
    summary:
      "Evaluated scalable business model feasibility, customer acquisition unit economics, operating cost structures, and multi-tier subscription revenue strategies.",
    situation:
      "An early-stage climate-tech venture required rigorous commercial validation of its recurring SaaS revenue model, manufacturing scale economics, and financing roadmap prior to institutional capital allocation.",
    approach:
      "Formulated a comprehensive bottom-up 5-year financial model using the Business Model Canvas, benchmarked SaaS pricing elasticity, and executed multi-variable sensitivity analyses across CAC, churn, and gross margins.",
    outcome:
      "Defined an attractive unit economics model projecting path to positive EBITDA within 18 months, quantified working capital requirements, and synthesized findings into an investor-ready executive deck.",
    theme: "entrepreneurship",
    visualLabel: "BUSINESS MODEL / VALUE CREATION",
    kpis: [
      ["04", "Revenue Streams"],
      ["03", "Pricing Tiers"],
      ["01", "Viable Model"]
    ],
    tags: [
      "Business Model Canvas",
      "Unit Economics",
      "Financial Modeling",
      "Pricing Strategy"
    ],
    // Replace with your business case deck link
    deckLink: "https://example.com/cases/growth-business-model.pdf",
    // Replace with your full case reference link
    referenceLink: "https://example.com/cases/unit-economics-model"
  }
];

/* =========================================
   PROJECT CASE STUDY INTERACTIVITY & TRANSITION
   ========================================= */

let currentProjectIndex = 0;
let changeAnimationTimeout = null;

const caseStudyFeature = document.querySelector("#caseStudyFeature");
const caseVisual = document.querySelector("#caseVisual");

const caseVisualLabel = document.querySelector("#caseVisualLabel");
const visualNumber = document.querySelector("#visualNumber");
const visualCategory = document.querySelector("#visualCategory");

const caseRole = document.querySelector("#caseRole");
const caseTitle = document.querySelector("#caseTitle");
const caseSummary = document.querySelector("#caseSummary");

const kpiOne = document.querySelector("#kpiOne");
const kpiTwo = document.querySelector("#kpiTwo");
const kpiThree = document.querySelector("#kpiThree");

const kpiOneLabel = document.querySelector("#kpiOneLabel");
const kpiTwoLabel = document.querySelector("#kpiTwoLabel");
const kpiThreeLabel = document.querySelector("#kpiThreeLabel");

const caseTags = document.querySelector("#caseTags");
const caseStudyLink = document.querySelector("#caseStudyLink");
const caseLiveLink = document.querySelector("#caseLiveLink");

const pipelineCards = document.querySelectorAll(".pipeline-card");

function animateKpi(element, targetValue) {
  if (!element) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const target = Number.parseInt(targetValue, 10);

  if (Number.isNaN(target) || reducedMotion) {
    element.textContent = targetValue;
    return;
  }

  const duration = 650;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * easedProgress);

    element.textContent = String(currentValue).padStart(2, "0");

    if (progress < 1) {
      window.requestAnimationFrame(updateNumber);
    } else {
      element.textContent = targetValue;
    }
  }

  window.requestAnimationFrame(updateNumber);
}

function renderProjectTags(tags) {
  if (!caseTags) return;

  caseTags.replaceChildren();

  tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    caseTags.appendChild(tagElement);
  });
}

function updateCaseStudy(index) {
  const project = caseProjects[index];
  if (!project) return;

  currentProjectIndex = index;

  if (caseStudyFeature) {
    if (changeAnimationTimeout) {
      clearTimeout(changeAnimationTimeout);
    }

    const progressBar = document.querySelector("#caseProgressBar");
    if (progressBar) {
      const pct = ((index + 1) / caseProjects.length) * 100;
      progressBar.style.width = `${pct}%`;
    }

    caseStudyFeature.classList.remove("is-changing");

    // Force reflow to retrigger CSS animation smoothly
    void caseStudyFeature.offsetWidth;

    caseStudyFeature.classList.add("is-changing");
    caseStudyFeature.dataset.theme = project.theme;

    // Remove is-changing once animation cycle finishes for clean subsequent runs
    changeAnimationTimeout = setTimeout(() => {
      caseStudyFeature.classList.remove("is-changing");
    }, 950);
  }

  if (caseVisual) {
    caseVisual.dataset.theme = project.theme;
  }

  if (caseVisualLabel) {
    caseVisualLabel.textContent = `${project.number} / FEATURED CASE`;
  }

  if (visualNumber) {
    visualNumber.textContent = project.number;
  }

  if (visualCategory) {
    visualCategory.textContent = project.visualLabel;
  }

  const caseFigCaption = document.querySelector("#caseFigCaption");
  if (caseFigCaption) {
    const figTitles = [
      "FIG. 1 — MARKET ENTRY FRAMEWORK",
      "FIG. 2 — PERFORMANCE DASHBOARD",
      "FIG. 3 — DIGITAL PRODUCT SYSTEM",
      "FIG. 4 — SUSTAINABLE BUSINESS MODEL"
    ];
    caseFigCaption.textContent = figTitles[index] || `FIG. ${index + 1} — CASE STUDY VISUAL`;
  }

  if (caseRole) {
    caseRole.textContent = project.role;
  }

  if (caseTitle) {
    caseTitle.textContent = project.title;
  }

  if (caseSummary) {
    caseSummary.textContent = project.summary;
  }

  if (project.kpis && project.kpis.length >= 3) {
    animateKpi(kpiOne, project.kpis[0][0]);
    animateKpi(kpiTwo, project.kpis[1][0]);
    animateKpi(kpiThree, project.kpis[2][0]);

    if (kpiOneLabel) kpiOneLabel.textContent = project.kpis[0][1];
    if (kpiTwoLabel) kpiTwoLabel.textContent = project.kpis[1][1];
    if (kpiThreeLabel) kpiThreeLabel.textContent = project.kpis[2][1];
  }

  renderProjectTags(project.tags);

  if (caseLiveLink) {
    caseLiveLink.href = project.deckLink || "#";
    if (!project.deckLink || project.deckLink === "#") {
      caseLiveLink.setAttribute("aria-label", "Sample presentation deck placeholder");
    } else {
      caseLiveLink.removeAttribute("aria-label");
    }
  }

  pipelineCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === index;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
    card.setAttribute("aria-selected", String(isActive));
  });
}

/* Project pipeline click & keyboard navigation */

pipelineCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const projectIndex = Number(card.dataset.project);
    updateCaseStudy(Number.isInteger(projectIndex) ? projectIndex : index);
  });

  card.addEventListener("keydown", (event) => {
    let nextIndex = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % pipelineCards.length;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + pipelineCards.length) % pipelineCards.length;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      pipelineCards[nextIndex].focus();
      updateCaseStudy(nextIndex);
    }
  });
});

/* Mouse-follow spotlight effect */

if (caseStudyFeature) {
  caseStudyFeature.addEventListener("pointermove", (event) => {
    const bounds = caseStudyFeature.getBoundingClientRect();
    const mouseX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const mouseY = ((event.clientY - bounds.top) / bounds.height) * 100;

    caseStudyFeature.style.setProperty("--mouse-x", `${mouseX}%`);
    caseStudyFeature.style.setProperty("--mouse-y", `${mouseY}%`);
  });
}

/* =========================================
   CASE STUDY MODAL (ACCESSIBLE & DYNAMIC)
   ========================================= */

const modal = document.querySelector("#projectCaseStudy");
const modalCategory = document.querySelector("#modalProjectCategory");
const modalTitle = document.querySelector("#modalProjectTitle");
const modalSummary = document.querySelector("#modalProjectSummary");
const modalSituation =
  document.querySelector("#modalProjectSituation") ||
  document.querySelector("#modalProjectChallenge");
const modalApproach = document.querySelector("#modalProjectApproach");
const modalOutcome = document.querySelector("#modalProjectOutcome");
const modalTags = document.querySelector("#modalProjectTags");
const modalLink = document.querySelector("#modalProjectLink");

let lastFocusedElement = null;

function openCaseStudyModal(index) {
  const project = caseProjects[index] || caseProjects[currentProjectIndex];
  if (!project || !modal) return;

  lastFocusedElement = document.activeElement;

  if (modalCategory) modalCategory.textContent = project.role;
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalSummary) modalSummary.textContent = project.summary;
  if (modalSituation) modalSituation.textContent = project.situation;
  if (modalApproach) modalApproach.textContent = project.approach;
  if (modalOutcome) modalOutcome.textContent = project.outcome;

  if (modalTags) {
    modalTags.replaceChildren();
    project.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.textContent = tag;
      modalTags.appendChild(tagSpan);
    });
  }

  if (modalLink) {
    const refUrl = project.referenceLink;
    if (refUrl && refUrl !== "#") {
      modalLink.href = refUrl;
      modalLink.removeAttribute("aria-disabled");
    } else {
      modalLink.href = "#";
      modalLink.setAttribute("aria-disabled", "true");
    }
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // Manage initial focus
  const closeBtn = modal.querySelector(".project-modal-close");
  if (closeBtn) {
    closeBtn.focus();
  }
}

function closeCaseStudyModal() {
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

// Close buttons and backdrop triggers
const modalCloseTriggers = document.querySelectorAll("[data-close-modal]");
modalCloseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    closeCaseStudyModal();
  });
});

// Close modal on Escape key & trap Tab focus inside dialog
document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("is-open")) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeCaseStudyModal();
    return;
  }

  if (e.key === "Tab") {
    const focusables = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }
});

// Prevent # link jump to top in modal link
if (modalLink) {
  modalLink.addEventListener("click", (e) => {
    if (modalLink.getAttribute("href") === "#") {
      e.preventDefault();
    }
  });
}

/* Project Showcase Modal Triggers */
const projectTriggers = document.querySelectorAll(".project-trigger");
projectTriggers.forEach((trigger) => {
  const projectIndexStr = trigger.dataset.projectTrigger;
  const projectIndex = Number.parseInt(projectIndexStr, 10);
  if (Number.isNaN(projectIndex)) return;

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openCaseStudyModal(projectIndex);
  });

  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openCaseStudyModal(projectIndex);
    }
  });
});

/* =========================================
   INITIALIZATION
   ========================================= */

if (caseProjects.length > 0 && typeof updateCaseStudy === "function") {
  updateCaseStudy(0);
}