import { browser, expect } from "@wdio/globals";

describe("Footer tests", () => {
  beforeEach(async () => {
    await browser.url("https://www.saucedemo.com");
    await browser.maximizeWindow();

    await $("#user-name").setValue("standard_user");
    await $("#password").setValue("secret_sauce");
    await $("#login-button").click();

    await expect($("#inventory_container")).toBeDisplayed();
  });

  async function openSocialLink(dataTestAttr, expectedUrlPart) {
    await $("footer").scrollIntoView();
    const link = await $(`[data-test="${dataTestAttr}"]`);

    const originalWindow = await browser.getWindowHandle();
    await link.click();

    const allHandles = await browser.getWindowHandles();
    const newTabHandle = allHandles.find((h) => h !== originalWindow);
    expect(newTabHandle).toBeDefined();

    await browser.switchToWindow(newTabHandle);

    const url = await browser.getUrl();
    expect(url).toContain(expectedUrlPart);

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
  }

  it("TC0007-1: Twitter link opens correct page", async () => {
    await openSocialLink("social-twitter", "x.com/saucelabs");
  });

  it("TC0007-2: Facebook link opens correct page", async () => {
    await openSocialLink("social-facebook", "facebook.com/saucelabs");
  });

  it("TC0007-3: LinkedIn link opens correct page", async () => {
    await openSocialLink("social-linkedin", "linkedin.com/company/sauce-labs");
  });
});
