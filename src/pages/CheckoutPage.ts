import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly checkoutTitle: Locator;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly postalCodeField: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  // Checkout Overview elements
  private readonly paymentInfo: Locator;
  private readonly shippingInfo: Locator;
  private readonly itemTotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;
  private readonly finishButton: Locator;

  // Complete page elements
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    // Checkout Information
    this.checkoutTitle = page.locator('.title');
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Checkout Overview
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    // Complete
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyCheckoutStepOne(): Promise<void> {
    await expect(this.checkoutTitle).toHaveText('Checkout: Your Information');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async verifyCheckoutStepTwo(): Promise<void> {
    await expect(this.checkoutTitle).toHaveText('Checkout: Overview');
  }

  async verifyOrderSummary(): Promise<void> {
    await expect(this.paymentInfo).toBeVisible();
    await expect(this.shippingInfo).toBeVisible();
    await expect(this.itemTotal).toBeVisible();
    await expect(this.tax).toBeVisible();
    await expect(this.total).toBeVisible();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toContainText('Your order has been dispatched');
  }

  async goBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async getItemTotal(): Promise<string> {
    return await this.itemTotal.textContent() || '';
  }

  async getTax(): Promise<string> {
    return await this.tax.textContent() || '';
  }

  async getTotal(): Promise<string> {
    return await this.total.textContent() || '';
  }
}
