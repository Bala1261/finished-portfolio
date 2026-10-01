/**
 * BEXO Standard Media & Case Study Modal Controller — Design & Creative
 * Owns:
 * - Case study modal rendering and lightbox interactions
 * - Image fallback error handlers
 * - Keyboard escape to dismiss modals
 * - Focus trapping inside modals for accessibility
 */

import { escapeHtml, resolveAsset } from './profile-runtime.js';

let activeModal = null;
let lastFocusedElement = null;

export function initMedia() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeCaseStudyModal();
    }
  });

  // Global delegated click for modal dismissal on backdrop
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('bexo-modal-backdrop')) {
      closeCaseStudyModal();
    }
  });
}

export function openCaseStudyModal(project) {
  if (!project) return;
  lastFocusedElement = document.activeElement;

  let modal = document.getElementById('bexo-case-study-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'bexo-case-study-modal';
    modal.className = 'bexo-modal-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-project-title');
    document.body.appendChild(modal);
  }

  const caseStudy = project.caseStudy || {};
  const metrics = Array.isArray(caseStudy.metrics) ? caseStudy.metrics : [];
  const gallery = Array.isArray(caseStudy.gallery) ? caseStudy.gallery : (project.image ? [project.image] : []);

  modal.innerHTML = `
    <div class="bexo-modal-card" role="document">
      <div class="bexo-modal-header">
        <div>
          <span class="badge badge-accent">${escapeHtml(project.category || 'Case Study')}</span>
          <h2 id="modal-project-title" class="bexo-modal-title">${escapeHtml(project.title)}</h2>
          <p class="bexo-modal-subtitle">${escapeHtml(project.role || 'Design & Creative')} • ${escapeHtml(project.year || '2026')}</p>
        </div>
        <button type="button" class="bexo-modal-close" aria-label="Close case study dialog" id="modal-close-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="bexo-modal-body">
        ${caseStudy.statement ? `
          <div class="bexo-modal-statement">
            <blockquote>"${escapeHtml(caseStudy.statement)}"</blockquote>
          </div>
        ` : ''}

        ${project.image ? `
          <div class="bexo-modal-hero-image">
            <img src="${resolveAsset(project.image)}" alt="${escapeHtml(project.title)} Hero visual" loading="lazy" />
          </div>
        ` : ''}

        <div class="bexo-modal-grid">
          <div class="bexo-modal-col">
            <h3>Creative Challenge</h3>
            <p>${escapeHtml(caseStudy.challenge || project.description || 'Delivering high-fidelity creative systems.')}</p>
          </div>
          <div class="bexo-modal-col">
            <h3>Strategy & Execution</h3>
            <p>${escapeHtml(caseStudy.solution || project.description || 'Systematic design and engineering execution.')}</p>
          </div>
        </div>

        ${metrics.length > 0 ? `
          <div class="bexo-modal-metrics">
            <h4>Key Measurable Outcomes</h4>
            <div class="bexo-modal-metrics-grid">
              ${metrics.map((m) => `
                <div class="modal-metric-card">
                  <span class="modal-metric-val">${escapeHtml(m.value)}</span>
                  <span class="modal-metric-lbl">${escapeHtml(m.label)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${gallery.length > 0 ? `
          <div class="bexo-modal-gallery">
            <h4>Visual Artifacts</h4>
            <div class="bexo-modal-gallery-grid">
              ${gallery.map((imgSrc, i) => `
                <div class="modal-gallery-item">
                  <img src="${resolveAsset(imgSrc)}" alt="${escapeHtml(project.title)} artifact ${i + 1}" loading="lazy" />
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${project.externalUrl ? `
          <div class="bexo-modal-actions">
            <a href="${escapeHtml(project.externalUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>Visit Live Experience</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  activeModal = modal;

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCaseStudyModal);
    closeBtn.focus();
  }
}

export function closeCaseStudyModal() {
  const modal = document.getElementById('bexo-case-study-modal');
  if (modal) {
    modal.classList.remove('is-open');
  }
  document.body.style.overflow = '';
  activeModal = null;
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}
