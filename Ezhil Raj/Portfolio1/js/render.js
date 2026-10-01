/**
 * BEXO Standard Page Composition Renderer
 * Conforms to:
 * - Data-driven composition via profile-runtime
 * - Clean section hiding for empty collections (no orphan headings)
 * - Home: First-viewport identity, primary CTA, conditional resume CTA
 * - Portfolio: Identity, Skills, Case Studies, Essays, Experience, Education, Certificates, Achievements
 * - Hire Me: Single clear platform handoff to /hire-me/{handle} with fallback contacts
 * - Newsletter subscription interactive feedback
 */

import { getProfile, resolveAsset, resolveRoute, escapeHtml } from './profile-runtime.js';
import { setupImageFallbacks } from './media.js';

export function renderPage(pageType) {
  const profile = getProfile();

  switch (pageType) {
    case 'home':
      renderHomePage(profile);
      break;
    case 'portfolio':
      renderPortfolioPage(profile);
      break;
    case 'hire-me':
      renderHireMePage(profile);
      break;
    default:
      console.warn('Unknown page type:', pageType);
  }

  setupImageFallbacks();
  setupNewsletterForm();
}

/**
 * ─────────────────────────────────────────────────────────────
 * 1. HOME PAGE RENDERER
 * ─────────────────────────────────────────────────────────────
 */
function renderHomePage(profile) {
  const { user, profile: meta, projectEntries, researchEntries } = profile;

  // 1. Home Hire Badge
  const hireBadge = document.getElementById('home-hire-badge');
  if (hireBadge) {
    if (user.openToHire) {
      hireBadge.removeAttribute('hidden');
      hireBadge.innerHTML = `
        <span class="status-dot pulse"></span>
        <span>Available for Strategic Retainers</span>
      `;
    } else {
      hireBadge.setAttribute('hidden', '');
    }
  }

  // 2. Data-bind attributes
  document.querySelectorAll('[data-bind]').forEach(el => {
    const key = el.getAttribute('data-bind');
    if (key === 'user.name') el.textContent = user.name;
    if (key === 'profile.headline') el.textContent = meta.headline;
    if (key === 'profile.tagline') el.textContent = meta.tagline || meta.headline;
    if (key === 'profile.bio') el.textContent = meta.bio;
  });

  // 3. Conditional Resume CTA
  const resumeContainer = document.getElementById('cta-resume-container');
  if (resumeContainer) {
    if (user.resumeUrl) {
      resumeContainer.removeAttribute('hidden');
      resumeContainer.innerHTML = `
        <a href="${resolveAsset(user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-lg" id="cta-download-resume">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Download CV (PDF)</span>
        </a>
      `;
    } else {
      resumeContainer.setAttribute('hidden', '');
      resumeContainer.innerHTML = '';
    }
  }

  // 4. Portrait
  const portraitImg = document.getElementById('home-portrait');
  if (portraitImg && user.photoUrl) {
    portraitImg.src = resolveAsset(user.photoUrl);
    portraitImg.alt = `${escapeHtml(user.name)} - ${escapeHtml(meta.headline)}`;
  }

  // 5. Hero Stats Strip
  const statsStrip = document.getElementById('home-hero-stats');
  if (statsStrip && meta.heroStats.length > 0) {
    statsStrip.innerHTML = meta.heroStats.map(stat => `
      <div class="stat-item">
        <div class="stat-value">${escapeHtml(stat.value)}</div>
        <div class="stat-label">${escapeHtml(stat.label)}</div>
        <div class="stat-detail">${escapeHtml(stat.detail || '')}</div>
      </div>
    `).join('');
  }

  // 6. Manifesto Section
  const manifestoContainer = document.getElementById('home-manifesto');
  if (manifestoContainer && profile.manifesto && Array.isArray(profile.manifesto.lines)) {
    manifestoContainer.innerHTML = `
      <div class="manifesto-inner">
        <span class="eyebrow-tag">Core Conviction</span>
        <div class="manifesto-lines">
          ${profile.manifesto.lines.map(line => {
            if (!line.text) return '<div class="manifesto-break"></div>';
            const classes = ['manifesto-line'];
            if (line.accent) classes.push('accent-line');
            if (line.muted) classes.push('muted-line');
            return `<div class="${classes.join(' ')}">${escapeHtml(line.text)}</div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 7. Featured Essay Teaser
  const featuredWrapper = document.getElementById('home-featured-essay');
  const featuredEssay = researchEntries.find(r => r.featured) || researchEntries[0];
  if (featuredWrapper && featuredEssay) {
    featuredWrapper.removeAttribute('hidden');
    featuredWrapper.innerHTML = `
      <div class="featured-essay-card">
        <div class="featured-badge-row">
          <span class="badge badge-accent">Featured Writing</span>
          <span class="meta-read-time">${escapeHtml(featuredEssay.readTime || '6 min read')}</span>
        </div>
        <div class="featured-grid">
          ${featuredEssay.image ? `
            <div class="featured-img-col">
              <img src="${resolveAsset(featuredEssay.image)}" alt="${escapeHtml(featuredEssay.title)}" class="featured-cover-img" />
            </div>
          ` : ''}
          <div class="featured-text-col">
            <span class="featured-category">${escapeHtml(featuredEssay.category)}</span>
            <h2 class="featured-title">${escapeHtml(featuredEssay.title)}</h2>
            <p class="featured-excerpt">${escapeHtml(featuredEssay.excerpt)}</p>
            <div class="featured-actions">
              <button class="btn btn-primary" data-article-id="${escapeHtml(featuredEssay.id)}">
                Read Full Essay &rarr;
              </button>
              <a href="${resolveRoute('portfolio')}#essays-section" class="btn btn-text">
                Browse All Writing &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 8. Featured Case Study Preview
  const featuredCaseWrapper = document.getElementById('home-featured-case');
  if (featuredCaseWrapper && projectEntries.length > 0) {
    const topCase = projectEntries[0];
    featuredCaseWrapper.removeAttribute('hidden');
    featuredCaseWrapper.innerHTML = `
      <div class="featured-case-teaser">
        <div class="section-tag-row">
          <span class="badge badge-outline">Client Case Study</span>
          <span class="meta-year">${escapeHtml(topCase.year)}</span>
        </div>
        <div class="case-teaser-body">
          <div class="case-teaser-header">
            <span class="case-number">${escapeHtml(topCase.number || '01')}</span>
            <div class="case-header-content">
              <h3>${escapeHtml(topCase.title)}</h3>
              <p class="case-client-tag">Client: <strong>${escapeHtml(topCase.client)}</strong> &bull; Role: <strong>${escapeHtml(topCase.role)}</strong></p>
            </div>
          </div>
          <p class="case-teaser-desc">${escapeHtml(topCase.summary || topCase.challenge)}</p>
          <div class="case-teaser-meta">
            <span class="outcome-pill">Outcome: ${escapeHtml(topCase.outcome)}</span>
            <button class="btn btn-outline btn-sm" data-case-id="${escapeHtml(topCase.id)}">
              View Case Study Breakdown &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * ─────────────────────────────────────────────────────────────
 * 2. PORTFOLIO PAGE RENDERER
 * ─────────────────────────────────────────────────────────────
 */
function renderPortfolioPage(profile) {
  const { user, profile: meta, skillEntries, experienceEntries, educationEntries, projectEntries, researchEntries, certificateEntries, achievementEntries, testimonials } = profile;

  // 1. Identity Section
  const identitySection = document.getElementById('portfolio-identity-section');
  if (identitySection) {
    identitySection.innerHTML = `
      <div class="portfolio-identity-card">
        <div class="identity-portrait-col">
          <div class="identity-photo-frame">
            <img src="${resolveAsset(user.photoUrl)}" alt="${escapeHtml(user.name)}" class="identity-photo" />
            ${user.openToHire ? `
              <div class="identity-status-floating">
                <span class="status-dot pulse"></span>
                <span>Open for Advisory</span>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="identity-content-col">
          <div class="identity-tags">
            <span class="badge badge-accent">Verified Profile</span>
            <span class="identity-location">${escapeHtml(user.location || '')}</span>
          </div>
          <h1 class="identity-name">${escapeHtml(user.name)}</h1>
          <p class="identity-headline">${escapeHtml(meta.headline)}</p>
          <p class="identity-bio">${escapeHtml(meta.bio)}</p>
          ${meta.careerGoal ? `
            <div class="identity-career-goal">
              <strong>Perspective:</strong> ${escapeHtml(meta.careerGoal)}
            </div>
          ` : ''}
          <div class="identity-actions">
            ${user.resumeUrl ? `
              <a href="${resolveAsset(user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Resume (PDF)
              </a>
            ` : ''}
            <a href="${resolveRoute('contact')}" class="btn btn-primary">
              Direct Contact &rarr;
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Skills Collection
  renderCollection(
    'portfolio-skills-section',
    skillEntries,
    (skills) => `
      <div class="section-header">
        <span class="eyebrow-tag">Core Competencies</span>
        <h2 class="section-title">Capabilities &amp; Strategy Areas</h2>
        <p class="section-subtitle">Structured frameworks, publishing methodologies, and strategic advisory tools.</p>
      </div>
      <div class="skills-grid">
        ${skills.map(cat => `
          <div class="skill-category-card">
            <h3 class="skill-cat-title">${escapeHtml(cat.category)}</h3>
            <ul class="skill-items-list">
              ${cat.items.map(item => `
                <li class="skill-item">
                  <div class="skill-name-wrap">
                    <span class="skill-bullet">&bull;</span>
                    <span class="skill-name">${escapeHtml(item.name)}</span>
                  </div>
                  ${item.note ? `<span class="skill-note">${escapeHtml(item.note)}</span>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `
  );

  // 3. Selected Work (Case Studies) Collection
  renderCollection(
    'portfolio-projects-section',
    projectEntries,
    (projects) => `
      <div class="section-header">
        <span class="eyebrow-tag">Strategic Track Record</span>
        <h2 class="section-title">Selected Case Studies</h2>
        <p class="section-subtitle">Demonstrated results transforming fragmented communication into unified authority.</p>
      </div>
      <div class="case-studies-grid">
        ${projects.map(p => `
          <article class="case-card">
            <div class="case-card-header">
              <span class="case-card-num">${escapeHtml(p.number || '01')}</span>
              <span class="badge badge-outline">${escapeHtml(p.category)}</span>
            </div>
            ${p.image ? `
              <div class="case-card-img-wrap">
                <img src="${resolveAsset(p.image)}" alt="${escapeHtml(p.title)}" class="case-card-img" />
              </div>
            ` : ''}
            <div class="case-card-body">
              <h3 class="case-card-title">${escapeHtml(p.title)}</h3>
              <p class="case-card-client">Client: <strong>${escapeHtml(p.client)}</strong> &bull; Year: <strong>${escapeHtml(p.year)}</strong></p>
              <p class="case-card-summary">${escapeHtml(p.summary || p.challenge)}</p>
              <div class="case-outcome-callout">
                <strong>Result:</strong> ${escapeHtml(p.outcome)}
              </div>
              <div class="case-card-footer">
                <button class="btn btn-outline btn-sm" data-case-id="${escapeHtml(p.id)}">
                  Full Breakdown &rarr;
                </button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `
  );

  // 4. Published Research & Essays Collection
  renderCollection(
    'portfolio-research-section',
    researchEntries,
    (essays) => `
      <div class="section-header" id="essays-section">
        <span class="eyebrow-tag">Intellectual Capital</span>
        <h2 class="section-title">Published Essays &amp; Insights</h2>
        <p class="section-subtitle">Long-form writing on voice, rhetoric, executive thought leadership, and clarity.</p>
      </div>
      <div class="essays-list-grid">
        ${essays.map(essay => `
          <article class="essay-item-card">
            <div class="essay-item-meta">
              <span class="badge badge-accent">${escapeHtml(essay.category)}</span>
              <span class="meta-dot">&bull;</span>
              <span class="meta-date">${escapeHtml(essay.date)}</span>
              <span class="meta-dot">&bull;</span>
              <span class="meta-read-time">${escapeHtml(essay.readTime || '5 min')}</span>
            </div>
            <h3 class="essay-item-title">${escapeHtml(essay.title)}</h3>
            <p class="essay-item-excerpt">${escapeHtml(essay.excerpt)}</p>
            <div class="essay-item-action">
              <button class="btn btn-text btn-essay-read" data-article-id="${escapeHtml(essay.id)}">
                Read Essay &rarr;
              </button>
            </div>
          </article>
        `).join('')}
      </div>
    `
  );

  // 5. Work Experience Timeline Collection
  renderCollection(
    'portfolio-experience-section',
    experienceEntries,
    (experiences) => `
      <div class="section-header">
        <span class="eyebrow-tag">Career Milestones</span>
        <h2 class="section-title">Experience &amp; Leadership</h2>
        <p class="section-subtitle">Chronological progression across independent advisory, agency leadership, and editorial publishing.</p>
      </div>
      <div class="timeline-container">
        ${experiences.map(exp => `
          <div class="timeline-entry">
            <div class="timeline-marker">
              <span class="timeline-dot"></span>
            </div>
            <div class="timeline-content">
              <div class="timeline-period-pill">${escapeHtml(exp.period)}</div>
              <h3 class="timeline-role">${escapeHtml(exp.role)}</h3>
              <p class="timeline-company">${escapeHtml(exp.company)} &bull; ${escapeHtml(exp.location || '')}</p>
              <p class="timeline-desc">${escapeHtml(exp.description)}</p>
              ${Array.isArray(exp.highlights) && exp.highlights.length > 0 ? `
                <ul class="timeline-highlights">
                  ${exp.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `
  );

  // 6. Education Collection
  renderCollection(
    'portfolio-education-section',
    educationEntries,
    (edu) => `
      <div class="section-header">
        <span class="eyebrow-tag">Academic Background</span>
        <h2 class="section-title">Education &amp; Honors</h2>
      </div>
      <div class="education-grid">
        ${edu.map(item => `
          <div class="education-card">
            <div class="education-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div class="education-info">
              <h3 class="education-degree">${escapeHtml(item.degree)}</h3>
              <p class="education-inst">${escapeHtml(item.institution)} &bull; ${escapeHtml(item.period)}</p>
              <span class="education-grade">${escapeHtml(item.grade)}</span>
              ${item.focus ? `<p class="education-focus">Focus: ${escapeHtml(item.focus)}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `
  );

  // 7. Certificates Collection
  renderCollection(
    'portfolio-certificates-section',
    certificateEntries,
    (certs) => `
      <div class="section-header">
        <span class="eyebrow-tag">Credentials</span>
        <h2 class="section-title">Certifications &amp; Accreditations</h2>
      </div>
      <div class="certificates-grid">
        ${certs.map(c => `
          <div class="cert-card">
            <h3 class="cert-title">${escapeHtml(c.title)}</h3>
            <p class="cert-issuer">${escapeHtml(c.issuer)} &bull; ${escapeHtml(c.year)}</p>
            ${c.credentialId ? `<p class="cert-id">ID: <code>${escapeHtml(c.credentialId)}</code></p>` : ''}
          </div>
        `).join('')}
      </div>
    `
  );

  // 8. Achievements Collection
  renderCollection(
    'portfolio-achievements-section',
    achievementEntries,
    (achievements) => `
      <div class="section-header">
        <span class="eyebrow-tag">Distinctions</span>
        <h2 class="section-title">Public Speaking &amp; Recognition</h2>
      </div>
      <div class="achievements-grid">
        ${achievements.map(a => `
          <div class="achievement-card">
            <div class="achieve-year">${escapeHtml(a.year)}</div>
            <h3 class="achieve-title">${escapeHtml(a.title)}</h3>
            <p class="achieve-org">${escapeHtml(a.organization)}</p>
            <p class="achieve-desc">${escapeHtml(a.description)}</p>
          </div>
        `).join('')}
      </div>
    `
  );

  // 9. Testimonials Collection
  renderCollection(
    'portfolio-testimonials-section',
    testimonials,
    (quotes) => `
      <div class="section-header">
        <span class="eyebrow-tag">Endorsements</span>
        <h2 class="section-title">What Collaborators Say</h2>
      </div>
      <div class="testimonials-grid">
        ${quotes.map(t => `
          <div class="testimonial-card">
            <div class="quote-mark">&ldquo;</div>
            <p class="quote-text">${escapeHtml(t.quote)}</p>
            <div class="quote-author">
              <strong>${escapeHtml(t.author)}</strong>
              <span>${escapeHtml(t.role)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 * 3. HIRE ME PAGE RENDERER
 * ─────────────────────────────────────────────────────────────
 */
function renderHireMePage(profile) {
  const { user, profile: meta } = profile;
  const container = document.getElementById('hire-me-handoff-container');
  if (!container) return;

  const handle = meta.handle || 'ezhilarasan';
  const platformHandoffUrl = `/hire-me/${encodeURIComponent(handle)}`;

  container.innerHTML = `
    <div class="hire-handoff-card">
      <div class="hire-card-badge">
        <span class="status-dot pulse"></span>
        <span>${user.openToHire ? 'Available for Strategic &amp; Editorial Engagements' : 'Advisory Inquiries Only'}</span>
      </div>

      <div class="hire-hero-header">
        <h1 class="hire-title">Retain or Hire <span class="text-gradient">${escapeHtml(user.name)}</span></h1>
        <p class="hire-subtitle">
          ${escapeHtml(meta.headline)} &bull; ${escapeHtml(user.location || 'Chennai & Global Remote')}
        </p>
      </div>

      <div class="hire-pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3>Brand Voice Architecture</h3>
          <p>End-to-end messaging audits, cross-functional tone matrices, and comprehensive company voice systems.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <h3>Executive Ghostwriting &amp; Op-Eds</h3>
          <p>Translating executive vision into published thought leadership, op-eds, and conference keynote remarks.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h3>Editorial Systems &amp; Newsletters</h3>
          <p>Building high-retention publishing engines, Notion editorial pipelines, and audience growth assets.</p>
        </div>
      </div>

      <div class="hire-action-zone">
        <div class="hire-primary-box">
          <p class="hire-action-note">
            Official consulting retainers, advisory engagements, and verification inquiries are processed through the shared BEXO verified talent ecosystem.
          </p>
          <a href="${platformHandoffUrl}" class="btn btn-primary btn-lg hire-cta-button" id="bexo-platform-handoff-cta">
            <span>Proceed to BEXO Hiring Platform</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        <div class="hire-fallback-box">
          <span class="fallback-label">Direct Consultant Contact:</span>
          <div class="fallback-links">
            ${user.email ? `
              <a href="mailto:${escapeHtml(user.email)}?subject=Strategic Engagement Inquiry for ${encodeURIComponent(user.name)}" class="fallback-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Send Direct Email (${escapeHtml(user.email)})
              </a>
            ` : ''}
            ${user.phone ? `
              <a href="tel:${escapeHtml(user.phone.replace(/[^0-9+]/g, ''))}" class="fallback-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Office Phone
              </a>
            ` : ''}
            ${user.resumeUrl ? `
              <a href="${resolveAsset(user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="fallback-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Review Editorial Resume (PDF)
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Clean collection renderer: Hides section cleanly if collection is empty
 */
function renderCollection(containerId, items, renderFn) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (Array.isArray(items) && items.length > 0) {
    el.removeAttribute('hidden');
    el.innerHTML = renderFn(items);
  } else {
    el.setAttribute('hidden', '');
    el.innerHTML = '';
  }
}

/**
 * Newsletter subscription interaction
 */
function setupNewsletterForm() {
  const form = document.getElementById('home-newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const msg = document.getElementById('newsletter-status-msg');
    if (!input || !msg) return;

    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.className = 'newsletter-feedback error';
      msg.textContent = 'Please enter a valid email address.';
      return;
    }

    form.reset();
    msg.className = 'newsletter-feedback success';
    msg.textContent = '✓ You are on the dispatch list. Look for the next essay on Sunday.';
  });
}
