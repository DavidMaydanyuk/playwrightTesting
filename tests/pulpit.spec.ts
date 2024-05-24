import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const reciverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectedTransferResiver = "Chuck Demobankowy";
    const expectedMassage = `Przelew wykonany! ${expectedTransferResiver} - ${transferAmount},00PLN - ${transferTitle}`;
    const pulpitPage = new PulpitPage(page);

    // Act
    await pulpitPage.transferReciver.selectOption(reciverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.paymentButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.massege).toHaveText(expectedMassage);
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange
    const topUpReciver = "500 xxx xxx";
    const topUpAmount = "30";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciver}`;
    const pulpitPage = new PulpitPage(page);

    // Act
    await pulpitPage.topupReciver.selectOption(topUpReciver);
    await pulpitPage.topupAmount.fill(topUpAmount);
    await pulpitPage.topupAgreement.click();

    await pulpitPage.topupButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.massege).toHaveText(expectedMessage);
  });

  test("correect balance after successful mobile top-up", async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const topUpReciver = "500 xxx xxx";
    const topUpAmount = "30";
    const initialBalance = await pulpitPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.topupReciver.selectOption(topUpReciver);
    await pulpitPage.topupAmount.fill(topUpAmount);
    await pulpitPage.topupAgreement.click();

    await pulpitPage.topupButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
