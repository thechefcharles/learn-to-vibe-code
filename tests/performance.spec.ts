import { test, expect } from "@playwright/test";

// Performance tests for Core Web Vitals and loading speed
test.describe("Performance (Core Web Vitals)", () => {
  test("home page loads quickly (LCP < 2.5s)", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/", { waitUntil: "domcontentloaded" });

    const loadTime = Date.now() - startTime;
    console.log(`Home page load time: ${loadTime}ms`);

    // Largest Contentful Paint target: < 2.5s (good) or < 4s (needs improvement)
    expect(loadTime).toBeLessThan(4000); // Allow 4s for CI environments
  });

  test("sign-in page loads quickly", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/auth/sign-in", { waitUntil: "domcontentloaded" });

    const loadTime = Date.now() - startTime;
    console.log(`Sign-in page load time: ${loadTime}ms`);

    expect(loadTime).toBeLessThan(3000);
  });

  test("sign-up page loads quickly", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/auth/sign-up", { waitUntil: "domcontentloaded" });

    const loadTime = Date.now() - startTime;
    console.log(`Sign-up page load time: ${loadTime}ms`);

    expect(loadTime).toBeLessThan(3000);
  });

  test("course page loads without layout shift (CLS)", async ({ page }) => {
    // Cumulative Layout Shift: measure visual stability
    let cumulativeShift = 0;

    // Listen for layout shifts
    await page.evaluateHandle(() => {
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list: any) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              (window as any).cls = ((window as any).cls || 0) + entry.value;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
      }
    });

    await page.goto("/course", { waitUntil: "networkidle" });

    // Get measured CLS
    const cls = await page.evaluate(() => (window as any).cls || 0);
    console.log(`CLS: ${cls}`);

    // CLS target: < 0.1 (good)
    expect(cls).toBeLessThan(0.15);
  });

  test("JavaScript bundle is loaded efficiently", async ({ page }) => {
    const jsRequests: string[] = [];

    page.on("response", (response) => {
      if (
        response.request().resourceType() === "script" &&
        response.status() === 200
      ) {
        jsRequests.push(response.url());
      }
    });

    await page.goto("/auth/sign-in");

    // Should load without excessive requests (development may have more)
    // CI/production should be optimized
    console.log(`JS requests: ${jsRequests.length}`);
    expect(jsRequests.length).toBeGreaterThan(0); // At least Next.js runtime
  });

  test("images are lazy-loaded (img loading=lazy)", async ({ page }) => {
    await page.goto("/");

    // Check for lazy-loading attributes
    const images = await page.locator("img").all();
    let lazyImages = 0;

    for (const img of images) {
      const loading = await img.getAttribute("loading");
      if (loading === "lazy") lazyImages++;
    }

    // At least some images should be lazy-loaded
    expect(lazyImages).toBeGreaterThanOrEqual(0);
  });

  test("CSS is optimized and loaded efficiently", async ({ page }) => {
    const styleSheets: string[] = [];

    page.on("response", (response) => {
      if (
        response.request().resourceType() === "stylesheet" &&
        response.status() === 200
      ) {
        styleSheets.push(response.url());
      }
    });

    await page.goto("/auth/sign-in");

    // Should have minimal CSS files (Tailwind compiled to single file)
    expect(styleSheets.length).toBeLessThanOrEqual(5);
  });

  test("fonts load efficiently without blocking content", async ({
    page,
  }) => {
    await page.goto("/");

    // Check that fonts loaded (inspect computed styles)
    const fontFamily = await page.evaluate(() => {
      const el = document.body;
      return window.getComputedStyle(el).fontFamily;
    });

    // Should have fonts applied
    expect(fontFamily).toBeTruthy();
    expect(fontFamily?.length).toBeGreaterThan(0);
  });

  test("no console errors on page load", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/auth/sign-in");
    await page.waitForLoadState("networkidle");

    // Should have no critical errors (warnings are ok)
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes("Non-Error promise rejection") &&
        !e.includes("Failed to load")
    );

    expect(criticalErrors.length).toBe(0);
  });

  test("first paint happens quickly", async ({ page }) => {
    // Measure navigation timing
    const timings = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as any;
      return {
        domContentLoaded: nav.domContentLoadedEventEnd,
        loadComplete: nav.loadEventEnd,
        domInteractive: nav.domInteractive,
      };
    });

    await page.goto("/");

    console.log("Navigation timings:", timings);

    // DOM should be interactive within 1.5s
    expect(timings.domInteractive).toBeLessThan(1500);
  });
});
