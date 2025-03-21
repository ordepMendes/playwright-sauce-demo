import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  const products = page.locator('a[data-test$="-title-link"]');
  await products.first().click();
});

test.describe("navegação da página de detalhes do item", async () => {
  test("Retorno para a página de inventory", async ({ page }) => {
    await page.locator("#back-to-products").click();

    const url = page.url();
    expect(url).toContain("/inventory.html");
  });

  test("navegação para página de cart", async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });
});

test('deve aparecer o badge no carrinho quando o item for adicionado', async ({page}) => {
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
})
