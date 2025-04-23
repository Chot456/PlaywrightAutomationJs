class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.loginButton = page.locator("#login");

        this.signOutButton = page.locator('button:has-text("Sign Out")');
    }

    async validLogin(email, password) {
        await this.userEmail.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }
}

module.exports = { LoginPage };
