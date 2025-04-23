class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartItems = page.locator("tbody tr");
        this.checkoutButton = page.locator("button:has-text('Checkout')");
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };