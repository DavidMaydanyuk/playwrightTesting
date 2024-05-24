import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.getByTestId("transfer_receiver");
  accountForm = this.page.getByTestId("form_account_to");
  amountForm = this.page.getByTestId("form_amount");

  transferButton = this.page.getByRole("button", { name: "wykonaj przelew" });
  closeButton = this.page.getByTestId("close-button");

  expectedMassage = this.page.locator("#show_messages");

  async makeTransfer(
    transferReciver: string,
    transferAccaunt: string,
    transferAmount: string
  ): Promise<void> {
    await this.transferReceiver.fill(transferReciver);
    await this.accountForm.fill(transferAccaunt);
    await this.amountForm.fill(transferAmount);

    await this.transferButton.click();
    await this.closeButton.click();
  }
}
