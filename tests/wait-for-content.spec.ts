import { test } from '@playwright/test';

test('wait for page content', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  
  // Wait for headline to appear (up to 10 seconds)
  try {
    await page.waitForSelector('h1, [data-landing-container]', { timeout: 10000 });
    console.log('✓ Page content loaded');
  } catch (e) {
    console.log('✗ Page content did not load');
  }
  
  // Check for headline
  const h1 = await page.locator('h1');
  const h1Count = await h1.count();
  console.log(`H1 count: ${h1Count}`);
  
  if (h1Count > 0) {
    const text = await h1.first().textContent();
    console.log(`Headline: ${text}`);
  }
  
  // Check for video
  const video = await page.locator('video');
  const videoCount = await video.count();
  console.log(`Video count: ${videoCount}`);
  
  // Get page HTML length
  const html = await page.content();
  console.log(`Page HTML length: ${html.length}`);
});
