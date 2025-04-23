class NavigationPage
{
    constructor(page)
    {
        this.page = page;
        this.cartButton = page.locator('nav button:has-text("Cart")');
    }

    async goToCartPage() {
        await this.cartButton.click();
    }
}

module.exports = { NavigationPage };