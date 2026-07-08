import { test } from '@playwright/test';

test('check page loads', async ({ page }) => {
  const response = await page.goto('http://localhost:3008/landing-kids');
  console.log(`Page status: ${response?.status()}`);
  
  // Look for headline
  const headline = page.locator('h1');
  const count = await headline.count();
  console.log(`H1 elements: ${count}`);
  
  if (count > 0) {
    const text = await headline.first().textContent();
    console.log(`Headline text: ${text}`);
  }
  
  // Check for FlatingCTA
  const cta = page.locator('text=Enroll');
  console.log(`Enroll button found: ${await cta.count() > 0}`);
});
