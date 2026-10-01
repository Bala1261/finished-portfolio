/**
 * BEXO Media & Interactive Reader Module
 * Features:
 * - Editorial Article Reading Modal with scroll progress & pull-quotes
 * - Case Study Deep-Dive Modal
 * - Lightbox gallery & image previews
 * - Escape key closing & accessible focus restoration
 * - Resilient onerror image fallbacks
 */

import { getProfile, resolveAsset, escapeHtml } from './profile-runtime.js';

export function initMedia() {
  setupImageFallbacks();
  setupArticleModals();
  setupCaseStudyModals();
}

/**
 * Resilient image error handling to avoid broken image icons
 */
export function setupImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    if (img.dataset.hasFallback) return;
    img.dataset.hasFallback = 'true';
    
    img.addEventListener('error', function() {
      console.warn('Image failed to load:', this.src);
      // Fallback to SVG placeholder
      this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" fill="%23222"><rect width="800" height="500" fill="%23262626"/><text x="50%" y="50%" fill="%23888" font-family="sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">Editorial Media Asset</text></svg>';
    });
  });
}

function setupArticleModals() {
  let modalContainer = document.getElementById('bexo-article-modal');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'bexo-article-modal';
    modalContainer.className = 'bexo-modal-backdrop';
    modalContainer.setAttribute('hidden', '');
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');
    modalContainer.setAttribute('aria-labelledby', 'article-modal-title');
    modalContainer.innerHTML = `
      <div class="modal-dialog article-modal-dialog">
        <div class="reading-progress-track">
          <div class="reading-progress-bar" id="article-progress-bar"></div>
        </div>
        <button class="modal-close-btn" id="close-article-modal" aria-label="Close reading view">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="article-modal-scroll" id="article-modal-scroll-area">
          <div class="article-modal-content" id="article-modal-body"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modalContainer);
  }

  const closeBtn = document.getElementById('close-article-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeArticleModal());
  }

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeArticleModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalContainer.hasAttribute('hidden')) {
      closeArticleModal();
    }
  });

  // Track reading scroll progress
  const scrollArea = document.getElementById('article-modal-scroll-area');
  const progressBar = document.getElementById('article-progress-bar');
  if (scrollArea && progressBar) {
    scrollArea.addEventListener('scroll', () => {
      const maxScroll = scrollArea.scrollHeight - scrollArea.clientHeight;
      if (maxScroll > 0) {
        const pct = Math.min(100, Math.max(0, (scrollArea.scrollTop / maxScroll) * 100));
        progressBar.style.width = `${pct}%`;
      }
    });
  }

  // Delegated click on article read trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-article-id]');
    if (!trigger) return;
    e.preventDefault();
    const articleId = trigger.getAttribute('data-article-id');
    openArticleModal(articleId, trigger);
  });
}

let lastActiveTrigger = null;

export function openArticleModal(articleId, triggerElement = null) {
  const profile = getProfile();
  const article = profile.researchEntries.find(r => r.id === articleId);
  if (!article) return;

  lastActiveTrigger = triggerElement;
  const modal = document.getElementById('bexo-article-modal');
  const body = document.getElementById('article-modal-body');
  const scrollArea = document.getElementById('article-modal-scroll-area');
  const progressBar = document.getElementById('article-progress-bar');
  if (!modal || !body) return;

  const paragraphs = (article.body || article.excerpt)
    .split('\n\n')
    .filter(p => p.trim().length > 0)
    .map((p, idx) => {
      if (idx === 1 && article.body) {
        return `
          <blockquote class="editorial-pullquote">
            <p>"${escapeHtml(p)}"</p>
          </blockquote>
        `;
      }
      return `<p class="article-prose-p">${escapeHtml(p)}</p>`;
    })
    .join('');

  body.innerHTML = `
    <header class="article-modal-header">
      <div class="article-modal-meta">
        <span class="badge badge-accent">${escapeHtml(article.category || 'Essay')}</span>
        <span class="meta-dot">&bull;</span>
        <span class="meta-date">${escapeHtml(article.date || 'Published')}</span>
        <span class="meta-dot">&bull;</span>
        <span class="meta-read-time">${escapeHtml(article.readTime || '5 min read')}</span>
      </div>
      <h1 class="article-modal-title" id="article-modal-title">${escapeHtml(article.title)}</h1>
      <p class="article-modal-lead">${escapeHtml(article.excerpt)}</p>
      <div class="article-author-byline">
        <img src="${resolveAsset(profile.user.photoUrl)}" alt="${escapeHtml(profile.user.name)}" class="byline-avatar" />
        <div class="byline-info">
          <strong>${escapeHtml(profile.user.name)}</strong>
          <span>${escapeHtml(profile.profile.headline)}</span>
        </div>
      </div>
    </header>

    ${article.image ? `
      <figure class="article-modal-figure">
        <img src="${resolveAsset(article.image)}" alt="${escapeHtml(article.title)}" class="article-modal-img" />
      </figure>
    ` : ''}

    <div class="article-modal-prose">
      ${paragraphs}
    </div>

    <footer class="article-modal-footer">
      <div class="author-bio-card">
        <h3>About the Author</h3>
        <p>${escapeHtml(profile.profile.bio)}</p>
        <div class="author-actions">
          <a href="${resolveAsset(profile.user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Download Resume</a>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('close-article-modal').click(); window.location.href='${resolveAsset('pages/contact.html')}';">Start Conversation</button>
        </div>
      </div>
    </footer>
  `;

  if (scrollArea) scrollArea.scrollTop = 0;
  if (progressBar) progressBar.style.width = '0%';
  modal.removeAttribute('hidden');
  document.body.classList.add('modal-open');

  const closeBtn = document.getElementById('close-article-modal');
  if (closeBtn) closeBtn.focus();
  setupImageFallbacks();
}

export function closeArticleModal() {
  const modal = document.getElementById('bexo-article-modal');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.classList.remove('modal-open');
  if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
    lastActiveTrigger.focus();
  }
}

function setupCaseStudyModals() {
  let modalContainer = document.getElementById('bexo-case-modal');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'bexo-case-modal';
    modalContainer.className = 'bexo-modal-backdrop';
    modalContainer.setAttribute('hidden', '');
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');
    modalContainer.setAttribute('aria-labelledby', 'case-modal-title');
    modalContainer.innerHTML = `
      <div class="modal-dialog case-modal-dialog">
        <button class="modal-close-btn" id="close-case-modal" aria-label="Close case study view">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="case-modal-scroll">
          <div class="case-modal-content" id="case-modal-body"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modalContainer);
  }

  const closeBtn = document.getElementById('close-case-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeCaseModal());
  }

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeCaseModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalContainer.hasAttribute('hidden')) {
      closeCaseModal();
    }
  });

  // Delegated click on case study trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case-id]');
    if (!trigger) return;
    e.preventDefault();
    const caseId = trigger.getAttribute('data-case-id');
    openCaseModal(caseId, trigger);
  });
}

export function openCaseModal(caseId, triggerElement = null) {
  const profile = getProfile();
  const project = profile.projectEntries.find(p => p.id === caseId);
  if (!project) return;

  lastActiveTrigger = triggerElement;
  const modal = document.getElementById('bexo-case-modal');
  const body = document.getElementById('case-modal-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <header class="case-modal-header">
      <div class="case-meta-tags">
        <span class="badge badge-accent">${escapeHtml(project.category)}</span>
        <span class="meta-dot">&bull;</span>
        <span class="meta-client">Client: ${escapeHtml(project.client)}</span>
        <span class="meta-dot">&bull;</span>
        <span class="meta-year">${escapeHtml(project.year)}</span>
      </div>
      <h1 class="case-modal-title" id="case-modal-title">${escapeHtml(project.title)}</h1>
      <p class="case-modal-lead">${escapeHtml(project.summary || project.challenge)}</p>
    </header>

    ${project.image ? `
      <figure class="case-modal-figure">
        <img src="${resolveAsset(project.image)}" alt="${escapeHtml(project.title)}" class="case-modal-img" />
      </figure>
    ` : ''}

    <div class="case-modal-grid">
      <div class="case-detail-block">
        <h3 class="case-section-title">The Challenge</h3>
        <p>${escapeHtml(project.challenge)}</p>
      </div>

      <div class="case-detail-block">
        <h3 class="case-section-title">Strategic Approach</h3>
        <p>${escapeHtml(project.approach)}</p>
      </div>

      <div class="case-detail-block highlight-block">
        <h3 class="case-section-title">Measurable Outcomes</h3>
        <p>${escapeHtml(project.outcome)}</p>
      </div>
    </div>

    ${Array.isArray(project.deliverables) && project.deliverables.length > 0 ? `
      <div class="case-deliverables-wrap">
        <h4 class="deliverables-heading">Deliverables &amp; Artifacts</h4>
        <div class="deliverables-chips">
          ${project.deliverables.map(d => `<span class="deliverable-chip">${escapeHtml(d)}</span>`).join('')}
        </div>
      </div>
    ` : ''}

    <div class="case-modal-actions">
      ${project.pdfUrl ? `
        <a href="${resolveAsset(project.pdfUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Review Executive Brief (PDF)
        </a>
      ` : ''}
      <button class="btn btn-primary" onclick="document.getElementById('close-case-modal').click(); window.location.href='${resolveAsset('pages/contact.html')}';">
        Commission Similar Strategy &rarr;
      </button>
    </div>
  `;

  modal.removeAttribute('hidden');
  document.body.classList.add('modal-open');

  const closeBtn = document.getElementById('close-case-modal');
  if (closeBtn) closeBtn.focus();
  setupImageFallbacks();
}

export function closeCaseModal() {
  const modal = document.getElementById('bexo-case-modal');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.classList.remove('modal-open');
  if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
    lastActiveTrigger.focus();
  }
}
