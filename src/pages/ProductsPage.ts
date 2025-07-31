import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly productsTitle: Locator;
  private readonly addToCartButtons: Locator;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;
  private readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.productsTitle = page.locator('.title');
    this.addToCartButtons = page.locator('[data-test*="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.removeButtons = page.locator('[data-test*="remove"]');
  }

  async verifyProductsPageIsLoaded(): Promise<void> {
    await expect(this.productsTitle).toHaveText('Products');
  }

  async addProductToCart(productName: string): Promise<void> {
    const productButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await productButton.click();
  }

  async verifyCartBadgeCount(expectedCount: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }
}