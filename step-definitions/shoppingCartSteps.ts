import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductsPage } from '../src/pages/ProductsPage';
import { World } from './World';

When('Agrego {string} al carrito', async function (this: World, productName: string) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.addProductToCart(productName);
});

Then('el carrito debe mostrar {string}', async function (this: World, expectedCount: string) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.verifyCartBadgeCount(expectedCount);
});

When('Voy a la página del carrito', async function (this: World) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.goToCart();
});

Then('Debo ver {string} en el carrito', async function (this: World, productName: string) {
  const cartItem = this.page.locator('.cart_item').filter({ hasText: productName });
  await expect(cartItem).toBeVisible();
});

When('Remuevo {string} del carrito en la página de productos', async function (this: World, productName: string) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.removeProductFromCart(productName);
});

Then('El carrito debe estar vacío desde productos', async function (this: World) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.verifyCartIsEmpty();
});
