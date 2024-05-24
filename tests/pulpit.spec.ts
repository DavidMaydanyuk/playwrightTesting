import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const reciverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectedTransferResiver = "Chuck Demobankowy";
    const expectedMassage = `Przelew wykonany! ${expectedTransferResiver} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await pulpitPage.quickTransfer(reciverId, transferAmount, transferTitle);

    // Assert
    await expect(pulpitPage.massege).toHaveText(expectedMassage);
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpReciver = "500 xxx xxx";
    const topUpAmount = "30";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciver}`;

    // Act
    await pulpitPage.topUp(topUpReciver, topUpAmount);

    // Assert
    await expect(pulpitPage.massege).toHaveText(expectedMessage);
  });

  test("correect balance after successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpReciver = "500 xxx xxx";
    const topUpAmount = "30";
    const initialBalance = await pulpitPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.topUp(topUpReciver, topUpAmount);

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
