/**
 * BEXO Standard Renderer Integration — Design & Creative
 * Owns:
 * - Rendering Home, Portfolio, and Hire Me pages
 * - Strict conditional visibility (hides empty collections cleanly without gaps)
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
  const { user, profile: meta, projectEntries, services, awards, clients } = profile;

  // Name & Designation
  const nameEls = document.querySelectorAll('[data-bind="user.name"]');
  nameEls.forEach((el) => {
    el.textContent = user.name || 'Alex Mercer';
  });

  const designation = meta.headline || meta.bio || 'Creative Director & Designer';
  const headlineEls = document.querySelectorAll('[data-bind="profile.headline"]');
  headlineEls.forEach((el) => {
    el.textContent = designation;
  });

  const taglineEls = document.querySelectorAll('[data-bind="profile.tagline"]');
  taglineEls.forEach((el) => {
    el.textContent = meta.tagline || designation;
  });

  const bioEls = document.querySelectorAll('[data-bind="profile.bio"]');
  bioEls.forEach((el) => {
    el.textContent = meta.bio || '';
  });

  // Portrait Photo
  const portraitEl = document.getElementById('home-portrait');
  if (portraitEl) {
    if (user.photoUrl) {
      portraitEl.onerror = () => {
        if (!portraitEl.dataset.fallbackApplied) {
          portraitEl.dataset.fallbackApplied = 'true';
          const filename = user.photoUrl.split('/').pop() || 'portrait.png';
          portraitEl.src = resolveAsset(`assets/${filename}`);
        }
      };
      portraitEl.src = resolveAsset(user.photoUrl);
      portraitEl.alt = `${user.name} — Creative Director Portrait`;
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
        <span class="status-badge-text">Available for Projects & Retainers</span>
      `;
    } else {
      hireBadgeEl.setAttribute('hidden', '');
      hireBadgeEl.innerHTML = '';
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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Creative CV (PDF)</span>
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
    const stats = Array.isArray(meta.heroStats) && meta.heroStats.length > 0 ? meta.heroStats : [];
    if (stats.length > 0) {
      statsContainer.removeAttribute('hidden');
      statsContainer.innerHTML = stats.map((s) => `
        <div class="stat-pill-card">
          <span class="stat-value">${escapeHtml(s.value)}</span>
          <div class="stat-label-wrap">
            <strong class="stat-label">${escapeHtml(s.label)}</strong>
            ${s.desc ? `<span class="stat-desc">${escapeHtml(s.desc)}</span>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      statsContainer.setAttribute('hidden', '');
    }
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
              <span class="badge badge-accent">Featured Flagship Project</span>
              <span class="featured-year">${escapeHtml(topProject.year || '2026')}</span>
            </div>
            <h3 class="featured-title">${escapeHtml(topProject.title)}</h3>
            <p class="featured-desc">${escapeHtml(topProject.description)}</p>
            <div class="featured-tags">
              ${(topProject.stack || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
            <div class="featured-actions">
              <button type="button" class="btn btn-primary btn-sm" id="btn-featured-modal">
                <span>View Full Case Study</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <a href="${resolveRoute('portfolio')}" class="btn btn-text">
                Browse All Works →
              </a>
            </div>
          </div>
          ${topProject.image ? `
            <div class="featured-card-visual">
              <img src="${resolveAsset(topProject.image)}" alt="${escapeHtml(topProject.title)} visual" loading="lazy" />
            </div>
          ` : ''}
        </div>
      `;

      const modalBtn = document.getElementById('btn-featured-modal');
      if (modalBtn) {
        modalBtn.addEventListener('click', () => openCaseStudyModal(topProject));
      }
    } else {
      featuredTeaserSlot.setAttribute('hidden', '');
    }
  }

  // Creative Services Overview
  const servicesSlot = document.getElementById('home-services-slot');
  if (servicesSlot) {
    if (services.length > 0) {
      servicesSlot.parentElement?.removeAttribute('hidden');
      servicesSlot.innerHTML = services.map((srv) => `
        <div class="service-card">
          <span class="service-num">${escapeHtml(srv.number || '01')}</span>
          <h3 class="service-title">${escapeHtml(srv.title)}</h3>
          <p class="service-desc">${escapeHtml(srv.description)}</p>
        </div>
      `).join('');
    } else {
      servicesSlot.parentElement?.setAttribute('hidden', '');
    }
  }

  // Awards Strip
  const awardsSlot = document.getElementById('home-awards-slot');
  if (awardsSlot) {
    if (awards.length > 0) {
      awardsSlot.parentElement?.removeAttribute('hidden');
      awardsSlot.innerHTML = awards.map((awd) => `
        <div class="award-pill">
          <span class="award-year">${escapeHtml(awd.year)}</span>
          <strong class="award-name">${escapeHtml(awd.title)}</strong>
          <span class="award-cat">${escapeHtml(awd.category)}</span>
        </div>
      `).join('');
    } else {
      awardsSlot.parentElement?.setAttribute('hidden', '');
    }
  }

  // Clients Marquee
  const clientsSlot = document.getElementById('home-clients-slot');
  if (clientsSlot) {
    if (clients.length > 0) {
      clientsSlot.parentElement?.removeAttribute('hidden');
      clientsSlot.innerHTML = clients.map((c) => `
        <div class="client-badge">
          <span>${escapeHtml(c.name)}</span>
        </div>
      `).join('');
    } else {
      clientsSlot.parentElement?.setAttribute('hidden', '');
    }
  }
}

/**
 * =========================================================================
 * 2. PORTFOLIO PAGE RENDERER
 * Recommended order:
 * About/Identity -> Skills -> Experience -> Education -> Selected Work -> Certificates -> Achievements -> Research
 * =========================================================================
 */
function renderPortfolio(profile) {
  const {
    user,
    profile: meta,
    skillEntries,
    experienceEntries,
    educationEntries,
    projectEntries,
    certificateEntries,
    achievementEntries,
    researchEntries,
  } = profile;

  // 1. Identity Block
  const nameEls = document.querySelectorAll('[data-bind="user.name"]');
  nameEls.forEach((el) => { el.textContent = user.name || 'Alex Mercer'; });

  const designation = meta.headline || meta.bio || 'Creative Director & Designer';
  const headlineEls = document.querySelectorAll('[data-bind="profile.headline"]');
  headlineEls.forEach((el) => { el.textContent = designation; });

  const bioEls = document.querySelectorAll('[data-bind="profile.bio"]');
  bioEls.forEach((el) => { el.textContent = meta.bio || ''; });

  const goalEl = document.getElementById('portfolio-career-goal');
  if (goalEl) {
    if (meta.careerGoal) {
      goalEl.removeAttribute('hidden');
      goalEl.innerHTML = `<strong>Creative Mission:</strong> ${escapeHtml(meta.careerGoal)}`;
    } else {
      goalEl.setAttribute('hidden', '');
    }
  }

  const portraitEl = document.getElementById('portfolio-portrait');
  if (portraitEl) {
    if (user.photoUrl) {
      portraitEl.src = resolveAsset(user.photoUrl);
      portraitEl.alt = `${user.name} Portrait`;
    } else {
      portraitEl.parentElement?.classList.add('no-photo');
    }
  }

  const hireBadgeEl = document.getElementById('portfolio-hire-badge');
  if (hireBadgeEl) {
    if (user.openToHire === true) {
      hireBadgeEl.removeAttribute('hidden');
      hireBadgeEl.innerHTML = `
        <span class="status-pulse-dot"></span>
        <span>Available for Strategic Engagements</span>
      `;
    } else {
      hireBadgeEl.setAttribute('hidden', '');
    }
  }

  // 2. Skills Collection
  const skillsSection = document.getElementById('section-skills');
  const skillsGrid = document.getElementById('portfolio-skills-grid');
  if (skillsSection && skillsGrid) {
    if (skillEntries.length > 0) {
      skillsSection.removeAttribute('hidden');
      skillsGrid.innerHTML = skillEntries.map((cat) => `
        <div class="skill-category-card">
          <h3 class="skill-category-title">${escapeHtml(cat.category)}</h3>
          <div class="skill-pills-wrap">
            ${(cat.skills || []).map((s) => `<span class="skill-pill">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `).join('');
    } else {
      skillsSection.setAttribute('hidden', '');
    }
  }

  // 3. Experience Collection
  const expSection = document.getElementById('section-experience');
  const expTimeline = document.getElementById('portfolio-experience-timeline');
  if (expSection && expTimeline) {
    if (experienceEntries.length > 0) {
      expSection.removeAttribute('hidden');
      expTimeline.innerHTML = experienceEntries.map((item) => `
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <span class="timeline-period">${escapeHtml(item.period || item.year || '')}</span>
              <h3 class="timeline-role">${escapeHtml(item.role)}</h3>
              <div class="timeline-company">${escapeHtml(item.company)} • ${escapeHtml(item.location || '')}</div>
            </div>
          </div>
          ${item.description ? `<p class="timeline-desc">${escapeHtml(item.description)}</p>` : ''}
          ${Array.isArray(item.highlights) && item.highlights.length > 0 ? `
            <ul class="timeline-highlights">
              ${item.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('');
    } else {
      expSection.setAttribute('hidden', '');
    }
  }

  // 4. Education Collection
  const eduSection = document.getElementById('section-education');
  const eduGrid = document.getElementById('portfolio-education-grid');
  if (eduSection && eduGrid) {
    if (educationEntries.length > 0) {
      eduSection.removeAttribute('hidden');
      eduGrid.innerHTML = educationEntries.map((edu) => `
        <div class="education-card">
          <span class="education-year">${escapeHtml(edu.year || '')}</span>
          <h3 class="education-degree">${escapeHtml(edu.degree)}</h3>
          <div class="education-institution">${escapeHtml(edu.institution)} • ${escapeHtml(edu.location || '')}</div>
          ${edu.honors ? `<div class="education-honors">${escapeHtml(edu.honors)}</div>` : ''}
          ${edu.description ? `<p class="education-desc">${escapeHtml(edu.description)}</p>` : ''}
        </div>
      `).join('');
    } else {
      eduSection.setAttribute('hidden', '');
    }
  }

  // 5. Selected Work (Projects)
  const workSection = document.getElementById('section-work');
  const workGrid = document.getElementById('portfolio-work-grid');
  if (workSection && workGrid) {
    if (projectEntries.length > 0) {
      workSection.removeAttribute('hidden');
      workGrid.innerHTML = projectEntries.map((proj, idx) => `
        <article class="project-card" data-project-id="${escapeHtml(proj.id || String(idx))}">
          <div class="project-media-wrap">
            ${proj.image ? `
              <img src="${resolveAsset(proj.image)}" alt="${escapeHtml(proj.title)}" class="project-img" loading="lazy" />
            ` : `<div class="project-img-placeholder"><span>${escapeHtml(proj.title)}</span></div>`}
            <div class="project-media-overlay">
              <button type="button" class="btn btn-sm btn-primary project-modal-trigger" data-index="${idx}">
                <span>Deep Dive Case Study</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
          <div class="project-info">
            <div class="project-meta-row">
              <span class="badge badge-accent">${escapeHtml(proj.category || 'Selected Work')}</span>
              <span class="project-year">${escapeHtml(proj.year || '')}</span>
            </div>
            <h3 class="project-title">${escapeHtml(proj.title)}</h3>
            <p class="project-desc">${escapeHtml(proj.description || '')}</p>
            ${Array.isArray(proj.stack) && proj.stack.length > 0 ? `
              <div class="project-stack">
                ${proj.stack.map((t) => `<span class="stack-tag">${escapeHtml(t)}</span>`).join('')}
              </div>
            ` : ''}
            <div class="project-links-row">
              <button type="button" class="btn-text project-modal-trigger" data-index="${idx}">
                Case Study Overview &rarr;
              </button>
              ${proj.externalUrl ? `
                <a href="${escapeHtml(proj.externalUrl)}" target="_blank" rel="noopener noreferrer" class="btn-text">
                  Live System ↗
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `).join('');

      // Wire up modal openers
      workGrid.querySelectorAll('.project-modal-trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          if (!isNaN(idx) && projectEntries[idx]) {
            openCaseStudyModal(projectEntries[idx]);
          }
        });
      });
    } else {
      workSection.setAttribute('hidden', '');
    }
  }

  // 6. Certificates Collection
  const certSection = document.getElementById('section-certificates');
  const certGrid = document.getElementById('portfolio-certificates-grid');
  if (certSection && certGrid) {
    if (certificateEntries.length > 0) {
      certSection.removeAttribute('hidden');
      certGrid.innerHTML = certificateEntries.map((cert) => `
        <div class="cert-card">
          <div class="cert-icon">✦</div>
          <div class="cert-content">
            <h3 class="cert-name">${escapeHtml(cert.name)}</h3>
            <div class="cert-issuer">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.year || '')}</div>
            ${cert.credentialId ? `<div class="cert-id">ID: ${escapeHtml(cert.credentialId)}</div>` : ''}
            ${cert.url ? `
              <a href="${escapeHtml(cert.url)}" target="_blank" rel="noopener noreferrer" class="cert-link">Verify Credential ↗</a>
            ` : ''}
          </div>
        </div>
      `).join('');
    } else {
      certSection.setAttribute('hidden', '');
    }
  }

  // 7. Achievements Collection
  const achSection = document.getElementById('section-achievements');
  const achGrid = document.getElementById('portfolio-achievements-grid');
  if (achSection && achGrid) {
    if (achievementEntries.length > 0) {
      achSection.removeAttribute('hidden');
      achGrid.innerHTML = achievementEntries.map((ach) => `
        <div class="ach-card">
          <span class="ach-year">${escapeHtml(ach.year || '')}</span>
          <h3 class="ach-title">${escapeHtml(ach.title)}</h3>
          <div class="ach-org">${escapeHtml(ach.organization || '')}</div>
          ${ach.description ? `<p class="ach-desc">${escapeHtml(ach.description)}</p>` : ''}
        </div>
      `).join('');
    } else {
      achSection.setAttribute('hidden', '');
    }
  }

  // 8. Research Collection
  const resSection = document.getElementById('section-research');
  const resGrid = document.getElementById('portfolio-research-grid');
  if (resSection && resGrid) {
    if (researchEntries.length > 0) {
      resSection.removeAttribute('hidden');
      resGrid.innerHTML = researchEntries.map((res) => `
        <div class="res-card">
          <span class="res-year">${escapeHtml(res.year || '')}</span>
          <h3 class="res-title">${escapeHtml(res.title)}</h3>
          <div class="res-pub">${escapeHtml(res.publication || '')}</div>
          ${res.coAuthors ? `<div class="res-authors">Authors: ${escapeHtml(res.coAuthors)}</div>` : ''}
          ${res.summary ? `<p class="res-summary">${escapeHtml(res.summary)}</p>` : ''}
          ${res.link ? `
            <a href="${escapeHtml(res.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Read Publication ↗</a>
          ` : ''}
        </div>
      `).join('');
    } else {
      resSection.setAttribute('hidden', '');
    }
  }
}

/**
 * =========================================================================
 * 3. HIRE ME PAGE RENDERER
 * Platform handoff to /hire-me/{handle} with fallback contacts.
 * =========================================================================
 */
function renderHireMe(profile) {
  const container = document.getElementById('hire-me-handoff-container');
  if (!container) return;

  const { user, profile: meta } = profile;
  const handle = meta.handle || 'alexmercer';
  const platformHandoffUrl = `/hire-me/${encodeURIComponent(handle)}`;

  container.innerHTML = `
    <div class="hire-hero">
      <div class="hire-badge-row">
        <span class="badge badge-accent">BEXO Verified Talent Handoff</span>
        ${user.openToHire ? '<span class="status-pill status-open">Actively Accepting Engagements</span>' : ''}
      </div>
      <h1 class="hire-title">Retain or Hire <span class="highlight">${escapeHtml(user.name)}</span></h1>
      <p class="hire-lead">${escapeHtml(meta.headline || 'Creative Director & Designer')} — ${escapeHtml(user.location || 'New York & Global Remote')}</p>
    </div>

    <!-- Practice Pillars -->
    <div class="hire-pillars-grid">
      <div class="pillar-card">
        <div class="pillar-badge">01</div>
        <h3>Brand Strategy & Identity Systems</h3>
        <p>Bespoke visual branding, typography systems, design guidelines, and multi-surface identity rollouts for high-growth ventures.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-badge">02</div>
        <h3>UI/UX & Interactive Product Design</h3>
        <p>End-to-end design for desktop applications, responsive web ecosystems, design tokens, and tactile micro-interactions.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-badge">03</div>
        <h3>Motion Direction & Spatial 3D</h3>
        <p>Broadcast packaging, sound-reactive visuals, Three.js / WebGL experiences, and spatial computing interfaces.</p>
      </div>
    </div>

    <!-- Platform Handoff Box -->
    <div class="hire-handoff-box">
      <div class="hire-handoff-main">
        <h2>Initiate Official Engagement</h2>
        <p>Direct contract agreements, retainer proposals, and full-time hiring inquiries are securely routed through the central BEXO hiring platform.</p>
        <div class="hire-primary-action">
          <a href="${platformHandoffUrl}" class="btn btn-primary btn-lg" id="btn-bexo-handoff">
            <span>Proceed to BEXO Talent Platform</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>

      <!-- Direct Fallbacks -->
      <div class="hire-fallback-section">
        <h3>Direct Contact & Verification Fallbacks</h3>
        <div class="hire-fallback-links">
          ${user.email ? `
            <a href="mailto:${escapeHtml(user.email)}?subject=Direct Inquiry for ${encodeURIComponent(user.name)}" class="fallback-link-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Email: ${escapeHtml(user.email)}</span>
            </a>
          ` : ''}
          ${user.phone ? `
            <a href="tel:${escapeHtml(user.phone.replace(/[^0-9+]/g, ''))}" class="fallback-link-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call: ${escapeHtml(user.phone)}</span>
            </a>
          ` : ''}
          ${user.resumeUrl ? `
            <a href="${resolveAsset(user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="fallback-link-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Review Executive CV (PDF)</span>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
