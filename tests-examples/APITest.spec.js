const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../tests/utils/APIUtils.js');

// npx playwright test APITest.spec.js --headed

const loginPayload = { userEmail: 'john11@gmail.com', userPassword: 'P@ssword321'}
const orderPayload = {
    orders: [
        {
            country: 'Philippines',
            productOrderedId: '67a8df56c0d3e6622a297ccd'
        }
    ]
};

// let token;
// let orderId;
let response;

test.beforeAll(async () => {
    console.log('Running before all tests');
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log('Response:', response);
});


test.beforeEach(async ({ page }) => {
    console.log('Running before each test');
});

test('API and UI test', async ({page}) => {
    console.log('Running login test');
    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');
    const ordersButton = page.locator('nav button:has-text("ORDERS")');
    await ordersButton.click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    await page.waitForTimeout(3000);

    for(let i=0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log('Row Order contents:', rowOrderId);


        if(response.orderId.includes(rowOrderId)){
            console.log('Order found:', rowOrderId);
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.waitForTimeout(3000);
    console.log('Order ID details:', orderIdDetails);
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});