import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = "loginlod";
    const userPassword = "passpass";
    const expectedUserName = "Jan Demobankowy";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    const tooShortUserName = "login";
    const expectedErrorUserName = "identyfikator ma min. 8 znaków";

    await page.getByTestId("login-input").fill(tooShortUserName);
    await page.getByTestId("password-input").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorUserName
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    const userId = "loginlod";
    const tooShortPassword = "12345";
    const expectedErrorPassword = "hasło ma min. 8 znaków";

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(tooShortPassword);
    await page.getByTestId("password-input").blur(); // leaving the field we are in

    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorPassword
    );
  });
});
