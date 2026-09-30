// Mobile navigation is handled only by js/standard-pages.js to avoid duplicate click handlers.

// Active navigation indicator
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => navObserver.observe(section));
}

// Work slider controls
const track = document.getElementById("workTrack");
const nextBtn = document.getElementById("nextWork");
const prevBtn = document.getElementById("prevWork");

if (track && nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: track.clientWidth * 0.78, behavior: "smooth" });
  });
  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -track.clientWidth * 0.78, behavior: "smooth" });
  });
}

// Showreel modal
const modal = document.getElementById("videoModal");
const showreelBtn = document.getElementById("showreelBtn");
const closeModal = document.getElementById("closeModal");

if (modal && showreelBtn && closeModal) {
  showreelBtn.addEventListener("click", () => modal.classList.add("open"));
  closeModal.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("open");
  });
}

// ESC Key listener for Accessibility & Overlay closing
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (modal && modal.classList.contains("open")) {
      modal.classList.remove("open");
    }
  }
});

// Cursor glow on desktop (fine pointer devices only)
const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

/* =========================================================
   SECTION-SPECIFIC MOTION ARCHITECTURE
   ========================================================= */
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("motion-ready");

  // 1. UNIFIED SECTION & REVEAL OBSERVER
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible", "motion-visible", "in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

  document.querySelectorAll(".reveal, .section, footer").forEach(el => revealObserver.observe(el));

  // 4. EXPERIENCE SECTION — DUAL MODE (LIST ACCORDION & DRAGGABLE TIMELINE)
  const expSection = document.getElementById("experience");
  const expModeListBtn = document.getElementById("expModeList");
  const expModeTimelineBtn = document.getElementById("expModeTimeline");
  const expViewList = document.getElementById("expViewList");
  const expViewTimeline = document.getElementById("expViewTimeline");

  if (expSection && expModeListBtn && expModeTimelineBtn && expViewList && expViewTimeline) {
    const experienceData = [
      {
        id: "exp-1",
        year: "2026 — NOW",
        timelineYear: "2026",
        role: "Creative Professional",
        company: "Independent / Freelance",
        location: "Global / Remote",
        category: "Branding · Digital · Content",
        shortDesc: "Leading end-to-end creative direction, brand visual identity, digital experience design, and multi-channel content strategies.",
        details: [
          "Directed visual brand identity and digital UI systems for global creative clients.",
          "Designed responsive web interfaces with interactive kinetic visual elements.",
          "Crafted editorial storytelling narratives and social content campaigns."
        ],
        skills: ["Brand Strategy", "UI/UX Design", "Web Architecture", "Content Direction"]
      },
      {
        id: "exp-2",
        year: "2025 — 2026",
        timelineYear: "2025",
        role: "Creative & Digital Lead",
        company: "Selected Client Work",
        location: "Hybrid",
        category: "Design · Web · Visual Storytelling",
        shortDesc: "Delivered custom web architectures, interactive editorial designs, identity systems, and visual stories.",
        details: [
          "Built custom design systems and component libraries for interactive web apps.",
          "Collaborated directly with client teams on strategic branding campaigns.",
          "Optimized digital experience workflows resulting in enhanced audience engagement."
        ],
        skills: ["Design Systems", "Interactive Web", "Art Direction", "Prototyping"]
      },
      {
        id: "exp-3",
        year: "2024 — 2025",
        timelineYear: "2024",
        role: "Design & Development Specialist",
        company: "Project Based Work",
        location: "Contract",
        category: "Digital Experiences · Content",
        shortDesc: "Collaborated with cross-functional teams to design responsive interfaces, prototype interactive components, and craft compelling visual assets.",
        details: [
          "Developed high-fidelity visual mockups, micro-interactions, and component kits.",
          "Managed asset production and visual storytelling guidelines across digital channels.",
          "Executed front-end interface builds using modern web standards."
        ],
        skills: ["Visual Design", "Front-end Architecture", "Micro-animations", "User Research"]
      },
      {
        id: "exp-4",
        year: "2022 — 2024",
        timelineYear: "2022",
        role: "Junior Visual Designer",
        company: "Creative Studio Agency",
        location: "On-site",
        category: "UI/UX · Motion · Brand Strategy",
        shortDesc: "Assisted in brand system rollouts, digital asset creation, layout design, and interactive UI component development.",
        details: [
          "Supported senior art directors in creating brand guideline documentation and marketing collateral.",
          "Designed vector graphics, icons, and kinetic motion assets for web campaigns.",
          "Participated in client presentation decks and design critique sprints."
        ],
        skills: ["Graphic Design", "Iconography", "Motion Graphics", "Layout Systems"]
      }
    ];

    // ---- A. VIEW MODE TOGGLING ----
    function switchExpMode(mode) {
      if (mode === "list") {
        expModeListBtn.classList.add("active");
        expModeListBtn.setAttribute("aria-selected", "true");
        expModeTimelineBtn.classList.remove("active");
        expModeTimelineBtn.setAttribute("aria-selected", "false");

        expViewTimeline.classList.remove("active");
        setTimeout(() => {
          expViewList.classList.add("active");
        }, 150);
      } else {
        expModeTimelineBtn.classList.add("active");
        expModeTimelineBtn.setAttribute("aria-selected", "true");
        expModeListBtn.classList.remove("active");
        expModeListBtn.setAttribute("aria-selected", "false");

        expViewList.classList.remove("active");
        setTimeout(() => {
          expViewTimeline.classList.add("active");
          updateTimelineBounds();
        }, 150);
      }
    }

    expModeListBtn.addEventListener("click", () => switchExpMode("list"));
    expModeTimelineBtn.addEventListener("click", () => switchExpMode("timeline"));

    // ---- B. LIST ACCORDION INTERACTION ----
    const listItems = expViewList.querySelectorAll(".exp-list-item");

    function setAccordionState(item, isOpen) {
      const body = item.querySelector(".exp-accordion-body");
      const summaryBtn = item.querySelector(".exp-summary-row");
      if (!body || !summaryBtn) return;

      if (isOpen) {
        item.classList.add("open");
        summaryBtn.setAttribute("aria-expanded", "true");
        body.style.maxHeight = body.scrollHeight + "px";
        setTimeout(() => {
          if (item.classList.contains("open")) {
            body.style.maxHeight = "none";
          }
        }, 320);
      } else {
        if (body.style.maxHeight === "none") {
          body.style.maxHeight = body.scrollHeight + "px";
          void body.offsetHeight; // force reflow
        }
        item.classList.remove("open");
        summaryBtn.setAttribute("aria-expanded", "false");
        body.style.maxHeight = "0px";
      }
    }

    // Initialize open item height & window resize recalculations
    listItems.forEach(item => {
      const isOpen = item.classList.contains("open");
      setAccordionState(item, isOpen);

      const summaryBtn = item.querySelector(".exp-summary-row");
      summaryBtn.addEventListener("click", () => {
        const currentlyOpen = item.classList.contains("open");
        // Close other items
        listItems.forEach(other => {
          if (other !== item) setAccordionState(other, false);
        });
        // Toggle target item
        setAccordionState(item, !currentlyOpen);
      });
    });

    window.addEventListener("resize", () => {
      listItems.forEach(item => {
        if (item.classList.contains("open")) {
          const body = item.querySelector(".exp-accordion-body");
          if (body) body.style.maxHeight = "none";
        }
      });
    }, { passive: true });

    // ---- C. DRAGGABLE TIMELINE CANVAS ----
    const viewport = document.getElementById("expTimelineViewport");
    const track = document.getElementById("expTimelineTrack");
    const tooltip = document.getElementById("expTooltip");
    const tooltipCat = document.getElementById("tooltipCat");
    const tooltipCompany = document.getElementById("tooltipCompany");
    const tooltipRoleYear = document.getElementById("tooltipRoleYear");
    const tooltipDesc = document.getElementById("tooltipDesc");
    const nodes = track ? track.querySelectorAll(".exp-node") : [];

    let currentX = 0;
    let startX = 0;
    let isDragging = false;
    let minX = 0;
    let maxX = 0;

    function updateTimelineBounds() {
      if (!viewport || !track) return;
      const vpWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;
      minX = Math.min(0, vpWidth - trackWidth);
      maxX = 0;
      clampPosition();
    }

    function clampPosition() {
      currentX = Math.max(minX, Math.min(maxX, currentX));
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    window.addEventListener("resize", updateTimelineBounds);

    if (viewport && track) {
      viewport.addEventListener("pointerdown", (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        viewport.classList.add("dragging");
        viewport.setPointerCapture(e.pointerId);
      });

      viewport.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        clampPosition();
      });

      function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        viewport.classList.remove("dragging");
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }

      viewport.addEventListener("pointerup", endDrag);
      viewport.addEventListener("pointercancel", endDrag);

      // Horizontal Wheel Scroll over Timeline
      viewport.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          currentX -= e.deltaY * 0.8;
          clampPosition();
        }
      }, { passive: false });
    }

    // ---- D. TIMELINE HOVER TOOLTIP ----
    function showTooltip(index, targetNode) {
      const data = experienceData[index];
      if (!data || !tooltip) return;

      tooltipCat.textContent = data.category.toUpperCase();
      tooltipCompany.textContent = data.company;
      tooltipRoleYear.textContent = `${data.role} · ${data.year}`;
      tooltipDesc.textContent = data.shortDesc;

      tooltip.classList.add("visible");
      tooltip.setAttribute("aria-hidden", "false");
      positionTooltip(targetNode);
    }

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.classList.remove("visible");
      tooltip.setAttribute("aria-hidden", "true");
    }

    function positionTooltip(node) {
      if (!node || !tooltip) return;
      const rect = node.getBoundingClientRect();
      const ttRect = tooltip.getBoundingClientRect();

      let left = rect.left + rect.width / 2 - ttRect.width / 2;
      let top = rect.top - ttRect.height - 14;

      if (top < 20) {
        top = rect.bottom + 14;
      }

      left = Math.max(16, Math.min(window.innerWidth - ttRect.width - 16, left));

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    nodes.forEach(node => {
      const idx = parseInt(node.getAttribute("data-index"), 10);

      node.addEventListener("mouseenter", () => {
        nodes.forEach(n => n.classList.remove("active"));
        node.classList.add("active");
        showTooltip(idx, node);
      });

      node.addEventListener("mouseleave", hideTooltip);

      node.addEventListener("focus", () => {
        nodes.forEach(n => n.classList.remove("active"));
        node.classList.add("active");
        showTooltip(idx, node);
      });

      node.addEventListener("blur", hideTooltip);
    });
  }

  // 5. CONTINUOUS WORK TRACK (DESKTOP)
  const workSection = document.getElementById("work");
  if (track && window.matchMedia("(min-width: 801px)").matches && !prefersReduced) {
    let originalCount = track.children.length;
    if (!track.querySelector("[aria-hidden='true']")) {
      const originalCards = Array.from(track.children);
      originalCount = originalCards.length;
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }

    track.classList.add("continuous-work-track");

    let offset = 0;
    let lastTime = performance.now();
    let paused = false;
    let isWorkInView = true;

    if (workSection) {
      const workObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => isWorkInView = e.isIntersecting);
      }, { threshold: 0.05 });
      workObserver.observe(workSection);
    }

    track.addEventListener("mouseenter", () => paused = true);
    track.addEventListener("mouseleave", () => paused = false);

    function animateWork(now) {
      const delta = now - lastTime;
      lastTime = now;

      if (!paused && isWorkInView && track.classList.contains("continuous-work-track")) {
        offset += delta * 0.022;
        const firstCard = track.children[0];

        if (firstCard) {
          const cardWidth = firstCard.getBoundingClientRect().width;
          const style = getComputedStyle(track);
          const gap = parseFloat(style.gap) || parseFloat(style.columnGap) || 32;
          const loopWidth = originalCount * (cardWidth + gap);

          if (offset >= loopWidth) {
            offset -= loopWidth;
          }

          track.style.transform = `translate3d(${-offset}px,0,0)`;
        }
      }

      requestAnimationFrame(animateWork);
    }

    requestAnimationFrame(animateWork);
  }

  // 6. HERO ABSTRACT MOUSE PARALLAX (DESKTOP)
  const heroContainer = document.querySelector(".hero");
  const heroAbstract = document.querySelector(".hero-abstract-container");
  if (heroContainer && heroAbstract && window.matchMedia("(pointer:fine)").matches && !prefersReduced) {
    let ticking = false;

    heroContainer.addEventListener("pointermove", (event) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroContainer.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          heroAbstract.style.setProperty("--mx", `${x * 14}px`);
          heroAbstract.style.setProperty("--my", `${y * 14}px`);
          ticking = false;
        });
      }
    });

    heroContainer.addEventListener("pointerleave", () => {
      heroAbstract.style.setProperty("--mx", "0px");
      heroAbstract.style.setProperty("--my", "0px");
    });
  }

  // 7. INTERACTIVE JOURNAL SHOWCASE
  const journalShowcase = document.getElementById("journalShowcase");
  const journalThumbnails = document.getElementById("journalThumbnails");

  if (journalShowcase && journalThumbnails) {
    const journalData = [
      {
        category: "CASE STUDIES",
        tag: "DESIGN · 05 MIN READ",
        title: "Designing with purpose",
        description: "An exploration of how intentional visual frameworks, human-centered research, and structural clarity drive long-term project impact.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=85",
        alt: "Designing with purpose"
      },
      {
        category: "INSIGHTS & ARTICLES",
        tag: "DIGITAL · 04 MIN READ",
        title: "Building better digital experiences",
        description: "Reflections on modern web architecture, performance optimization, and creating fluid interfaces that feel natural to use.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
        alt: "Building better digital experiences"
      },
      {
        category: "CREATIVE EXPERIMENTS",
        tag: "CREATIVE · 03 MIN READ",
        title: "From idea to impact",
        description: "Deconstructing the creative process from initial spark to execution, rapid prototyping, and final narrative refinement.",
        image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1000&q=85",
        alt: "From idea to impact"
      },
      {
        category: "CONCEPT WORK",
        tag: "CONCEPT · 06 MIN READ",
        title: "Visual storytelling in modern branding",
        description: "How narrative-driven identity systems build deeper emotional connections between brands and their audience.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85",
        alt: "Visual storytelling in modern branding"
      }
    ];

    const contentSide = document.getElementById("journalContentSide");
    const categoryEl = document.getElementById("journalCategory");
    const tagEl = document.getElementById("journalTag");
    const titleEl = document.getElementById("journalTitle");
    const descEl = document.getElementById("journalDesc");
    const featuredImgEl = document.getElementById("journalFeaturedImg");
    const thumbCards = journalThumbnails.querySelectorAll(".journal-thumb-card");

    let currentIndex = 0;
    let autoTimer = null;
    let isTransitioning = false;

    function selectJournalItem(index, isUserInteraction = true) {
      if (index === currentIndex && !isTransitioning) return;
      if (isTransitioning) return;

      isTransitioning = true;
      currentIndex = index;

      // Update Active Thumbnail State
      thumbCards.forEach((card, idx) => {
        const isActive = idx === currentIndex;
        card.classList.toggle("active", isActive);
        card.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      const item = journalData[currentIndex];
      if (!item) return;

      // Scroll thumbnail into view if needed
      const activeThumb = thumbCards[currentIndex];
      if (activeThumb && isUserInteraction) {
        activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }

      // Smooth 2-Phase Animation
      if (!prefersReduced) {
        contentSide.classList.add("switching");
        featuredImgEl.classList.add("changing");

        setTimeout(() => {
          categoryEl.textContent = item.category;
          tagEl.textContent = item.tag;
          titleEl.textContent = item.title;
          descEl.textContent = item.description;
          featuredImgEl.src = item.image;
          featuredImgEl.alt = item.alt;

          contentSide.classList.remove("switching");
          featuredImgEl.classList.remove("changing");

          setTimeout(() => {
            isTransitioning = false;
          }, 350);
        }, 220);
      } else {
        categoryEl.textContent = item.category;
        tagEl.textContent = item.tag;
        titleEl.textContent = item.title;
        descEl.textContent = item.description;
        featuredImgEl.src = item.image;
        featuredImgEl.alt = item.alt;
        isTransitioning = false;
      }
    }

    // Attach click listeners to thumbnails
    thumbCards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        selectJournalItem(idx, true);
        stopAutoRotation();
      });
    });

    // Auto Rotation setup
    function startAutoRotation() {
      if (prefersReduced) return;
      stopAutoRotation();
      autoTimer = setInterval(() => {
        const nextIdx = (currentIndex + 1) % journalData.length;
        selectJournalItem(nextIdx, false);
      }, 7000);
    }

    function stopAutoRotation() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    journalShowcase.addEventListener("mouseenter", stopAutoRotation);
    journalShowcase.addEventListener("mouseleave", startAutoRotation);
    journalShowcase.addEventListener("focusin", stopAutoRotation);

    startAutoRotation();
  }

  /* =========================================================
     6. SERVICES SECTION — EDITORIAL SHOWCASE & MOTION PREVIEW
     ========================================================= */
  const servicesSection = document.getElementById("services");
  const serviceRows = document.querySelectorAll(".service-row");
  const previewPanel = document.getElementById("servicePreviewPanel");
  const previewImg = document.getElementById("servicePreviewImg");
  const previewTag = document.getElementById("servicePreviewTag");
  const previewDesc = document.getElementById("servicePreviewDesc");
  const previewMediaWrap = previewPanel ? previewPanel.querySelector(".preview-panel-media") : null;

  if (servicesSection && serviceRows.length) {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024;
    let activeRowIndex = -1;

    // Lerp state for desktop hover preview panel
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let animFrameId = null;
    let isMouseOverSection = false;

    // Reveal stagger animation when services section enters viewport
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          servicesSection.querySelectorAll(".reveal").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.add("visible");
            }, idx * 90);
          });
        }
      });
    }, { threshold: 0.15 });

    servicesObserver.observe(servicesSection);

    // Update Floating Preview Content
    function updatePreviewContent(row) {
      if (!row || !previewImg || !previewTag || !previewDesc) return;
      const imgUrl = row.getAttribute("data-preview-img");
      const tagText = row.getAttribute("data-preview-tag");
      const descText = row.getAttribute("data-preview-desc");
      const maskUrl = row.getAttribute("data-mask-img");

      if (imgUrl && previewImg.src !== imgUrl) {
        // Trigger short 200ms glitch animation on image change
        if (previewMediaWrap && !prefersReduced) {
          previewMediaWrap.classList.remove("glitching");
          void previewMediaWrap.offsetWidth; // force reflow
          previewMediaWrap.classList.add("glitching");
          setTimeout(() => previewMediaWrap.classList.remove("glitching"), 250);
        }
        previewImg.src = imgUrl;
        previewImg.alt = tagText || "Service Preview";
      }

      if (tagText) previewTag.textContent = tagText;
      if (descText) previewDesc.textContent = descText;

      // Apply text-masked background variable to title if applicable
      const maskedTitle = row.querySelector(".service-title.text-masked");
      if (maskedTitle && maskUrl) {
        maskedTitle.style.setProperty("--mask-bg-img", `url("${maskUrl}")`);
      }
    }

    // Set Active Service Row State
    function setActiveRow(index, isKeyboard = false) {
      serviceRows.forEach((r, i) => {
        const isMatch = i === index;
        r.classList.toggle("active", isMatch);
        r.setAttribute("aria-expanded", isMatch ? "true" : "false");

        const inlinePrev = r.querySelector(".service-inline-preview");
        if (inlinePrev) {
          inlinePrev.setAttribute("aria-hidden", isMatch ? "false" : "true");
        }
      });

      activeRowIndex = index;

      if (index >= 0 && index < serviceRows.length) {
        updatePreviewContent(serviceRows[index]);
        if (isFinePointer && previewPanel) {
          previewPanel.classList.add("active");
        }
      } else {
        if (previewPanel) {
          previewPanel.classList.remove("active");
        }
      }
    }

    // Desktop Lerp Animation Loop for Preview Panel
    function animatePreviewLoop() {
      if (!isFinePointer || !previewPanel || prefersReduced) return;

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      currentRotX += (targetRotX - currentRotX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;

      // Clamp X and Y to remain inside viewport
      const panelWidth = 350;
      const panelHeight = 280;
      const padding = 20;

      const clampedX = Math.max(panelWidth / 2 + padding, Math.min(window.innerWidth - panelWidth / 2 - padding, currentX));
      const clampedY = Math.max(panelHeight / 2 + padding, Math.min(window.innerHeight - panelHeight / 2 - padding, currentY));

      previewPanel.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0px) translate(-50%, -50%) perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

      if (isMouseOverSection) {
        animFrameId = requestAnimationFrame(animatePreviewLoop);
      }
    }

    if (isFinePointer && previewPanel) {
      servicesSection.addEventListener("mouseenter", () => {
        isMouseOverSection = true;
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(animatePreviewLoop);
        }
      });

      servicesSection.addEventListener("mouseleave", () => {
        isMouseOverSection = false;
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
        setActiveRow(-1);
      });

      window.addEventListener("mousemove", (e) => {
        if (!isMouseOverSection) return;
        targetX = e.clientX;
        targetY = e.clientY + 20;

        // Subtle 3D tilt calculations (-1 to 2deg X, -2 to 3deg Y)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetRotY = ((e.clientX - centerX) / centerX) * 2.5;
        targetRotX = -((e.clientY - centerY) / centerY) * 1.8;
      }, { passive: true });
    }

    // Attach listeners to individual rows
    serviceRows.forEach((row, idx) => {
      // Hover handler for desktop
      row.addEventListener("mouseenter", () => {
        setActiveRow(idx);
      });

      // Keyboard & Tap / Click handler
      row.addEventListener("click", () => {
        if (activeRowIndex === idx && !isFinePointer) {
          // Toggle off if already active on mobile
          setActiveRow(-1);
        } else {
          setActiveRow(idx);
        }
      });

      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (activeRowIndex === idx) {
            setActiveRow(-1);
          } else {
            setActiveRow(idx, true);
          }
        }
      });
    });
  }

  /* =========================================================
     7. SECTION-TO-SECTION CINEMATIC MOTION OBSERVER
     ========================================================= */
  const motionSections = document.querySelectorAll("section[data-transition], main section[id]");

  if (motionSections.length) {
    const transitionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const type = entry.target.getAttribute("data-transition");
          if (!type || prefersReduced) return;

          const transitionClass = `transitioning-${type}`;
          entry.target.classList.add(transitionClass);

          setTimeout(() => {
            entry.target.classList.remove(transitionClass);
          }, 600);
        }
      });
    }, { threshold: 0.15 });

    motionSections.forEach(sec => transitionObserver.observe(sec));
  }

  /* =========================================================
     8. CONTACT SECTION — EMAIL COPY & FORM INQUIRY FLOW
     ========================================================= */
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const emailLink = document.querySelector(".email-link");
  const TARGET_EMAIL = emailLink ? emailLink.textContent.trim() : "hello@example.com";

  if (copyEmailBtn) {
    let copyTimeout = null;
    copyEmailBtn.addEventListener("click", () => {
      if (copyTimeout) clearTimeout(copyTimeout);

      function setCopiedState() {
        copyEmailBtn.classList.add("copied");
        const btnText = copyEmailBtn.querySelector(".btn-text");
        if (btnText) btnText.textContent = "COPIED ✓";
        copyTimeout = setTimeout(() => {
          copyEmailBtn.classList.remove("copied");
          if (btnText) btnText.textContent = "COPY";
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(TARGET_EMAIL)
          .then(setCopiedState)
          .catch(() => {
            window.location.href = `mailto:${TARGET_EMAIL}`;
          });
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = TARGET_EMAIL;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand("copy");
          setCopiedState();
        } catch (_) {
          window.location.href = `mailto:${TARGET_EMAIL}`;
        }
        document.body.removeChild(tempInput);
      }
    });
  }

  const contactForm = document.getElementById("contactForm");
  const contactName = document.getElementById("contactName");
  const contactEmail = document.getElementById("contactEmail");
  const contactProjectType = document.getElementById("contactProjectType");
  const contactScale = document.getElementById("contactScale");
  const contactMessage = document.getElementById("contactMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const projectTypeError = document.getElementById("projectTypeError");
  const messageError = document.getElementById("messageError");

  const groupName = document.getElementById("groupName");
  const groupEmail = document.getElementById("groupEmail");
  const groupProjectType = document.getElementById("groupProjectType");
  const groupMessage = document.getElementById("groupMessage");

  const contactSuccess = document.getElementById("contactSuccess");
  const contactError = document.getElementById("contactError");
  const directMailtoLink = document.getElementById("directMailtoLink");

  if (contactForm && contactName && contactEmail && contactProjectType && contactMessage) {
    function clearFieldError(groupEl, errorEl) {
      if (groupEl) groupEl.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }

    function showFieldError(groupEl, errorEl, msg) {
      if (groupEl) groupEl.classList.add("has-error");
      if (errorEl) errorEl.textContent = msg;
    }

    contactName.addEventListener("input", () => clearFieldError(groupName, nameError));
    contactEmail.addEventListener("input", () => clearFieldError(groupEmail, emailError));
    contactProjectType.addEventListener("change", () => clearFieldError(groupProjectType, projectTypeError));
    contactMessage.addEventListener("input", () => clearFieldError(groupMessage, messageError));

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      clearFieldError(groupName, nameError);
      clearFieldError(groupEmail, emailError);
      clearFieldError(groupProjectType, projectTypeError);
      clearFieldError(groupMessage, messageError);

      if (contactSuccess) contactSuccess.style.display = "none";
      if (contactError) contactError.style.display = "none";

      let isValid = true;
      let firstInvalidInput = null;

      const nameVal = contactName.value.trim();
      if (!nameVal) {
        showFieldError(groupName, nameError, "Please enter your name.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = contactName;
      }

      const emailVal = contactEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        showFieldError(groupEmail, emailError, "Please enter your email address.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = contactEmail;
      } else if (!emailRegex.test(emailVal)) {
        showFieldError(groupEmail, emailError, "Please enter a valid email address.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = contactEmail;
      }

      const projectTypeVal = contactProjectType.value;
      if (!projectTypeVal) {
        showFieldError(groupProjectType, projectTypeError, "Please select a project type.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = contactProjectType;
      }

      const messageVal = contactMessage.value.trim();
      if (!messageVal) {
        showFieldError(groupMessage, messageError, "Please tell me a little about your project.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = contactMessage;
      } else if (messageVal.length < 10) {
        showFieldError(groupMessage, messageError, "Please enter at least 10 characters.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = contactMessage;
      }

      if (!isValid) {
        if (firstInvalidInput) firstInvalidInput.focus();
        return;
      }

      const scaleVal = contactScale ? contactScale.value : "";
      const subject = `Portfolio Inquiry — ${projectTypeVal}`;
      const body = `Name: ${nameVal}\nEmail: ${emailVal}\nProject Type: ${projectTypeVal}\nProject Scale / Budget: ${scaleVal || "Not specified"}\n\nMessage:\n${messageVal}`;

      const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (directMailtoLink) {
        directMailtoLink.href = mailtoUrl;
      }

      if (contactSuccess) {
        contactSuccess.style.display = "flex";
      }

      try {
        window.location.href = mailtoUrl;
      } catch (_) {
        if (contactError) {
          contactError.style.display = "flex";
        }
      }
    });
  }

  document.querySelectorAll('a[href="#contact"]').forEach(anchor => {
    anchor.addEventListener("click", () => {
      setTimeout(() => {
        if (contactName && window.innerWidth >= 768) {
          contactName.focus({ preventScroll: true });
        }
      }, 600);
    });
  });
})();
