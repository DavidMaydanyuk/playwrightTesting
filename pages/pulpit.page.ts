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

  async quickTransfer(
    reciverId: string,
    transferAmount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transferReciver.selectOption(reciverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.transferButton.click();
    await this.closeButton.click();
  }

  async topUp(topUpReciver: string, topUpAmount: string): Promise<void> {
    await this.topupReciver.selectOption(topUpReciver);
    await this.topupAmount.fill(topUpAmount);
    await this.topupAgreement.click();

    await this.topupButton.click();
    await this.closeButton.click();
  }
}
