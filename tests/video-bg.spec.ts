import { test, expect } from '@playwright/test';

test('video background renders with violet theme', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  
  // Check if video element exists
  const video = page.locator('video');
  const videoCount = await video.count();
  console.log(`Video elements found: ${videoCount}`);
  
  if (videoCount > 0) {
    // Get video attributes
    const src = await video.first().locator('source').getAttribute('src');
    console.log(`✓ Video source: ${src}`);
    
    // Check initial state
    const initialState = await video.first().evaluate((el: HTMLVideoElement) => {
      const style = window.getComputedStyle(el);
      return {
        visibility: style.visibility,
        opacity: style.opacity,
        display: style.display,
        position: style.position,
      };
    });
    console.log(`Initial state:`, initialState);
    
    // Click violet theme
    const violetBtn = page.locator('button[title="Violet"]');
    await violetBtn.click();
    await page.waitForTimeout(600);
    
    // Check state after click
    const afterState = await video.first().evaluate((el: HTMLVideoElement) => {
      const style = window.getComputedStyle(el);
      return {
        visibility: style.visibility,
        opacity: style.opacity,
        display: style.display,
        isPlaying: !el.paused,
        currentTime: el.currentTime,
        duration: el.duration,
      };
    });
    console.log(`After violet click:`, afterState);
  } else {
    console.log('❌ No video elements found');
  }
});
