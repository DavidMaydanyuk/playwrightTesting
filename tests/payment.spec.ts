import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("simple payment", async ({ page }) => {
    const transferReciver = "Jan Nowak";
    const transferAccaunt = "12 3456 7890 1234 5678 9012 3456";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReciver}`;

    await page.getByTestId("transfer_receiver").fill(transferReciver);
    await page.getByTestId("form_account_to").fill(transferAccaunt);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });
});
