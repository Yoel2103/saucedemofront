import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `reports/screenshots/${name}.png`,
      fullPage: true 
    });
  }
}