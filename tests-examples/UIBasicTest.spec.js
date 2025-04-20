const {test, expect} = require('@playwright/test');

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

test('Login and Purchase order test', async ({ page }) => {
    const projectName = 'ADIDAS ORIGINAL';
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("#userEmail").fill("john11@gmail.com");
    await page.locator("#userPassword").fill("P@ssword321");
    await page.locator("#login").click();
    const signOutButton = page.locator('button:has-text("Sign Out")');
    
    const addToCartButton = page.locator('h5:has-text("' + projectName + '")')
    .locator('..') // Go up to the parent div
    .locator('button:has-text("Add To Cart")');
    await addToCartButton.click();

    const cartButton = page.locator('nav button:has-text("Cart")');
    await cartButton.click();

    const checkoutButton = page.locator('button:has-text("Checkout")');
    await checkoutButton.click();

    const cvvInput = page.locator('div.title:has-text("CVV Code ?")').locator('..').locator('input');
    await cvvInput.fill('123');

    const nameOnCardInput = page.locator('div.title:has-text("Name on Card")').locator('..').locator('input');
    await nameOnCardInput.fill('John Doe');

    const couponInput = page.locator('input[name="coupon"]');
    await couponInput.fill('SAVE20');

    const countryInput = page.locator('input[placeholder="Select Country"]');
    await countryInput.fill('ph');
    await page.waitForTimeout(1000); // Wait for the dropdown to appear
    await countryInput.fill('');
    await countryInput.fill('phi');
    await page.keyboard.press('Backspace');

    const philippinesElement = page.locator('span:has-text("Philippines")');
    await philippinesElement.click();

    const placeOrderButton = page.locator('a:has-text("Place Order")');
    await placeOrderButton.click();

    const thankYouMessage = page.locator('h1:has-text("THANKYOU FOR THE ORDER.")');
    await expect(thankYouMessage).toBeVisible();

    await page.waitForTimeout(3000);
});