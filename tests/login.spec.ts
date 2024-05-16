import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test("successful login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("loginlod");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("passpass");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("login");
    await page.getByTestId("password-input").click();
    await page.getByTestId("error-login-id").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test.only("unsuccessful login with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("logilogi");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("12345");
    await page.getByTestId("password-input").blur(); // leaving the field we are in

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
