import { test, expect } from "@playwright/test";
import { loginData, simplePaymentData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Payment tests", () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click(); //reuseble component from side-menu.component

    paymentPage = new PaymentPage(page);
  });

  test("simple payment", async ({ page }) => {
    const transferReciver = simplePaymentData.transferReciver;
    const transferAccaunt = simplePaymentData.transferAccaunt;
    const transferAmount = simplePaymentData.transferAmount;
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReciver}`;

    await paymentPage.makeTransfer(
      transferReciver,
      transferAccaunt,
      transferAmount
    );

    await expect(paymentPage.expectedMassage).toHaveText(expectedMessage);
  });
});
