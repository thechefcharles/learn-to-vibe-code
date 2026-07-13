import { chromium } from 'playwright';

const accounts = [
  { email: 'kid@test.com', password: 'Portalquest123$$', label: 'kid' },
  { email: 'adult@test.com', password: 'Portalquest123$$', label: 'adult' },
  { email: 'charlieforeman77@gmail.com', password: 'Portalquest123$$', label: 'gmail' },
];

(async () => {
  const browser = await chromium.launch();
  
  for (const acc of accounts) {
    const page = await browser.newPage();
    
    try {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Screenshotting ${acc.label} account...`);
      console.log('='.repeat(60));
      
      // Sign in
      await page.goto('http://localhost:3008/auth/sign-in', { waitUntil: 'domcontentloaded' });
      await page.fill('input[type="email"]', acc.email);
      await page.fill('input[type="password"]', acc.password);
      
      const signInBtn = await page.locator('button').filter({ hasText: 'Sign In' }).first();
      await signInBtn.click();
      
      await page.waitForTimeout(2500);
      
      // Go to lesson
      await page.goto('http://localhost:3008/course/00', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      
      // Take screenshot
      const filename = `/tmp/${acc.label}-page.png`;
      await page.screenshot({ path: filename });
      console.log(`✓ Screenshot saved: ${filename}`);
      
      // Check page content for file paths
      const bodyText = await page.locator('body').textContent();
      if (bodyText.includes('/var/folders')) {
        console.log('⚠️  WARNING: File paths found in page content!');
        // Find the section with the path
        const lines = bodyText.split('\n');
        const pathLines = lines.filter(l => l.includes('/var/folders'));
        console.log('File paths on page:');
        pathLines.slice(0, 5).forEach(p => console.log(`  ${p.trim().substring(0, 100)}`));
      } else {
        console.log('✓ No file paths in content');
      }
      
    } catch (error) {
      console.error(`Error with ${acc.label}:`, error.message.split('\n')[0]);
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
  console.log('\n✓ All screenshots complete');
})();
