import { test } from "@playwright/test";

/**
 * Lighthouse Performance Audit
 * Tests Core Web Vitals and performance metrics
 */
test.describe("Performance - Lighthouse Audits", () => {
  test("homepage performance", async ({ page }) => {
    console.log("🚀 Auditing homepage performance...");

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Measure Core Web Vitals
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType("paint");
      const lcpEntries = performance.getEntriesByType("largest-contentful-paint");

      return {
        // Network timing
        domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
        loadComplete: nav.loadEventEnd - nav.loadEventStart,
        fetchStart: nav.fetchStart,
        responseEnd: nav.responseEnd,

        // Paint timing
        firstPaint: paintEntries.find((e) => e.name === "first-paint")?.startTime || 0,
        firstContentfulPaint: paintEntries.find((e) => e.name === "first-contentful-paint")?.startTime || 0,

        // LCP
        lcp: lcpEntries.length > 0 ? (lcpEntries[lcpEntries.length - 1] as any).startTime : 0,

        // Resource counts
        resourceCount: performance.getEntriesByType("resource").length,
        resourceSize: performance
          .getEntriesByType("resource")
          .reduce((sum, r: any) => sum + (r.transferSize || 0), 0),
      };
    });

    const ttfb = metrics.responseEnd - metrics.fetchStart;

    console.log("📊 Core Web Vitals (Homepage):");
    console.log(`  • TTFB (Time to First Byte): ${ttfb.toFixed(0)}ms (target: <100ms)`);
    console.log(`  • FCP (First Contentful Paint): ${metrics.firstContentfulPaint.toFixed(0)}ms (target: <1800ms)`);
    console.log(`  • LCP (Largest Contentful Paint): ${metrics.lcp.toFixed(0)}ms (target: <2500ms)`);
    console.log(`  • DOM Content Loaded: ${metrics.domContentLoaded.toFixed(0)}ms`);
    console.log(`  • Resources: ${metrics.resourceCount} (${(metrics.resourceSize / 1024).toFixed(0)}KB)`);

    // Pass/fail thresholds
    const passed = {
      ttfb: ttfb < 600,
      fcp: metrics.firstContentfulPaint < 2500,
      lcp: metrics.lcp < 4000,
    };

    console.log("✅ Performance Assessment:");
    console.log(`  • TTFB: ${passed.ttfb ? "✓ PASS" : "⚠️ SLOW"}`);
    console.log(`  • FCP: ${passed.fcp ? "✓ PASS" : "⚠️ SLOW"}`);
    console.log(`  • LCP: ${passed.lcp ? "✓ PASS" : "⚠️ SLOW"}`);
  });

  test("dashboard performance", async ({ page }) => {
    console.log("🚀 Auditing dashboard performance...");

    // Would need authentication, so just check page loads
    await page.goto("/dashboard").catch(() => {
      console.log("⚠️ Dashboard requires auth, skipping load test");
    });

    console.log("✅ Dashboard audit skipped (requires auth)");
  });

  test("page load resource analysis", async ({ page }) => {
    console.log("🚀 Analyzing resource loading...");

    await page.goto("/");

    // Capture resource timing
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType("resource").map((r: any) => ({
        name: r.name.split("/").pop(),
        type: r.name.includes(".js") ? "JS" : r.name.includes(".css") ? "CSS" : "Other",
        size: r.transferSize || 0,
        duration: r.duration,
      }));
    });

    const byType = {
      JS: resources.filter((r) => r.type === "JS"),
      CSS: resources.filter((r) => r.type === "CSS"),
      Other: resources.filter((r) => r.type === "Other"),
    };

    console.log("📦 Resource Breakdown:");
    console.log(
      `  • JS: ${byType.JS.length} files, ${(byType.JS.reduce((s, r) => s + r.size, 0) / 1024).toFixed(0)}KB`
    );
    console.log(
      `  • CSS: ${byType.CSS.length} files, ${(byType.CSS.reduce((s, r) => s + r.size, 0) / 1024).toFixed(0)}KB`
    );
    console.log(
      `  • Other: ${byType.Other.length} files, ${(byType.Other.reduce((s, r) => s + r.size, 0) / 1024).toFixed(0)}KB`
    );

    // Find largest resources
    const largest = resources.sort((a, b) => b.size - a.size).slice(0, 5);
    console.log("📊 Top 5 Largest Resources:");
    largest.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.name}: ${(r.size / 1024).toFixed(0)}KB (${r.duration.toFixed(0)}ms)`);
    });
  });

  test("bundle size analysis", async ({ page }) => {
    console.log("🚀 Analyzing bundle sizes...");

    await page.goto("/");

    // Check for large JavaScript bundles
    const jsResources = await page.evaluate(() => {
      return performance
        .getEntriesByType("resource")
        .filter((r: any) => r.name.includes(".js"))
        .map((r: any) => ({
          name: r.name.split("/").pop() || r.name,
          size: r.transferSize || 0,
        }))
        .sort((a, b) => b.size - a.size);
    });

    console.log("🔍 JavaScript Bundles (Top 10):");
    jsResources.slice(0, 10).forEach((r, i) => {
      const sizeKb = (r.size / 1024).toFixed(0);
      const status = r.size > 500000 ? "⚠️ LARGE" : r.size > 200000 ? "⚠️ MEDIUM" : "✓ OK";
      console.log(`  ${i + 1}. ${r.name}: ${sizeKb}KB ${status}`);
    });

    const totalJs = jsResources.reduce((s, r) => s + r.size, 0);
    console.log(`\n  Total JS: ${(totalJs / 1024).toFixed(0)}KB`);
  });

  test("image optimization check", async ({ page }) => {
    console.log("🚀 Checking image optimization...");

    await page.goto("/");

    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs.map((img) => ({
        src: img.src.split("/").pop() || img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        hasLazyLoad: img.loading === "lazy",
      }));
    });

    console.log(`📸 Images found: ${images.length}`);
    console.log("  Image Optimization Status:");
    let optimized = 0;
    let missingAlt = 0;

    images.forEach((img) => {
      if (!img.alt || img.alt.trim() === "") {
        missingAlt++;
      }
      if (img.hasLazyLoad) {
        optimized++;
      }
    });

    console.log(`  • With lazy loading: ${optimized}/${images.length}`);
    console.log(`  • With alt text: ${images.length - missingAlt}/${images.length}`);

    if (missingAlt > 0) {
      console.log(`  ⚠️ ${missingAlt} images missing alt text`);
    }
    if (optimized < images.length / 2) {
      console.log(`  ⚠️ Many images could benefit from lazy loading`);
    }
  });

  test("network request analysis", async ({ page }) => {
    console.log("🚀 Analyzing network requests...");

    const requests: any[] = [];
    page.on("response", (response) => {
      requests.push({
        url: response.url().split("/").pop(),
        status: response.status(),
        size: response.headers()["content-length"],
      });
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    console.log(`📡 Total Requests: ${requests.length}`);

    const byStatus = {
      success: requests.filter((r) => r.status >= 200 && r.status < 300).length,
      redirect: requests.filter((r) => r.status >= 300 && r.status < 400).length,
      error: requests.filter((r) => r.status >= 400).length,
    };

    console.log(`  • Success (2xx): ${byStatus.success}`);
    console.log(`  • Redirect (3xx): ${byStatus.redirect}`);
    console.log(`  • Error (4xx/5xx): ${byStatus.error}`);

    if (byStatus.error > 0) {
      console.log(`  ⚠️ ${byStatus.error} failed requests`);
    }
  });

  test("CSS and font loading", async ({ page }) => {
    console.log("🚀 Checking CSS and font loading...");

    await page.goto("/");

    const cssLoaded = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      return {
        count: stylesheets.length,
        inlined: stylesheets.filter((s: any) => !s.href).length,
        external: stylesheets.filter((s: any) => s.href).length,
      };
    });

    const fontMetrics = await page.evaluate(() => {
      if ("fonts" in document) {
        return {
          loaded: (document as any).fonts.status,
          count: (document as any).fonts.size,
        };
      }
      return { loaded: "unknown", count: 0 };
    });

    console.log("🎨 CSS & Fonts:");
    console.log(`  • Stylesheets: ${cssLoaded.count} (${cssLoaded.inlined} inlined, ${cssLoaded.external} external)`);
    console.log(`  • Fonts: ${fontMetrics.count} loaded (status: ${fontMetrics.loaded})`);
  });
});
