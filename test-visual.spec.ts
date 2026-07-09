import { test } from '@playwright/test';

test('visual - take screenshot of landing page', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForLoadState('networkidle');
  
  // Get arc widget bounds
  const arcTitle = page.locator('text=16 Module Learning Path');
  const arcWidget = arcTitle.locator('../..').first();
  const arcBounds = await arcWidget.boundingBox();
  
  console.log('Arc Widget Bounds:', arcBounds);
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/landing-kids-current.png', fullPage: true });
  console.log('Screenshot saved to /tmp/landing-kids-current.png');
});
