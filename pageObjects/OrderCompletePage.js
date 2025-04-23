class OrderCompletePage 
{
    constructor(page, expect) {
        this.page = page;
        this.thankYouMessage = page.locator('h1:has-text("THANKYOU FOR THE ORDER.")');
    }
}

module.exports = { OrderCompletePage };