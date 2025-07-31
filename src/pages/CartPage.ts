import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartTitle: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly removeButtons: Locator;
  private readonly itemNames: Locator;
  private readonly itemPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('[data-test*="remove"]');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async verifyCartPageIsLoaded(): Promise<void> {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async verifyProductInCart(productName: string): Promise<void> {
    const cartItem = this.cartItems.filter({ hasText: productName });
    await expect(cartItem).toBeVisible();
  }

  async verifyCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

  async getProductPrice(productName: string): Promise<string> {
    const cartItem = this.cartItems.filter({ hasText: productName });
    const price = cartItem.locator('.inventory_item_price');
    return await price.textContent() || '';
  }
}
