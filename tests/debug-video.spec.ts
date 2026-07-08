import { test } from '@playwright/test';

test('debug video component', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  
  // Check for any errors in console
  page.on('console', msg => console.log(`PAGE LOG [${msg.type()}]: ${msg.text()}`));
  
  // Look for the landing container
  const container = page.locator('[data-landing-container]');
  const containerCount = await container.count();
  console.log(`Landing container found: ${containerCount}`);
  
  // Get all elements in page
  const allElements = await page.locator('*').count();
  console.log(`Total elements on page: ${allElements}`);
  
  // Check for video anywhere
  const hasVideo = await page.evaluate(() => document.querySelector('video') !== null);
  console.log(`Video element in DOM: ${hasVideo}`);
  
  // Check the HTML
  const html = await page.content();
  const hasVideoTag = html.includes('<video');
  console.log(`<video tag in HTML: ${hasVideoTag}`);
});
