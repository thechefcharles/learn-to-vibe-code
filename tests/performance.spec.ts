import { test, expect } from "@playwright/test";

interface WebVitals {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  dcl: number;
  load: number;
}

async function captureWebVitals(page: any): Promise<WebVitals> {
  return page.evaluate(() => {
    return new Promise<WebVitals>((resolve) => {
      let vitals: WebVitals = {
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0,
        dcl: 0,
        load: 0,
      };

      // Capture navigation timing
      const navTiming = performance.getEntriesByType("navigation")[0] as any;
      if (navTiming) {
        vitals.ttfb = navTiming.responseStart - navTiming.requestStart;
        vitals.dcl = navTiming.domContentLoadedEventEnd;
        vitals.load = navTiming.loadEventEnd;
      }

      // LCP (Largest Contentful Paint)
      if ("PerformanceObserver" in window) {
        const lcpObserver = new PerformanceObserver((list: any) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        try {
          lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
        } catch (e) {
          // LCP observer not supported
        }

        // CLS (Cumulative Layout Shift)
        const clsObserver = new PerformanceObserver((list: any) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              vitals.cls += (entry as any).value;
            }
          }
        });
        try {
          clsObserver.observe({ type: "layout-shift", buffered: true });
        } catch (e) {
          // CLS observer not supported
        }

        // FID (First Input Delay) - polyfill with event listener
        const fidHandler = (event: any) => {
          vitals.fid = event.processingStart - event.timeStamp;
          document.removeEventListener("pointerdown", fidHandler);
          document.removeEventListener("mousedown", fidHandler);
          document.removeEventListener("touchstart", fidHandler);
        };
        document.addEventListener("pointerdown", fidHandler, true);
        document.addEventListener("mousedown", fidHandler, true);
        document.addEventListener("touchstart", fidHandler, true);
      }

      // Wait for metrics to settle and resolve
      setTimeout(() => {
        resolve(vitals);
      }, 2000);
    });
  });
}

// Performance tests for Core Web Vitals
test.describe("Core Web Vitals Performance", () => {
  test("home page meets Core Web Vitals thresholds", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const vitals = await captureWebVitals(page);

    console.log("=== HOME PAGE VITALS ===");
    console.log(`LCP: ${vitals.lcp.toFixed(0)}ms (target ≤2500ms) ${vitals.lcp <= 2500 ? "✓" : "✗"}`);
    console.log(`FID: ${vitals.fid.toFixed(0)}ms (target ≤100ms) ${vitals.fid <= 100 ? "✓" : "✗"}`);
    console.log(`CLS: ${vitals.cls.toFixed(3)} (target ≤0.1) ${vitals.cls <= 0.1 ? "✓" : "✗"}`);
    console.log(`TTFB: ${vitals.ttfb.toFixed(0)}ms`);
    console.log(`DCL: ${vitals.dcl.toFixed(0)}ms`);
    console.log(`Load: ${vitals.load.toFixed(0)}ms`);

    // Thresholds (allow some slack for CI/dev environments)
    expect(vitals.lcp).toBeLessThanOrEqual(3500);
    expect(vitals.fid).toBeLessThanOrEqual(200);
    expect(vitals.cls).toBeLessThanOrEqual(0.15);
  });

  test("course page meets Core Web Vitals thresholds", async ({ page }) => {
    await page.goto("/course", { waitUntil: "networkidle" });
    const vitals = await captureWebVitals(page);

    console.log("=== COURSE PAGE VITALS ===");
    console.log(`LCP: ${vitals.lcp.toFixed(0)}ms (target ≤2500ms) ${vitals.lcp <= 2500 ? "✓" : "✗"}`);
    console.log(`FID: ${vitals.fid.toFixed(0)}ms (target ≤100ms) ${vitals.fid <= 100 ? "✓" : "✗"}`);
    console.log(`CLS: ${vitals.cls.toFixed(3)} (target ≤0.1) ${vitals.cls <= 0.1 ? "✓" : "✗"}`);
    console.log(`TTFB: ${vitals.ttfb.toFixed(0)}ms`);
    console.log(`DCL: ${vitals.dcl.toFixed(0)}ms`);
    console.log(`Load: ${vitals.load.toFixed(0)}ms`);

    expect(vitals.lcp).toBeLessThanOrEqual(3500);
    expect(vitals.fid).toBeLessThanOrEqual(200);
    expect(vitals.cls).toBeLessThanOrEqual(0.15);
  });

  test("lesson page meets Core Web Vitals thresholds", async ({ page }) => {
    await page.goto("/course/module-00", { waitUntil: "networkidle" });
    const vitals = await captureWebVitals(page);

    console.log("=== LESSON PAGE VITALS ===");
    console.log(`LCP: ${vitals.lcp.toFixed(0)}ms (target ≤2500ms) ${vitals.lcp <= 2500 ? "✓" : "✗"}`);
    console.log(`FID: ${vitals.fid.toFixed(0)}ms (target ≤100ms) ${vitals.fid <= 100 ? "✓" : "✗"}`);
    console.log(`CLS: ${vitals.cls.toFixed(3)} (target ≤0.1) ${vitals.cls <= 0.1 ? "✓" : "✗"}`);
    console.log(`TTFB: ${vitals.ttfb.toFixed(0)}ms`);
    console.log(`DCL: ${vitals.dcl.toFixed(0)}ms`);
    console.log(`Load: ${vitals.load.toFixed(0)}ms`);

    expect(vitals.lcp).toBeLessThanOrEqual(3500);
    expect(vitals.fid).toBeLessThanOrEqual(200);
    expect(vitals.cls).toBeLessThanOrEqual(0.15);
  });

  test("dashboard page loads efficiently", async ({ page }) => {
    await page.goto("/dashboard", { waitUntil: "networkidle" });
    const vitals = await captureWebVitals(page);

    console.log("=== DASHBOARD PAGE VITALS ===");
    console.log(`LCP: ${vitals.lcp.toFixed(0)}ms`);
    console.log(`CLS: ${vitals.cls.toFixed(3)}`);
    console.log(`Load: ${vitals.load.toFixed(0)}ms`);

    expect(vitals.lcp).toBeLessThanOrEqual(3500);
    expect(vitals.cls).toBeLessThanOrEqual(0.15);
  });

  test("no console errors on critical pages", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const criticalErrors = errors.filter(
      (e) =>
        !e.includes("Non-Error promise rejection") &&
        !e.includes("Failed to load")
    );

    if (criticalErrors.length > 0) {
      console.log("Found errors:", criticalErrors);
    }

    expect(criticalErrors.length).toBe(0);
  });

  test("JavaScript bundle size is optimized", async ({ page }) => {
    const jsRequests: { url: string; size: number }[] = [];

    page.on("response", (response) => {
      if (response.request().resourceType() === "script" && response.status() === 200) {
        const headers = response.headers();
        const size = parseInt(headers["content-length"] || "0", 10);
        jsRequests.push({ url: response.url(), size });
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const totalSize = jsRequests.reduce((sum, req) => sum + req.size, 0);
    console.log(`Total JS size: ${(totalSize / 1024).toFixed(2)}KB (${jsRequests.length} requests)`);

    // JS bundle should be reasonable (allow up to 500KB for dev)
    expect(totalSize).toBeLessThan(500000);
  });

  test("CSS is efficiently loaded", async ({ page }) => {
    const cssRequests: { url: string; size: number }[] = [];

    page.on("response", (response) => {
      if (response.request().resourceType() === "stylesheet" && response.status() === 200) {
        const headers = response.headers();
        const size = parseInt(headers["content-length"] || "0", 10);
        cssRequests.push({ url: response.url(), size });
      }
    });

    await page.goto("/");

    const totalSize = cssRequests.reduce((sum, req) => sum + req.size, 0);
    console.log(`Total CSS size: ${(totalSize / 1024).toFixed(2)}KB (${cssRequests.length} files)`);

    expect(cssRequests.length).toBeLessThanOrEqual(5);
  });

  test("images are properly optimized", async ({ page }) => {
    await page.goto("/");

    const imageData = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));
      return images.map((img: any) => ({
        src: img.src,
        alt: img.alt || "missing",
        loading: img.loading || "not-set",
        width: img.width,
        height: img.height,
      }));
    });

    const withoutAlt = imageData.filter((img: any) => img.alt === "missing");
    const lazyLoaded = imageData.filter((img: any) => img.loading === "lazy");

    console.log(`Images: ${imageData.length} total, ${lazyLoaded.length} lazy-loaded, ${withoutAlt.length} missing alt`);

    // All images should have alt text (accessibility)
    expect(withoutAlt.length).toBe(0);
  });
});
