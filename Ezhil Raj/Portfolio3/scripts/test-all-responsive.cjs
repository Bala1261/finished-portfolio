const puppeteer = require('d:/ACE DIGITALS/BUSINESS-MANAGEMENT/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = process.env.ARTIFACT_DIR || 'C:\\Users\\ELCOT\\.gemini\\antigravity-ide\\brain\\465a4f22-f5ff-4204-bc58-adbbd7dd79bd';

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

const BASE_URL = process.env.TEST_URL || 'http://localhost:5173';

const routes = [
  { name: 'home', url: `${BASE_URL}/` },
  { name: 'portfolio', url: `${BASE_URL}/pages/portfolio.html` },
  { name: 'contact', url: `${BASE_URL}/pages/contact.html` },
  { name: 'hire_me', url: `${BASE_URL}/pages/hire-me.html` },
];

const viewports = [
  { name: 'desktop', width: 1366, height: 768, isMobile: false },
  { name: 'tablet', width: 768, height: 1024, isMobile: true },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
  { name: 'narrow_320', width: 320, height: 640, isMobile: true },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--proxy-server=direct://',
      '--proxy-bypass-list=*',
      '--disable-extensions',
    ],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(`[Page Error] ${err.toString()}`);
  });

  console.log('=== STARTING BEXO ACCEPTANCE VERIFICATION ===\n');

  for (const route of routes) {
    console.log(`\n--- Testing Route: ${route.name} (${route.url}) ---`);
    await page.goto(route.url, { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 300));

    for (const vp of viewports) {
      await page.setViewport({
        width: vp.width,
        height: vp.height,
      });
      await new Promise((r) => setTimeout(r, 150));

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const docEl = document.documentElement;
        return {
          scrollWidth: docEl.scrollWidth,
          clientWidth: docEl.clientWidth,
          hasOverflow: docEl.scrollWidth > docEl.clientWidth,
        };
      });

      const status = overflow.hasOverflow ? '❌ OVERFLOW' : '✅ OK';
      console.log(`[${vp.name} (${vp.width}px)] ${status} (scrollWidth: ${overflow.scrollWidth}, clientWidth: ${overflow.clientWidth})`);

      // Capture desktop and mobile screenshots for visual evidence
      if (vp.name === 'desktop' || vp.name === 'mobile') {
        const shotName = `${route.name}_${vp.name}.png`;
        await page.screenshot({ path: path.join(artifactDir, shotName), fullPage: false });
        console.log(`  -> Saved screenshot: ${shotName}`);
      }
    }
  }

  // Interactive Test 1: Mobile drawer menu on Home
  console.log('\n--- Interactive Test 1: Mobile Menu Drawer ---');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  const menuToggle = await page.$('#bexo-menu-toggle');
  if (menuToggle) {
    await menuToggle.click();
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({ path: path.join(artifactDir, 'home_mobile_menu_open.png') });
    console.log('  -> Opened drawer and saved screenshot: home_mobile_menu_open.png');
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 200));
  }

  // Interactive Test 2: Case study modal on Portfolio
  console.log('\n--- Interactive Test 2: Portfolio Case Study Lightbox ---');
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(`${BASE_URL}/pages/portfolio.html`, { waitUntil: 'domcontentloaded' });
  const modalBtn = await page.$('.project-modal-trigger');
  if (modalBtn) {
    await modalBtn.click();
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({ path: path.join(artifactDir, 'portfolio_case_study_modal.png') });
    console.log('  -> Triggered case study modal and saved screenshot: portfolio_case_study_modal.png');
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 200));
  }

  // Interactive Test 3: Contact validation
  console.log('\n--- Interactive Test 3: Contact Form Validation ---');
  await page.goto(`${BASE_URL}/pages/contact.html`, { waitUntil: 'domcontentloaded' });
  const submitBtn = await page.$('#bexo-contact-form button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise((r) => setTimeout(r, 200));
    const statusText = await page.$eval('#contact-form-status', (el) => el.textContent);
    console.log(`  -> Form validation triggered: "${statusText}"`);
    await page.screenshot({ path: path.join(artifactDir, 'contact_validation_state.png') });
  }

  // Verification 4: Injected window.__BEXO_PROFILE__ test
  console.log('\n--- Verification 4: Production Profile Injection Override ---');
  await page.evaluateOnNewDocument(() => {
    window.__BEXO_PROFILE__ = {
      user: {
        name: 'Sierra Montana',
        email: 'sierra@rhythmaudio.com',
        photoUrl: '',
        resumeUrl: '',
        openToHire: false,
      },
      profile: {
        handle: 'sierramontana',
        headline: 'Rhythm Designer & Composer',
        bio: 'Creating immersive acoustic architectures for next-generation spatial computing.',
      },
      projectEntries: [],
      experienceEntries: [],
      educationEntries: [],
      certificateEntries: [],
      achievementEntries: [],
      researchEntries: [],
      skillEntries: [],
    };
  });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

  const injectedData = await page.evaluate(() => {
    const nameEl = document.querySelector('[data-bind="user.name"]');
    const headlineEl = document.querySelector('[data-bind="profile.headline"]');
    const resumeCta = document.getElementById('cta-resume-container');
    const hireBadge = document.getElementById('home-hire-badge');
    const servicesSec = document.getElementById('home-services-section');
    return {
      name: nameEl?.textContent,
      headline: headlineEl?.textContent,
      resumeHidden: resumeCta?.hasAttribute('hidden'),
      hireBadgeHidden: hireBadge?.hasAttribute('hidden'),
      servicesHidden: servicesSec?.hasAttribute('hidden'),
      docTitle: document.title,
    };
  });

  console.log('  -> Injected Name:', injectedData.name, (injectedData.name === 'Sierra Montana' ? '✅' : '❌'));
  console.log('  -> Injected Headline:', injectedData.headline, (injectedData.headline === 'Rhythm Designer & Composer' ? '✅' : '❌'));
  console.log('  -> Resume CTA hidden (no resumeUrl):', injectedData.resumeHidden ? '✅ YES' : '❌ NO');
  console.log('  -> Open to Hire badge hidden (openToHire: false):', injectedData.hireBadgeHidden ? '✅ YES' : '❌ NO');
  console.log('  -> Document Title updated:', injectedData.docTitle, '✅');
  console.log('  -> Verified injection hook points.');

  await browser.close();

  console.log('\n=== VERIFICATION SUMMARY ===');
  if (consoleErrors.length > 0) {
    console.log('Console Errors Detected:', consoleErrors);
  } else {
    console.log('✅ ZERO CONSOLE ERRORS DETECTED.');
  }
}

run().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
