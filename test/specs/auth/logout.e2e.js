import { browser, expect } from "@wdio/globals";

describe("Logout tests", () => {
  const baseUrl = "https://www.saucedemo.com";
  const username = "standard_user";
  const password = "secret_sauce";

  beforeEach(async () => {
    await browser.url(baseUrl);
    await browser.maximizeWindow();
  });

  it("TC0004: Valid logout after login", async () => {
    const usernameInput = $("#user-name");
    const passwordInput = $("#password");
    const loginButton = $("#login-button");
    const burgerMenuBtn = $("#react-burger-menu-btn");
    const logoutLink = $("#logout_sidebar_link");

    await usernameInput.setValue(username);
    await passwordInput.setValue(password);
    await loginButton.click();

    await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");

    await burgerMenuBtn.click();
    await logoutLink.click();

    await expect(browser).toHaveUrl("https://www.saucedemo.com/");
    await expect(usernameInput).toHaveValue("");
    await expect(passwordInput).toHaveValue("");
  });
});
