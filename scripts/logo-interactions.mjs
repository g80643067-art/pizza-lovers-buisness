import { chromium } from "playwright";

const targetUrl = process.argv[2];
if (!targetUrl) {
  throw new Error("Usage: node scripts/logo-interactions.mjs <preview-url>");
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

try {
  await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 30_000 });
  await page.locator('header .brand-mark').waitFor({ state: "visible", timeout: 10_000 });

  await page.locator('header .nav-links a[href="#menu"]').click();
  if (!page.url().includes("#menu")) throw new Error("Menu navigation did not update the URL hash");

  await page.locator("header .nav-order").click();
  await page.locator(".cart-drawer").waitFor({ state: "visible", timeout: 10_000 });
  await page.locator(".cart-close").click();
  await page.locator(".cart-drawer").waitFor({ state: "hidden", timeout: 10_000 });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.locator('header .brand-mark').waitFor({ state: "visible", timeout: 10_000 });
  await page.locator(".mobile-menu-button").click();
  await page.locator(".mobile-menu-purchase").click();
  await page.locator(".cart-drawer").waitFor({ state: "visible", timeout: 10_000 });

  console.log(JSON.stringify({
    logoVisible: true,
    menuNavigation: true,
    desktopOrderTrigger: true,
    mobileOrSecondaryOrderTrigger: true,
    cartDrawerOpened: true,
  }));
} finally {
  await browser.close();
}
