import { browser, expect } from "@wdio/globals";

describe("Cart tests", () => {
  const baseUrl = "https://www.saucedemo.com";
  const username = "standard_user";
  const password = "secret_sauce";

  beforeEach(async () => {
    await browser.url(baseUrl);
    await browser.maximizeWindow();
  });

  it("TC0005: Saving the Cart After Logout", async () => {
    const usernameInput = await $("#user-name");
    const passwordInput = await $("#password");
    const loginButton = await $("#login-button");

    await usernameInput.setValue(username);
    await passwordInput.setValue(password);
    await loginButton.click();

    const inventoryContainer = await $("#inventory_container");
    await expect(inventoryContainer).toBeDisplayed();

    const addToCartButton = await $("#add-to-cart-sauce-labs-backpack");
    await addToCartButton.click();

    const cartBadge = await $(".shopping_cart_badge");
    await expect(cartBadge).toBeDisplayed();
    await expect(cartBadge).toHaveText("1");

    const burgerButton = await $("#react-burger-menu-btn");
    await burgerButton.click();

    const logoutLink = await $("#logout_sidebar_link");
    await logoutLink.waitForDisplayed();
    await expect(await $$("nav.bm-item-list a")).toHaveLength(4);
    await logoutLink.click();

    await usernameInput.waitForDisplayed();
    await usernameInput.setValue(username);
    await passwordInput.setValue(password);
    await loginButton.click();

    await expect(inventoryContainer).toBeDisplayed();

    const cartIcon = await $(".shopping_cart_link");
    await cartIcon.click();

    const cartItems = await $$(".cart_item");
    await expect(cartItems).not.toBeElementsArrayOfSize(0);

    const itemName = await $(".inventory_item_name");
    await expect(itemName).toHaveText("Sauce Labs Backpack");
  });
});
