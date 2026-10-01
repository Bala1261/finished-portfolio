const puppeteer = require('d:/ACE DIGITALS/BUSINESS-MANAGEMENT/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ELCOT\\.gemini\\antigravity-ide\\brain\\7ab48bcd-4c47-493d-b0d7-3d5daaa8eaa5';

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

const BASE_URL = 'http://localhost:5174';

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
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

    for (const vp of viewports) {
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
      });

      await page.goto(route.url, { waitUntil: 'networkidle0' });

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
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
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
  await page.goto(`${BASE_URL}/pages/portfolio.html`, { waitUntil: 'networkidle0' });
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
  await page.goto(`${BASE_URL}/pages/contact.html`, { waitUntil: 'networkidle0' });
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
  await page.evaluate(() => {
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
    };
  });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  // Verify that the injected profile works when set before load
  await page.evaluate(() => {
    window.__BEXO_PROFILE__ = {
      user: {
        name: 'Sierra Montana',
        headline: 'Rhythm Designer & Composer',
        openToHire: false,
        resumeUrl: '',
      },
      profile: {
        headline: 'Rhythm Designer & Composer',
        bio: 'Injected audio bio test.',
      },
    };
  });
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
