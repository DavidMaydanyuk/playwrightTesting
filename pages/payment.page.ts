import { Page } from "@playwright/test";

export class PaymentPage {
  constructor(private page: Page) {}

  paymentClick = this.page.getByRole("link", { name: "płatności" });
  transferReceiver = this.page.getByTestId("transfer_receiver");
  accountForm = this.page.getByTestId("form_account_to");
  amountForm = this.page.getByTestId("form_amount");

  paymentButton = this.page.getByRole("button", { name: "wykonaj przelew" });
  closeButton = this.page.getByTestId("close-button")

  expectedMassage = this.page.locator("#show_messages");
}
