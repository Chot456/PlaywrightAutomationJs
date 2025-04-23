const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage.js');
const { DashboardPage } = require('../pageObjects/DashboardPage.js');
const { NavigationPage } = require('../pageObjects/NavigationPage.js');
const { CartPage } = require('../pageObjects/CartPage.js');
const { CheckoutPage } = require('../pageObjects/CheckoutPage.js');
const { OrderCompletePage } = require('../pageObjects/OrderCompletePage.js');

// npx playwright test UIBasicTest.spec.js --headed
// npx playwright show-report

test('Registration test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('.text-reset').click();
    await page.locator("#firstName").fill("Gray");
    await page.locator("#lastName").fill("Smith");
    await page.locator("#userEmail").fill(""+Math.random()+"@gmail.com");
    await page.locator(".custom-select").click();
    await page.selectOption('.custom-select', 'Doctor');
    await page.locator("#userMobile").fill("1234567890");
    await page.click('input[type="radio"][value="Male"]');
    await page.locator("#userPassword").fill("P@ssword321");
    await page.locator("#confirmPassword").fill("P@ssword321");
    await page.locator('input[type="checkbox"]').check();
    await page.locator("#login").click();
    await page.waitForTimeout(3000);
    await expect(page.locator('h1.headcolor')).toBeVisible();
    await page.screenshot({ path: ""+Math.random()+"screenshot.png" });
    
});

test.only('Login and Purchase order test', async ({ page }) => {
    const projectName = 'ADIDAS ORIGINAL';
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const navigationPage = new NavigationPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderCompletePage = new OrderCompletePage(page, expect);

    await loginPage.goTo();
    await loginPage.validLogin("john11@gmail.com", "P@ssword321");
    await dashboardPage.clickAddToCartButton(projectName);
    await navigationPage.goToCartPage();
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCheckoutForm('123', 'John Doe', 'SAVE20', 'Philippines');
    await checkoutPage.placeOrderButton.click();
    const thankYouMessage = page.locator('h1:has-text("THANKYOU FOR THE ORDER.")');
    await expect(thankYouMessage).toBeVisible();

    // const cvvInput = page.locator('div.title:has-text("CVV Code ?")').locator('..').locator('input');
    // await cvvInput.fill('123');

    // const nameOnCardInput = page.locator('div.title:has-text("Name on Card")').locator('..').locator('input');
    // await nameOnCardInput.fill('John Doe');

    // const couponInput = page.locator('input[name="coupon"]');
    // await couponInput.fill('SAVE20');

    // const countryInput = page.locator('input[placeholder="Select Country"]');
    // await countryInput.fill('ph');
    // await page.waitForTimeout(1000);
    // await countryInput.fill('');
    // await countryInput.fill('phi');
    // await page.keyboard.press('Backspace');

    // const philippinesElement = page.locator('span:has-text("Philippines")');
    // await philippinesElement.click();

    // const placeOrderButton = page.locator('a:has-text("Place Order")');
    // await placeOrderButton.click();

    // const thankYouMessage = page.locator('h1:has-text("THANKYOU FOR THE ORDER.")');
    // await expect(thankYouMessage).toBeVisible();

    await page.waitForTimeout(3000);
});