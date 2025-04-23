class DashboardPage {
    constructor(page) {
        this.page = page;
        this.ordersButton = page.locator('nav button:has-text("ORDERS")');
        this.rows = page.locator("tbody tr");
    }

    async clickAddToCartButton(projectName) {
        const addToCartButton = this.page.locator('h5:has-text("' + projectName + '")')
            .locator('..') // Go up to the parent div
            .locator('button:has-text("Add To Cart")');
        await addToCartButton.click();
    }
}

module.exports = { DashboardPage };
