import { browser, expect } from "@wdio/globals";

describe("Login tests", () => {
  const baseUrl = "https://www.saucedemo.com";
  const username = "standard_user";
  const password = "secret_sauce";

  beforeEach(async () => {
    await browser.url(baseUrl);
    await browser.maximizeWindow();
  });

  it("TC0001: Valid login", async () => {
    const usernameInput = await $("#user-name");
    const passwordInput = await $("#password");
    const loginButton = await $("#login-button");

    await usernameInput.setValue(username);
    await passwordInput.setValue(password);
    await loginButton.click();

    await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");

    const productList = await $('[data-test="inventory-list"]');
    await expect(productList).toBeDisplayed();

    const cartLink = await $('[data-test="shopping-cart-link"]');
    await expect(cartLink).toBeDisplayed();
  });

  it("TC0002: Login with invalid password", async () => {
    const usernameInput = await $("#user-name");
    const passwordInput = await $("#password");
    const loginButton = await $("#login-button");

    await usernameInput.setValue(username);
    await passwordInput.setValue("wrong_password");
    await loginButton.click();

    const errorMessage = await $('h3[data-test="error"]');
    await expect(errorMessage).toBeDisplayed();
    await expect(errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );

    const errorIcon = await $('svg[data-icon="times-circle"]');
    await expect(errorIcon).toBeDisplayed();

    await expect(usernameInput).toHaveElementClass("error");
    await expect(passwordInput).toHaveElementClass("error");
  });

  it("TC0003: Login with invalid login", async () => {
    const usernameInput = await $("#user-name");
    const passwordInput = await $("#password");
    const loginButton = await $("#login-button");

    await usernameInput.setValue("wrong_user");
    await passwordInput.setValue(password);
    await loginButton.click();

    const errorMessage = await $('h3[data-test="error"]');
    await expect(errorMessage).toBeDisplayed();
    await expect(errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );

    const errorIcon = await $('svg[data-icon="times-circle"]');
    await expect(errorIcon).toBeDisplayed();

    await expect(usernameInput).toHaveElementClass("error");
    await expect(passwordInput).toHaveElementClass("error");
  });
});
