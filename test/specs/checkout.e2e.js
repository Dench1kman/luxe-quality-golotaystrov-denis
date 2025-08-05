import { browser, expect } from "@wdio/globals";

describe("Checkout tests", () => {
  before(async () => {
    await browser.url("https://www.saucedemo.com/");
    await $("#user-name").setValue("standard_user");
    await $("#password").setValue("secret_sauce");
    await $("#login-button").click();
  });

  it("TC0008: Valid Checkout", async () => {
    await $('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    const cartBadge = await $(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");

    await $(".shopping_cart_link").click();
    await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
    await expect($(".cart_item")).toBeDisplayed();

    await $('button[data-test="checkout"]').click();
    await expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-one.html"
    );

    await $("#first-name").setValue("John");
    await $("#last-name").setValue("Doe");
    await $("#postal-code").setValue("61120");

    await $("#continue").click();
    await expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    await expect($(".cart_item")).toBeDisplayed();

    const subtotal = await $('[data-test="subtotal-label"]');
    await expect(subtotal).toHaveText("Item total: $29.99");

    const total = await $('[data-test="total-label"]');
    await expect(total).toHaveText("Total: $32.39");

    await $("#finish").click();
    await expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    await expect($('[data-test="complete-header"]')).toHaveText(
      "Thank you for your order!"
    );

    await $("#back-to-products").click();
    await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    await expect($(".shopping_cart_badge")).not.toBeDisplayed();
  });

  it("TC0009: Checkout without products", async () => {
    await $(".shopping_cart_link").click();
    await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");

    const cartItems = await $$(".cart_item");
    expect(cartItems.length).toEqual(0);

    await $('button[data-test="checkout"]').click();

    await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
  });
});
