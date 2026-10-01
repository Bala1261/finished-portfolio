/**
 * BEXO Standard Renderer Integration
 * Handles:
 * - Dynamic data injection for Home, Portfolio, and Hire Me
 * - Strict conditional visibility (hides empty collections cleanly)
 * - Safe HTML escaping via escapeHtml()
 * - Preservation of user links, images, and PDFs
 * - Resume CTA strictly conditional on user.resumeUrl
 * - Open to Hire strictly conditional on user.openToHire === true
 */

import { getProfile, escapeHtml, resolveAsset, resolveRoute } from './profile-runtime.js';
import { openCaseStudyModal } from './media.js';

export function renderPage(pageType) {
  const profile = getProfile();

  switch (pageType) {
    case 'home':
      renderHome(profile);
      break;
    case 'portfolio':
      renderPortfolio(profile);
      break;
    case 'hire-me':
      renderHireMe(profile);
      break;
    default:
      console.warn('Unknown page type:', pageType);
  }
}

/**
 * =========================================================================
 * 1. HOME PAGE RENDERER
 * =========================================================================
 */
function renderHome(profile) {
  const { user, profile: meta, projectEntries } = profile;

  // Name & Headline
  const nameEls = document.querySelectorAll('[data-bind="user.name"]');
  nameEls.forEach(el => el.textContent = user.name || 'David Vance');

  const headlineEls = document.querySelectorAll('[data-bind="profile.headline"]');
  const designation = meta.headline || meta.bio || 'Business & Management Executive';
  headlineEls.forEach(el => el.textContent = designation);

  // Bio & Tagline
  const bioEls = document.querySelectorAll('[data-bind="profile.bio"]');
  bioEls.forEach(el => el.textContent = meta.bio || '');

  const taglineEls = document.querySelectorAll('[data-bind="profile.tagline"]');
  taglineEls.forEach(el => el.textContent = meta.tagline || designation);

  // Portrait Photo
  const portraitEl = document.getElementById('home-portrait');
  if (portraitEl) {
    if (user.photoUrl) {
      portraitEl.onerror = () => {
        if (!portraitEl.dataset.fallbackApplied) {
          portraitEl.dataset.fallbackApplied = 'true';
          const filename = user.photoUrl.split('/').pop() || 'executive_portrait.jpg';
          if (portraitEl.src.includes('/assets/')) {
            portraitEl.src = portraitEl.src.replace('/assets/', '/');
          } else {
            portraitEl.src = resolveAsset(`assets/${filename}`);
          }
        }
      };
      portraitEl.src = resolveAsset(user.photoUrl);
      portraitEl.alt = `${user.name} - Executive Portrait`;
    } else {
      portraitEl.parentElement?.classList.add('no-photo');
    }
  }

  // Open To Hire Badge (Truthful condition: user.openToHire === true)
  const hireBadgeEl = document.getElementById('home-hire-badge');
  if (hireBadgeEl) {
    if (user.openToHire === true) {
      hireBadgeEl.removeAttribute('hidden');
      hireBadgeEl.innerHTML = `
        <span class="status-pulse-dot"></span>
        <span class="status-badge-text">Available for Strategic Opportunities</span>
      `;
    } else {
      hireBadgeEl.setAttribute('hidden', '');
    }
  }

  // Primary Action: View Portfolio
  const viewPortfolioCta = document.getElementById('cta-view-portfolio');
  if (viewPortfolioCta) {
    viewPortfolioCta.href = resolveRoute('portfolio');
  }

  // Conditional Resume CTA (Truthful condition: user.resumeUrl)
  const resumeCtaContainer = document.getElementById('cta-resume-container');
  if (resumeCtaContainer) {
    if (user.resumeUrl) {
      resumeCtaContainer.removeAttribute('hidden');
      resumeCtaContainer.innerHTML = `
        <a href="${resolveAsset(user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" id="cta-resume-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Executive CV (PDF)
        </a>
      `;
    } else {
      resumeCtaContainer.setAttribute('hidden', '');
      resumeCtaContainer.innerHTML = '';
    }
  }

  // Hero Stats Counter
  const statsContainer = document.getElementById('home-hero-stats');
  if (statsContainer) {
    const stats = Array.isArray(meta.heroStats) && meta.heroStats.length > 0 
      ? meta.heroStats 
      : [
          { value: "05+", label: "Strategic Projects", desc: "Commercial & analytics deliverables" },
          { value: "03", label: "Corporate Roles", desc: "Consulting & Fortune 500 finance" },
          { value: "92%", label: "Project Success", desc: "Stakeholder buy-in & velocity" }
        ];

    statsContainer.innerHTML = stats.map(s => `
      <div class="stat-pill-card">
        <span class="stat-value">${escapeHtml(s.value)}</span>
        <div class="stat-label-wrap">
          <strong class="stat-label">${escapeHtml(s.label)}</strong>
          ${s.desc ? `<span class="stat-desc">${escapeHtml(s.desc)}</span>` : ''}
        </div>
      </div>
    `).join('');
  }

  // Featured Project Teaser
  const featuredTeaserSlot = document.getElementById('home-featured-project');
  if (featuredTeaserSlot) {
    if (projectEntries.length > 0) {
      const topProject = projectEntries[0];
      featuredTeaserSlot.removeAttribute('hidden');
      featuredTeaserSlot.innerHTML = `
        <div class="featured-card">
          <div class="featured-card-content">
            <div class="featured-eyebrow">
              <span class="badge badge-accent">Featured Commercial Case Study</span>
              <span class="featured-year">${escapeHtml(topProject.year || '2025')}</span>
            </div>
            <h3 class="featured-title">${escapeHtml(topProject.title)}</h3>
            <p class="featured-desc">${escapeHtml(topProject.tagline || topProject.description)}</p>
            <div class="featured-metrics-row">
              ${(topProject.metrics || []).slice(0, 3).map(m => `
                <div class="f-metric">
                  <span class="f-num">${escapeHtml(m.value)}</span>
                  <span class="f-lbl">${escapeHtml(m.label)}</span>
                </div>
              `).join('')}
            </div>
            <div class="featured-actions">
              <a href="${resolveRoute('portfolio')}" class="btn btn-primary btn-sm">
                Explore Full Case Study & Projects →
              </a>
            </div>
          </div>
          ${topProject.image ? `
            <div class="featured-card-visual">
              <img src="${resolveAsset(topProject.image)}" alt="${escapeHtml(topProject.title)} Visual" loading="lazy" onerror="if(!this.dataset.retried){this.dataset.retried='1';this.src=this.src.includes('/assets/')?this.src.replace('/assets/','/'):this.src;}" />
            </div>
          ` : ''}
        </div>
      `;
    } else {
      featuredTeaserSlot.setAttribute('hidden', '');
    }
  }
}

/**
 * =========================================================================
 * 2. PORTFOLIO PAGE RENDERER
 * Recommended Order:
 * Identity/About -> Skills -> Experience -> Education -> Selected Work -> Certificates -> Achievements -> Research
 * Empty collections are automatically hidden without leftover headings or gaps.
 * =========================================================================
 */
function renderPortfolio(profile) {
  const { 
    user, 
    profile: meta, 
    projectEntries, 
    experienceEntries, 
    educationEntries, 
    certificateEntries, 
    achievementEntries, 
    researchEntries, 
    skillEntries 
  } = profile;

  // 1. Identity & About Block
  renderPortfolioIdentity(user, meta);

  // 2. Skills Collection
  renderSkillsCollection(skillEntries);

  // 3. Experience Collection
  renderExperienceCollection(experienceEntries);

  // 4. Education Collection
  renderEducationCollection(educationEntries);

  // 5. Selected Work (Projects) Collection
  renderProjectsCollection(projectEntries);

  // 6. Certificates Collection
  renderCertificatesCollection(certificateEntries);

  // 7. Achievements Collection
  renderAchievementsCollection(achievementEntries);

  // 8. Research Collection
  renderResearchCollection(researchEntries);
}

function renderPortfolioIdentity(user, meta) {
  const section = document.getElementById('portfolio-identity-section');
  if (!section) return;

  const photoUrl = user.photoUrl ? resolveAsset(user.photoUrl) : '';
  const infoBlocks = Array.isArray(meta.infoBlocks) ? meta.infoBlocks : [];

  section.innerHTML = `
    <div class="identity-header-grid">
      <div class="identity-portrait-col">
        ${photoUrl ? `
          <div class="identity-portrait-wrapper">
            <img src="${photoUrl}" alt="${escapeHtml(user.name)}" class="identity-portrait-img" onerror="if(!this.dataset.retried){this.dataset.retried='1';this.src=this.src.includes('/assets/')?this.src.replace('/assets/','/'):this.src;}" />
            ${user.openToHire ? `
              <div class="identity-badge-float">
                <span class="status-pulse-dot"></span>
                <span>Open for Opportunities</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>

      <div class="identity-info-col">
        <div class="identity-eyebrow">
          <span class="badge badge-accent">Executive Profile</span>
          ${user.location ? `<span class="identity-location">📍 ${escapeHtml(user.location)}</span>` : ''}
        </div>
        <h1 class="identity-name">${escapeHtml(user.name)}</h1>
        <p class="identity-headline">${escapeHtml(meta.headline)}</p>
        
        ${meta.bio ? `<div class="identity-bio"><p>${escapeHtml(meta.bio)}</p></div>` : ''}

        ${meta.careerGoal ? `
          <div class="identity-goal-box">
            <span class="goal-label">Core Strategic Mission</span>
            <p class="goal-text">"${escapeHtml(meta.careerGoal)}"</p>
          </div>
        ` : ''}

        <div class="identity-actions">
          <a href="${resolveRoute('contact')}" class="btn btn-primary">
            Contact Consultant
          </a>
          ${user.resumeUrl ? `
            <a href="${resolveAsset(user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Executive Resume (PDF)
            </a>
          ` : ''}
        </div>
      </div>
    </div>

    ${infoBlocks.length > 0 ? `
      <div class="identity-meta-strip">
        ${infoBlocks.map(b => `
          <div class="meta-strip-item">
            <span class="strip-label">${escapeHtml(b.label)}</span>
            <strong class="strip-val">${escapeHtml(b.value)}</strong>
            ${b.sub ? `<span class="strip-sub">${escapeHtml(b.sub)}</span>` : ''}
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

function renderSkillsCollection(skillEntries) {
  const section = document.getElementById('portfolio-skills-section');
  if (!section) return;

  if (!skillEntries || skillEntries.length === 0) {
    section.setAttribute('hidden', '');
    section.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');

  // Extract unique categories
  const categories = ['All', ...new Set(skillEntries.map(s => s.category || 'Core').filter(Boolean))];

  section.innerHTML = `
    <div class="section-heading-wrap">
      <span class="badge badge-subtle">Core Competencies</span>
      <h2 class="section-title">Strategic Skills & Analytical Stack</h2>
      <p class="section-subtitle">Structured frameworks, enterprise tooling, and commercial modeling capabilities.</p>
    </div>

    <div class="skills-filter-tabs" role="tablist" aria-label="Skills Filter">
      ${categories.map((cat, idx) => `
        <button class="skill-tab-btn ${idx === 0 ? 'active' : ''}" data-category="${escapeHtml(cat)}" role="tab" aria-selected="${idx === 0}">
          ${escapeHtml(cat)}
        </button>
      `).join('')}
    </div>

    <div class="skills-grid" id="skills-grid-container">
      ${skillEntries.map(skill => `
        <div class="skill-card" data-category="${escapeHtml(skill.category || 'Core')}">
          <div class="skill-card-top">
            <h3 class="skill-name">${escapeHtml(skill.name)}</h3>
            ${skill.level ? `<span class="skill-level-badge">${escapeHtml(skill.level)}</span>` : ''}
          </div>
          ${skill.desc ? `<p class="skill-desc">${escapeHtml(skill.desc)}</p>` : ''}
          <div class="skill-card-cat">${escapeHtml(skill.category || 'General')}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Bind category filter tabs
  const tabBtns = section.querySelectorAll('.skill-tab-btn');
  const skillCards = section.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const selectedCat = btn.getAttribute('data-category');
      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (selectedCat === 'All' || cardCat === selectedCat) {
          card.removeAttribute('hidden');
          card.style.display = 'flex';
        } else {
          card.setAttribute('hidden', '');
          card.style.display = 'none';
        }
      });
    });
  });
}

function renderExperienceCollection(experienceEntries) {
  const section = document.getElementById('portfolio-experience-section');
  if (!section) return;

  if (!experienceEntries || experienceEntries.length === 0) {
    section.setAttribute('hidden', '');
    section.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');

  section.innerHTML = `
    <div class="section-heading-wrap">
      <span class="badge badge-subtle">Track Record</span>
      <h2 class="section-title">Corporate Experience & Consulting</h2>
      <p class="section-subtitle">Leading cross-functional initiatives, financial modeling, and operational restructuring.</p>
    </div>

    <div class="timeline-container">
      <div class="timeline-line-rail"></div>
      <div class="timeline-items">
        ${experienceEntries.map((exp, idx) => `
          <div class="timeline-node ${exp.isCurrent ? 'is-current' : ''}">
            <div class="timeline-marker">
              <span class="timeline-dot ${exp.isCurrent ? 'pulse' : ''}"></span>
            </div>
            <div class="timeline-card">
              <div class="timeline-card-header">
                <div class="timeline-role-group">
                  <h3 class="timeline-role">${escapeHtml(exp.role)}</h3>
                  <div class="timeline-company-row">
                    <strong class="timeline-company">${escapeHtml(exp.company)}</strong>
                    ${exp.location ? `<span class="timeline-loc">• ${escapeHtml(exp.location)}</span>` : ''}
                    ${exp.type ? `<span class="badge badge-neutral">${escapeHtml(exp.type)}</span>` : ''}
                  </div>
                </div>
                <div class="timeline-year-badge">
                  <span>${escapeHtml(exp.year)}</span>
                  ${exp.isCurrent ? `<span class="current-pill">Active</span>` : ''}
                </div>
              </div>

              ${exp.description ? `<p class="timeline-desc">${escapeHtml(exp.description)}</p>` : ''}

              ${Array.isArray(exp.highlights) && exp.highlights.length > 0 ? `
                <ul class="timeline-highlights">
                  ${exp.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                </ul>
              ` : ''}

              ${Array.isArray(exp.tags) && exp.tags.length > 0 ? `
                <div class="timeline-tags">
                  ${exp.tags.map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderEducationCollection(educationEntries) {
  const section = document.getElementById('portfolio-education-section');
  if (!section) return;

  if (!educationEntries || educationEntries.length === 0) {
    section.setAttribute('hidden', '');
    section.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');

  section.innerHTML = `
    <div class="section-heading-wrap">
      <span class="badge badge-subtle">Academics</span>
      <h2 class="section-title">Academic Background & Credentials</h2>
      <p class="section-subtitle">Rigorous business management, quantitative finance, and corporate strategy education.</p>
    </div>

    <div class="education-grid">
      ${educationEntries.map(edu => `
        <div class="edu-card">
          <div class="edu-card-top">
            <span class="edu-year">${escapeHtml(edu.year)}</span>
            ${edu.gpa ? `<span class="edu-gpa-badge">${escapeHtml(edu.gpa)}</span>` : ''}
          </div>
          <h3 class="edu-degree">${escapeHtml(edu.degree)}</h3>
          <h4 class="edu-inst">${escapeHtml(edu.institution)}</h4>
          ${edu.specialization ? `<p class="edu-spec">Specialization: <strong>${escapeHtml(edu.specialization)}</strong></p>` : ''}
          ${edu.honors ? `<p class="edu-honors">${escapeHtml(edu.honors)}</p>` : ''}
          ${Array.isArray(edu.coursework) && edu.coursework.length > 0 ? `
            <div class="edu-coursework">
              <span class="cw-label">Key Coursework:</span>
              <div class="cw-pills">
                ${edu.coursework.map(c => `<span class="cw-pill">${escapeHtml(c)}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjectsCollection(projectEntries) {
  const section = document.getElementById('portfolio-projects-section');
  if (!section) return;

  if (!projectEntries || projectEntries.length === 0) {
    section.setAttribute('hidden', '');
    section.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');

  section.innerHTML = `
    <div class="section-heading-wrap">
      <span class="badge badge-subtle">Case Studies</span>
      <h2 class="section-title">Selected Strategic Work & Analytics</h2>
      <p class="section-subtitle">Commercial impact, unit economics modeling, and business intelligence cockpits.</p>
    </div>

    <div class="projects-list">
      ${projectEntries.map((proj, idx) => {
        const metrics = Array.isArray(proj.metrics) ? proj.metrics : [];
        const stack = Array.isArray(proj.stack) ? proj.stack : (Array.isArray(proj.tools) ? proj.tools : []);
        const image = proj.image ? resolveAsset(proj.image) : '';
        const pdf = proj.pdfUrl ? resolveAsset(proj.pdfUrl) : '';

        return `
          <article class="project-entry-card" data-project-id="${escapeHtml(proj.id || idx)}">
            <div class="project-card-grid">
              <div class="project-info-col">
                <div class="project-meta-row">
                  <span class="badge badge-accent">${escapeHtml(proj.category || 'Strategy')}</span>
                  ${proj.year ? `<span class="project-year">${escapeHtml(proj.year)}</span>` : ''}
                  ${proj.role ? `<span class="project-role-tag">${escapeHtml(proj.role)}</span>` : ''}
                </div>

                <h3 class="project-card-title">${escapeHtml(proj.title)}</h3>
                ${proj.tagline ? `<p class="project-tagline">${escapeHtml(proj.tagline)}</p>` : ''}
                ${proj.description ? `<p class="project-desc">${escapeHtml(proj.description)}</p>` : ''}

                ${metrics.length > 0 ? `
                  <div class="project-metrics-strip">
                    ${metrics.map(m => `
                      <div class="p-metric-item">
                        <span class="p-metric-value">${escapeHtml(m.value)}</span>
                        <span class="p-metric-label">${escapeHtml(m.label)}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${stack.length > 0 ? `
                  <div class="project-stack-wrap">
                    ${stack.map(s => `<span class="stack-chip">${escapeHtml(s)}</span>`).join('')}
                  </div>
                ` : ''}

                <div class="project-actions-row">
                  <button type="button" class="btn btn-primary btn-sm btn-open-case-study" data-index="${idx}">
                    View Case Study Breakdown →
                  </button>
                  ${pdf ? `
                    <a href="${pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      PDF Brief
                    </a>
                  ` : ''}
                  ${proj.externalLink ? `
                    <a href="${escapeHtml(proj.externalLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-text btn-sm" aria-label="External link for ${escapeHtml(proj.title)}">
                      Link ↗
                    </a>
                  ` : ''}
                </div>
              </div>

              ${image ? `
                <div class="project-visual-col">
                  <div class="project-img-frame">
                    <img src="${image}" alt="${escapeHtml(proj.title)} Dashboard Preview" loading="lazy" />
                  </div>
                </div>
              ` : ''}
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;

  // Attach event listeners to open case study modal
  const openBtns = section.querySelectorAll('.btn-open-case-study');
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const proj = projectEntries[idx];
      openCaseStudyModal(proj, btn);
    });
  });
}

function renderCertificatesCollection(certificateEntries) {
  const section = document.getElementById('portfolio-certificates-section');
  if (!section) return;

  if (!certificateEntries || certificateEntries.length === 0) {
    section.setAttribute('hidden', '');
    section.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');

  section.innerHTML = `
    <div class="section-heading-wrap">
      <span class="badge badge-subtle">Credentials</span>
      <h2 class="section-title">Certifications & Licenses</h2>
      <p class="section-subtitle">Verified professional standards in financial analysis, business intelligence, and modeling.</p>
    </div>

    <div class="certs-grid">
      ${certificateEntries.map(cert => `
        <div class="cert-card">
          <div class="cert-top">
            <span class="cert-issuer">${escapeHtml(cert.issuer)}</span>
            <span class="cert-year">${escapeHtml(cert.year)}</span>
          </div>
          <h3 class="cert-title">${escapeHtml(cert.title)}</h3>
          ${cert.description ? `<p class="cert-desc">${escapeHtml(cert.description)}</p>` : ''}
          <div class="cert-footer">
            ${cert.credentialId ? `<span class="cert-id">ID: ${escapeHtml(cert.credentialId)}</span>` : ''}
            ${cert.link ? `
              <a href="${escapeHtml(cert.link)}" target="_blank" rel="noopener noreferrer" class="cert-verify-link">
                Verify ↗
              </a>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAchievementsCollection(achievementEntries) {
  const section = document.getElementById('portfolio-achievements-section');
  if (!section) return;

  if (!achievementEntries || achievementEntries.length === 0) {
    section.setAttribute('hidden', '');
    section.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');

  section.innerHTML = `
    <div class="section-heading-wrap">
      <span class="badge badge-subtle">Distinctions</span>
      <h2 class="section-title">Honors & Executive Achievements</h2>
      <p class="section-subtitle">Peer recognition, case competition championships, and academic honors.</p>
    </div>

    <div class="achievements-grid">
      ${achievementEntries.map(ach => `
        <div class="achievement-card">
          <div class="ach-badge-row">
            <span class="badge badge-outline">${escapeHtml(ach.category || 'Distinction')}</span>
            <span class="ach-year">${escapeHtml(ach.year)}</span>
          </div>
          <h3 class="ach-title">${escapeHtml(ach.title)}</h3>
          <p class="ach-org">${escapeHtml(ach.org)}</p>
          ${ach.desc ? `<p class="ach-desc">${escapeHtml(ach.desc)}</p>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderResearchCollection(researchEntries) {
  const section = document.getElementById('portfolio-research-section');
  if (!section) return;

  if (!researchEntries || researchEntries.length === 0) {
    section.setAttribute('hidden', '');
    section.innerHTML = '';
    return;
  }

  section.removeAttribute('hidden');

  section.innerHTML = `
    <div class="section-heading-wrap">
      <span class="badge badge-subtle">Publications</span>
      <h2 class="section-title">Research Papers & Strategic Briefs</h2>
      <p class="section-subtitle">Original quantitative inquiry into pricing elasticity, logistics, and corporate governance.</p>
    </div>

    <div class="research-grid">
      ${researchEntries.map(res => `
        <div class="research-card">
          <div class="res-meta-row">
            <span class="badge badge-accent">${escapeHtml(res.type || 'Working Paper')}</span>
            <span class="res-year">${escapeHtml(res.year)}</span>
          </div>
          <h3 class="res-title">${escapeHtml(res.title)}</h3>
          <p class="res-publisher">${escapeHtml(res.publisher)}</p>
          ${res.abstract ? `<p class="res-abstract">${escapeHtml(res.abstract)}</p>` : ''}
          ${res.link ? `
            <a href="${escapeHtml(res.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm mt-3">
              Read Brief ↗
            </a>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * =========================================================================
 * 3. HIRE ME PAGE RENDERER
 * Platform Handoff Rule:
 * Provide one clear action and a fallback link.
 * Resolves to /hire-me/{handle}. Do not duplicate hiring form.
 * =========================================================================
 */
function renderHireMe(profile) {
  const { user, profile: meta } = profile;
  const container = document.getElementById('hire-me-handoff-container');
  if (!container) return;

  const handle = meta.handle || 'portfolio';
  const platformHandoffUrl = `/hire-me/${encodeURIComponent(handle)}`;

  container.innerHTML = `
    <div class="hire-handoff-card">
      <div class="hire-card-badge">
        <span class="status-pulse-dot"></span>
        <span>${user.openToHire ? 'Available for Corporate & Advisory Engagements' : 'Consulting Advisory Inquiries'}</span>
      </div>

      <div class="hire-hero-header">
        <h1 class="hire-title">Retain or Hire <span class="text-gradient">${escapeHtml(user.name)}</span></h1>
        <p class="hire-subtitle">
          ${escapeHtml(meta.headline)} • ${escapeHtml(user.location || 'New York & Global Remote')}
        </p>
      </div>

      <div class="hire-pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">📊</div>
          <h3>Commercial Due Diligence</h3>
          <p>Financial modeling, unit economics analysis, and M&A synergy matrices.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">⚡</div>
          <h3>Operational Restructuring</h3>
          <p>Supply chain optimization, working capital liberation, and KPI telemetry.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">🎯</div>
          <h3>Full-Time Corporate Leadership</h3>
          <p>MBA-level strategic business analysis, GTM modeling, and executive governance.</p>
        </div>
      </div>

      <div class="hire-action-zone">
        <div class="hire-primary-box">
          <p class="hire-action-note">
            Official hiring inquiries, contract engagements, and recruitment reviews are processed through the shared BEXO verified talent ecosystem.
          </p>
          <a href="${platformHandoffUrl}" class="btn btn-primary btn-lg hire-cta-button" id="bexo-platform-handoff-cta">
            Proceed to BEXO Hiring Platform →
          </a>
        </div>

        <div class="hire-fallback-box">
          <span class="fallback-label">Direct Consultant Contact:</span>
          <div class="fallback-links">
            ${user.email ? `
              <a href="mailto:${escapeHtml(user.email)}?subject=Executive Opportunity for ${encodeURIComponent(user.name)}" class="fallback-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Send Direct Email (${escapeHtml(user.email)})
              </a>
            ` : ''}
            ${user.phone ? `
              <a href="tel:${escapeHtml(user.phone.replace(/[^0-9+]/g, ''))}" class="fallback-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Direct Office Line
              </a>
            ` : ''}
            ${user.resumeUrl ? `
              <a href="${resolveAsset(user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="fallback-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Review Executive CV (PDF)
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}
