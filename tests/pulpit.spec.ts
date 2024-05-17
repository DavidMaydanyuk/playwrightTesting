import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  const url = "https://demo-bank.vercel.app/";
  const userId = "loginlod";
  const userPassword = "passpass";

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const reciverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectedTransferResiver = "Chuck Demobankowy";
    const expectedMassage = `Przelew wykonany! ${expectedTransferResiver} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(reciverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMassage);
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpReciver = "500 xxx xxx";
    const topUpAmount = "30";
    const expectedMessege = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciver}`;

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();

    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessege);
  });
});
