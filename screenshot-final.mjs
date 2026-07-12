import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  // Jump to future lesson to show preview mode
  const lesson5Btn = await page.$$('button:has-text("Install Cursor")');
  if (lesson5Btn.length > 0) {
    await lesson5Btn[0].click();
    await page.waitForTimeout(800);
  }
  
  await page.screenshot({ path: '/tmp/final-working-feature.png' });
  console.log('✅ Final feature screenshot saved');
  
  await browser.close();
})();
