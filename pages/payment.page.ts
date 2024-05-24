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
}
