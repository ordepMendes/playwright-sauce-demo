import { test, expect } from "@playwright/test";
import { log } from "console";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
});

test.describe("Testes de navegação", async () => {
  test("Logout, navegação para tela de login", async ({ page }) => {
    await page.locator("#react-burger-menu-btn").click();
  
    const logoutLink = page.locator("#logout_sidebar_link");
    await logoutLink.waitFor({ state: "visible" });
  
    await logoutLink.click();
  
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("about, navegação para a página de sobre", async ({ page }) => {
    await page.locator("#react-burger-menu-btn").click();
    await page.locator("#about_sidebar_link").click();

    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  test("cart, navegação para a tela do cart", async ({ page }) => {
    await page.locator("[data-test='shopping-cart-link']").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });

  test("detalhes do produtos, navegação para a tela de detalhes do produto", async ({
    page,
  }) => {
    const products = page.locator('a[data-test$="-title-link"]');
    await products.first().click();

    const url = page.url();
    expect(url).toContain("/inventory-item.html");
  });
});

test.describe("Funcionalidade da tela inventory", async () => {
  test("Adicionando um item no carrinho", async ({ page }) => {
    await page
      .locator('button[data-test$="add-to-cart-sauce-labs-backpack"]')
      .first()
      .click();

    await expect(page.locator('[data-test$="shopping-cart-badge"]')).toHaveText(
      "1"
    );
  });

  test("Adicionar todos os itens ao carrinho", async ({ page }) => {
    const buttonAddCart = await page.$$(".btn_inventory");
    const itens = buttonAddCart.length;
    for (const button of buttonAddCart) {
      await button.click();
    }

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await cartBadge.waitFor({ state: "visible" });

    expect(await cartBadge.innerText()).toBe(`${itens}`);
  });

  test("Ordenar filtro de Z - A", async ({ page }) => {
    await page.selectOption(".product_sort_container", "za");

    const selectedValue = await page.locator(".product_sort_container").inputValue();
    expect(selectedValue).toBe("za");
  });
});
