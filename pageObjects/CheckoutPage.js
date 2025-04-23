class CheckoutPage
{
    constructor(page)
    {
        this.page = page;
        this.cvvInput = page.locator('div.title:has-text("CVV Code ?")').locator('..').locator('input');
        this.nameOnCardInput = page.locator('div.title:has-text("Name on Card")').locator('..').locator('input');
        this.couponInput = page.locator('input[name="coupon"]');
        this.countryInput = page.locator('input[placeholder="Select Country"]');

        this.placeOrderButton = page.locator('a:has-text("Place Order")');
    }

    async clickSelectedCountry(country) {
        console.log("new country:" + country);
        await this.page.locator(`span:has-text("${country}")`).click();
    }

    async fillCheckoutForm(cvv, nameOnCard, coupon, country) {
        await this.cvvInput.fill(cvv);
        await this.nameOnCardInput.fill(nameOnCard);
        await this.couponInput.fill(coupon);
        await this.countryInput.fill(country);
        await this.page.waitForTimeout(1000); // Wait for the dropdown to appear
        await this.countryInput.fill('');
        const newCountry = country.slice(0, 4);
        await this.countryInput.fill(newCountry);
        await this.page.keyboard.press('Backspace');
        await this.clickSelectedCountry(country);
    }
}

module.exports = { CheckoutPage };
