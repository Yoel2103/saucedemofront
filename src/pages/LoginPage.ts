import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async verifyErrorMessageContains(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async verifyLoginPageIsVisible(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }
}