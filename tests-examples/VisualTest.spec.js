const {test, expect} = require('@playwright/test');

// npx playwright test VisualTest.spec.js --headed

test('Screenshot and Visual comparison test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: "screenshot.png" });
    await expect(page.locator("#displayed-text")).toBeHidden();
    
});

test('Visual test', async ({ page }) => {
    await page.goto('https://www.rediff.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png', { maxDiffPixelRatio: 0.1 });
});