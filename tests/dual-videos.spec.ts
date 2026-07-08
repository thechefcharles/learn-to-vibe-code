import { test } from '@playwright/test';

test('dual video backgrounds work', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('video', { timeout: 10000 });
  
  const videos = page.locator('video');
  const videoCount = await videos.count();
  console.log(`Video elements: ${videoCount}`);
  
  // Check violet (default)
  const violetBg = await page.locator('[data-landing-container]').evaluate((el: HTMLElement) => 
    window.getComputedStyle(el).backgroundColor
  );
  const violetVideo = await videos.nth(0).evaluate((el: HTMLVideoElement) => ({
    src: el.querySelector('source')?.getAttribute('src'),
    playing: !el.paused,
  }));
  console.log('Initial (Violet):', { bg: violetBg, video: violetVideo });
  
  // Click sunset (orange)
  await page.locator('[title="Sunset"]').click();
  await page.waitForTimeout(500);
  
  const sunsetBg = await page.locator('[data-landing-container]').evaluate((el: HTMLElement) => 
    window.getComputedStyle(el).backgroundColor
  );
  const sunsetVideo = await videos.nth(1).evaluate((el: HTMLVideoElement) => ({
    src: el.querySelector('source')?.getAttribute('src'),
    playing: !el.paused,
  }));
  console.log('After Sunset click:', { bg: sunsetBg, video: sunsetVideo });
});
