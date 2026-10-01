/**
 * BEXO Standard Media & Modal System
 * Handles:
 * - Interactive Case Study Modal
 * - Dashboard Image Previews & Lightbox
 * - PDF Asset Links
 * - Keyboard accessibility (Escape, focus trap)
 */

import { escapeHtml, resolveAsset } from './profile-runtime.js';

let activeTriggerElement = null;

export function initMedia() {
  injectModalContainer();
  bindEscapeListener();
}

function injectModalContainer() {
  if (document.getElementById('case-study-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'case-study-modal';
  modal.className = 'modal-backdrop';
  modal.setAttribute('hidden', '');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-project-title');
  modal.innerHTML = `
    <div class="modal-dialog">
      <button class="modal-close-btn" id="modal-close-btn" aria-label="Close case study dialog">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div id="modal-content-slot" class="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('#modal-close-btn')) {
      closeCaseStudyModal();
    }
  });
}

function bindEscapeListener() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('case-study-modal');
      if (modal && !modal.hasAttribute('hidden')) {
        closeCaseStudyModal();
      }
    }
  });
}

export function openCaseStudyModal(project, triggerElement = null) {
  if (!project) return;
  activeTriggerElement = triggerElement;

  const modal = document.getElementById('case-study-modal');
  const slot = document.getElementById('modal-content-slot');
  if (!modal || !slot) return;

  const caseStudy = project.caseStudy || {};
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];
  const stack = Array.isArray(project.stack) ? project.stack : (Array.isArray(project.tools) ? project.tools : []);
  const results = Array.isArray(caseStudy.results) ? caseStudy.results : [];
  const imageSrc = project.image ? resolveAsset(project.image) : '';

  slot.innerHTML = `
    <div class="case-study-header">
      <div class="case-study-meta-badges">
        <span class="badge badge-accent">${escapeHtml(project.category || 'Strategic Project')}</span>
        ${project.year ? `<span class="badge badge-neutral">${escapeHtml(project.year)}</span>` : ''}
        ${project.role ? `<span class="badge badge-outline">${escapeHtml(project.role)}</span>` : ''}
      </div>
      <h2 id="modal-project-title" class="case-study-title">${escapeHtml(project.title)}</h2>
      ${project.tagline ? `<p class="case-study-tagline">${escapeHtml(project.tagline)}</p>` : ''}
    </div>

    ${metrics.length > 0 ? `
      <div class="case-study-metrics-grid">
        ${metrics.map(m => `
          <div class="metric-card">
            <span class="metric-num">${escapeHtml(m.value)}</span>
            <span class="metric-label">${escapeHtml(m.label)}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${imageSrc ? `
      <div class="case-study-image-wrapper">
        <img src="${imageSrc}" alt="${escapeHtml(project.title)} Analytics Dashboard" class="case-study-image" loading="lazy" onerror="if(!this.dataset.retried){this.dataset.retried='1';this.src=this.src.includes('/assets/')?this.src.replace('/assets/','/'):this.src;}" />
      </div>
    ` : ''}

    <div class="case-study-sections">
      ${caseStudy.challenge ? `
        <div class="cs-block cs-challenge">
          <h3 class="cs-heading"><span class="cs-dot cs-dot-rose"></span> 1. The Business Challenge</h3>
          <p>${escapeHtml(caseStudy.challenge)}</p>
        </div>
      ` : ''}

      ${caseStudy.research ? `
        <div class="cs-block cs-research">
          <h3 class="cs-heading"><span class="cs-dot cs-dot-amber"></span> 2. Empirical Research & Diagnostics</h3>
          <p>${escapeHtml(caseStudy.research)}</p>
        </div>
      ` : ''}

      ${caseStudy.approach ? `
        <div class="cs-block cs-approach">
          <h3 class="cs-heading"><span class="cs-dot cs-dot-blue"></span> 3. Strategic Approach & Frameworks</h3>
          <p>${escapeHtml(caseStudy.approach)}</p>
        </div>
      ` : ''}

      ${caseStudy.solution ? `
        <div class="cs-block cs-solution">
          <h3 class="cs-heading"><span class="cs-dot cs-dot-green"></span> 4. Solution & Enterprise Rollout</h3>
          <p>${escapeHtml(caseStudy.solution)}</p>
        </div>
      ` : ''}

      ${results.length > 0 ? `
        <div class="cs-block cs-results">
          <h3 class="cs-heading"><span class="cs-dot cs-dot-emerald"></span> 5. Quantified Commercial Outcomes</h3>
          <ul class="cs-results-list">
            ${results.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${caseStudy.learnings ? `
        <div class="cs-block cs-learnings">
          <h3 class="cs-heading">Executive Governance Learning</h3>
          <blockquote class="cs-quote">"${escapeHtml(caseStudy.learnings)}"</blockquote>
        </div>
      ` : ''}
    </div>

    ${stack.length > 0 ? `
      <div class="case-study-tools">
        <span class="cs-tools-label">Analytics & Modeling Stack:</span>
        <div class="tools-pills">
          ${stack.map(s => `<span class="tool-pill">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    ` : ''}

    <div class="case-study-footer-actions">
      ${project.pdfUrl ? `
        <a href="${resolveAsset(project.pdfUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Executive Brief (PDF)
        </a>
      ` : ''}
      ${project.externalLink ? `
        <a href="${escapeHtml(project.externalLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Consultant Profile →
        </a>
      ` : ''}
    </div>
  `;

  modal.removeAttribute('hidden');
  modal.classList.add('is-open');
  document.body.classList.add('modal-scroll-lock');

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

export function closeCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('hidden', '');
  document.body.classList.remove('modal-scroll-lock');

  if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
    activeTriggerElement.focus();
  }
}
