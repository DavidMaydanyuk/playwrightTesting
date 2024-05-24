import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("User login to Demobank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = loginData.expectedUserName;
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userName).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const tooShortUserName = loginData.tooShortUserName;
    const expectedErrorUserName = loginData.expectedErrorUserName;
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(tooShortUserName);
    await loginPage.passwordInput.click();

    await expect(loginPage.loginError).toHaveText(expectedErrorUserName);
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const userId = loginData.userId;
    const tooShortPassword = loginData.tooShortPassword;
    const expectedPasswordError = loginData.expectedPasswordError;
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(tooShortPassword);
    await loginPage.passwordInput.blur(); // leaving the field we are in (użytkownik klika w dowolne inne miejsce)

    await expect(loginPage.passwordError).toHaveText(expectedPasswordError);
  });
});
