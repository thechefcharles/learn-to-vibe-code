import { test } from '@playwright/test';

test('full page debug', async ({ page }) => {
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', err => {
    errors.push(`PAGE ERROR: ${err.message}`);
  });
  
  const response = await page.goto('http://localhost:3008/landing-kids');
  await page.waitForTimeout(1000);
  
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.slice(0, 500));
  console.log('Body HTML (first 500 chars):', bodyHTML);
  
  const hasReactRoot = await page.evaluate(() => document.getElementById('__next') !== null);
  console.log('Has React root (#__next):', hasReactRoot);
  
  if (errors.length > 0) {
    console.log('Errors:', errors);
  } else {
    console.log('No console errors');
  }
});
