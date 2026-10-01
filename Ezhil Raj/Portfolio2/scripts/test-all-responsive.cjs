const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ELCOT\\.gemini\\antigravity-ide\\brain\\84c00e2d-e292-454a-a8f4-172d8035214e';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('--- 1. Testing Mobile Menu Drawer ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('#menu-toggle');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artifactDir, 'mobile_menu_open.png') });
  console.log('Captured mobile_menu_open.png');

  console.log('--- 2. Testing Portfolio on Desktop ---');
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://localhost:5173/pages/portfolio.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'portfolio_desktop.png') });
  console.log('Captured portfolio_desktop.png');

  console.log('--- 3. Testing Portfolio Case Study Modal ---');
  const modalTrigger = await page.$('.btn-outline');
  if (modalTrigger) {
    await modalTrigger.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactDir, 'portfolio_modal_desktop.png') });
    console.log('Captured portfolio_modal_desktop.png');
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('--- 4. Testing Portfolio on Mobile ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/pages/portfolio.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'portfolio_mobile.png') });
  console.log('Captured portfolio_mobile.png');

  console.log('--- 5. Testing Contact Page on Desktop ---');
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://localhost:5173/pages/contact.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'contact_desktop.png') });
  console.log('Captured contact_desktop.png');

  console.log('--- 6. Testing Contact Page on Mobile ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/pages/contact.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'contact_mobile.png') });
  console.log('Captured contact_mobile.png');

  console.log('--- 7. Testing Hire Me Page on Desktop ---');
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://localhost:5173/pages/hire-me.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'hire_me_desktop.png') });
  console.log('Captured hire_me_desktop.png');

  console.log('--- 8. Testing Hire Me Page on Mobile ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/pages/hire-me.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'hire_me_mobile.png') });
  console.log('Captured hire_me_mobile.png');

  await browser.close();
  console.log('All tests completed successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
