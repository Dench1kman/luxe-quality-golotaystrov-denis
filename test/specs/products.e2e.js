import { browser, expect } from "@wdio/globals";

describe("Product sorting tests", () => {
  beforeEach(async () => {
    await browser.url("https://www.saucedemo.com");
    await browser.maximizeWindow();

    await $("#user-name").setValue("standard_user");
    await $("#password").setValue("secret_sauce");
    await $("#login-button").click();

    await expect($("#inventory_container")).toBeDisplayed();
  });

  it("TC0006-1: Sort by Price (low to high)", async () => {
    const sortDropdown = await $('[data-test="product-sort-container"]');
    await sortDropdown.selectByAttribute("value", "lohi");

    const prices = await getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  it("TC0006-2: Sort by Price (high to low)", async () => {
    const sortDropdown = await $('[data-test="product-sort-container"]');
    await sortDropdown.selectByAttribute("value", "hilo");

    const prices = await getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

  it("TC0006-3: Sort by Name (A to Z)", async () => {
    const sortDropdown = await $('[data-test="product-sort-container"]');
    await sortDropdown.selectByAttribute("value", "az");

    const names = await getProductNames();
    expect(names).toEqual([...names].sort());
  });

  it("TC0006-4: Sort by Name (Z to A)", async () => {
    const sortDropdown = await $('[data-test="product-sort-container"]');
    await sortDropdown.selectByAttribute("value", "za");

    const names = await getProductNames();
    const sortedNames = [...names].sort().reverse();

    expect(names).toEqual(sortedNames);
  });

  async function getProductPrices() {
    const priceElements = await $$('[data-test="inventory-item-price"]');
    const prices = [];

    for (const el of priceElements) {
      const text = await el.getText();
      const cleaned = text.replace("$", "").trim();
      const number = parseFloat(cleaned);
      prices.push(number);
    }
    return prices;
  }

  async function getProductNames() {
    const nameElements = await $$('[data-test="inventory-item-name"]');
    const names = [];

    for (const el of nameElements) {
      const text = await el.getText();
      names.push(text);
    }
    return names;
  }
});
