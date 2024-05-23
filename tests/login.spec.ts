import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("User login to Demobank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const tooShortUserName = "login";
    const expectedErrorUserName = "identyfikator ma min. 8 znaków";
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(tooShortUserName);
    await loginPage.passwordInput.click();

    await expect(loginPage.loginError).toHaveText(expectedErrorUserName);
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const userId = loginData.userId;
    const tooShortPassword = "12345";
    const expectedErrorPassword = "hasło ma min. 8 znaków";
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(tooShortPassword);
    await loginPage.passwordInput.blur(); // leaving the field we are in

    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorPassword
    );
  });
});
