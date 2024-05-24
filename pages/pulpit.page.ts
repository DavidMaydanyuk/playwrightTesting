import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReciver = this.page.locator("#widget_1_transfer_receiver");
  transferAmount = this.page.locator("#widget_1_transfer_amount");
  transferTitle = this.page.locator("#widget_1_transfer_title");

  transferButton = this.page.getByRole("button", { name: "wykonaj" });
  closeButton = this.page.getByTestId("close-button");

  massege = this.page.locator("#show_messages");

  topupReciver = this.page.locator("#widget_1_topup_receiver");
  topupAmount = this.page.locator("#widget_1_topup_amount");
  topupAgreement = this.page.locator("#uniform-widget_1_topup_agreement span");
  topupButton = this.page.getByRole("button", { name: "doładuj telefon" });

  moneyValue = this.page.locator("#money_value");
  userName = this.page.getByTestId("user-name");
}
