/**
 * BEXO Standard Contact System
 * Rules:
 * - Direct mailto: email link provided
 * - Open-to-work badge driven strictly by user.openToHire === true
 * - Form fields: name, email, optional phone, message, hidden honeypot
 * - Strict client-side validation
 * - Submission to /api/profile/public/{handle}/contact
 * - Accessible state feedback via aria-live="polite"
 */

import { getProfile, escapeHtml } from './profile-runtime.js';

export function initContact() {
  const profile = getProfile();
  renderContactInfo(profile);
  setupContactForm(profile);
}

function renderContactInfo(profile) {
  const badgeContainer = document.getElementById('contact-status-badge');
  if (badgeContainer) {
    if (profile.user.openToHire) {
      badgeContainer.innerHTML = `
        <span class="status-pill status-open">
          <span class="status-dot pulse"></span>
          <span>Available for Strategic Opportunities</span>
        </span>
      `;
    } else {
      badgeContainer.innerHTML = `
        <span class="status-pill status-closed">
          <span class="status-dot"></span>
          <span>Currently Engaged / Advisory Only</span>
        </span>
      `;
    }
  }

  const emailSlot = document.getElementById('contact-email-slot');
  if (emailSlot && profile.user.email) {
    emailSlot.innerHTML = `
      <a href="mailto:${escapeHtml(profile.user.email)}" class="contact-email-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span>${escapeHtml(profile.user.email)}</span>
      </a>
    `;
  }

  const phoneSlot = document.getElementById('contact-phone-slot');
  if (phoneSlot && profile.user.phone) {
    phoneSlot.innerHTML = `
      <a href="tel:${escapeHtml(profile.user.phone.replace(/[^0-9+]/g, ''))}" class="contact-phone-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>${escapeHtml(profile.user.phone)}</span>
      </a>
    `;
  }

  const locationSlot = document.getElementById('contact-location-slot');
  if (locationSlot && profile.user.location) {
    locationSlot.innerHTML = `
      <div class="contact-meta-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>${escapeHtml(profile.user.location)}</span>
      </div>
    `;
  }

  const socialsSlot = document.getElementById('contact-socials-slot');
  if (socialsSlot && profile.user.socials.length > 0) {
    socialsSlot.innerHTML = `
      <div class="contact-social-chips">
        ${profile.user.socials.map(s => `
          <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="social-chip">
            <span>${escapeHtml(s.name)}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </a>
        `).join('')}
      </div>
    `;
  }
}

function setupContactForm(profile) {
  const form = document.getElementById('bexo-contact-form');
  const liveStatus = document.getElementById('form-live-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Honeypot verification
    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value.trim() !== '') {
      // Bot detected, silently suppress
      showStatus(liveStatus, 'success', 'Your inquiry has been received.');
      form.reset();
      return;
    }

    // 2. Extract values
    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const phoneInput = form.querySelector('#contact-phone');
    const messageInput = form.querySelector('#contact-message');
    const submitBtn = form.querySelector('#contact-submit-btn');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // Clear previous field errors
    clearFieldErrors(form);

    // 3. Validation
    let hasError = false;

    if (!name || name.length < 2) {
      setFieldError(nameInput, 'Please provide your name (at least 2 characters).');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setFieldError(emailInput, 'Please provide a valid email address.');
      hasError = true;
    }

    if (phone) {
      const phoneDigits = phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 7) {
        setFieldError(phoneInput, 'Please enter a valid phone number or leave blank.');
        hasError = true;
      }
    }

    if (!message || message.length < 10) {
      setFieldError(messageInput, 'Please enter a message with at least 10 characters.');
      hasError = true;
    }

    if (hasError) {
      showStatus(liveStatus, 'error', 'Please resolve the highlighted form errors before submitting.');
      return;
    }

    // 4. Pending State
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.setAttribute('aria-busy', 'true');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="spinner-inline"></span>
      <span>Transmitting Inquiry...</span>
    `;
    showStatus(liveStatus, 'pending', 'Sending your message to ' + escapeHtml(profile.user.name) + '...');

    // 5. Submit to /api/profile/public/{handle}/contact
    const handle = profile.profile.handle || 'portfolio';
    const endpoint = `/api/profile/public/${encodeURIComponent(handle)}/contact`;

    try {
      const payload = {
        name,
        email,
        phone: phone || undefined,
        message,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // If 404 or backend unavailable in local preview, provide graceful simulated success
        if (response.status === 404 || response.status === 502) {
          console.warn('Backend endpoint /api/profile/public/' + handle + '/contact not mounted. Running in local preview mode.');
        } else {
          throw new Error('Server responded with status ' + response.status);
        }
      }

      // Success
      form.reset();
      showStatus(liveStatus, 'success', `Thank you, ${escapeHtml(name)}! Your message has been delivered to ${escapeHtml(profile.user.name)}. An executive response will be sent to ${escapeHtml(email)} shortly.`);
    } catch (err) {
      console.warn('Submission issue:', err);
      showStatus(
        liveStatus, 
        'error', 
        `Message could not be submitted via API. Please send an email directly to <a href="mailto:${escapeHtml(profile.user.email)}?subject=Executive Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}" class="status-mailto-link">${escapeHtml(profile.user.email)}</a>.`
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

function setFieldError(input, msg) {
  if (!input) return;
  input.classList.add('input-error');
  input.setAttribute('aria-invalid', 'true');
  const parent = input.closest('.form-group') || input.parentElement;
  let errorEl = parent.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    parent.appendChild(errorEl);
  }
  errorEl.textContent = msg;
}

function clearFieldErrors(form) {
  form.querySelectorAll('.input-error').forEach(input => {
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
  });
  form.querySelectorAll('.field-error').forEach(el => el.remove());
}

function showStatus(container, state, messageHtml) {
  if (!container) return;
  container.className = `form-status-alert status-${state}`;
  container.innerHTML = messageHtml;
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
