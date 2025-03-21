import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("login com credenciais válidas", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test.describe("Logins invalidos", async () => {
    
  test("login com credenciais inválidas", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("teste");
    await page.locator('[data-test="password"]').fill("erro123");
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("login com usuario bloqueado", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("locked_out_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  test("login com input de senha vázio", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Password is required"
    );
  });

  test("login com input de usuario vázio", async ({ page }) => {
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("Navegação para tela home forçando pela URL", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");

    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });

  test("login com ambos os campos vazios", async ({ page }) => {
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username is required"
    );
  });
});
