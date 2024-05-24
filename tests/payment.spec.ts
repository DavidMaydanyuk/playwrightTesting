import { test, expect } from "@playwright/test";
import { loginData, simplePaymentData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click(); //reuseble component from side-menu.component
  });

  test("simple payment", async ({ page }) => {
    const transferReciver = simplePaymentData.transferReciver;
    const transferAccaunt = simplePaymentData.transferAccaunt;
    const transferAmount = simplePaymentData.transferAmount;
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReciver}`;
    const paymentPage = new PaymentPage(page);

    await paymentPage.transferReceiver.fill(transferReciver);
    await paymentPage.accountForm.fill(transferAccaunt);
    await paymentPage.amountForm.fill(transferAmount);
    await paymentPage.transferButton.click();
    await paymentPage.closeButton.click();

    await expect(paymentPage.expectedMassage).toHaveText(expectedMessage);
  });
});
