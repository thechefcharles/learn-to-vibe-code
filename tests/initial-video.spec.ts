import { test } from '@playwright/test';

test('video shows on initial page load', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('[data-landing-container]', { timeout: 10000 });
  
  const container = page.locator('[data-landing-container]');
  const video = page.locator('video');
  
  // Check initial state
  const initialState = await container.evaluate((el: HTMLElement) => {
    const computed = window.getComputedStyle(el).backgroundColor;
    const inline = el.style.backgroundColor;
    const bg = el.style.background;
    return { computed, inline, bg };
  });
  
  const videoState = await video.first().evaluate((el: HTMLVideoElement) => ({
    playing: !el.paused,
    currentTime: el.currentTime,
  }));
  
  console.log('Initial container:', initialState);
  console.log('Video state:', videoState);
  
  if (initialState.inline === 'transparent' && videoState.playing) {
    console.log('✅ SUCCESS: Video playing on initial load!');
  } else {
    console.log('❌ FAIL: Video not playing on initial load');
  }
});
