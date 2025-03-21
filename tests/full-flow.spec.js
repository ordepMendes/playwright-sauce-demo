import { test, expect } from "@playwright/test";

test("Deve realizar o fluxo de compras completo", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await test.step("Fazer login", async () => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
  });

  await test.step("Adicionando item no cart", async () => {
    await page
      .locator('button[data-test$="add-to-cart-sauce-labs-backpack"]')
      .first()
      .click();
    await page.locator("[data-test='shopping-cart-link']").click();
  });

  await test.step("Preenchendo informações", async () => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("fake");
    await page.locator('[data-test="lastName"]').fill("user");
    await page.locator('[data-test="postalCode"]').fill("21965-411");
    await page.locator('[data-test="continue"]').click();
  });

  await test.step("Finalizando compra", async () => {
    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html"
    );
  });
});
