import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { World } from './World';

When('Voy al carrito de compras', async function (this: World) {
  this.productsPage = this.productsPage || new (await import('../src/pages/ProductsPage')).ProductsPage(this.page);
  await this.productsPage.goToCart();
  this.cartPage = new CartPage(this.page);
});

Then('Debo estar en la página del carrito', async function (this: World) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.verifyCartPageIsLoaded();
});

Then('Debo ver {int} producto\\(s\\) en el carrito', async function (this: World, expectedCount: number) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.verifyCartItemCount(expectedCount);
});

Then('Debo ver {int} producto en el carrito', async function (this: World, expectedCount: number) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.verifyCartItemCount(expectedCount);
});

Then('Debo ver {int} productos en el carrito', async function (this: World, expectedCount: number) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.verifyCartItemCount(expectedCount);
});

When('Procedo al checkout', async function (this: World) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.proceedToCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
});

Then('Debo estar en la página de información del checkout', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.verifyCheckoutStepOne();
});

When('Completo la información del checkout con nombre {string}, apellido {string} y código postal {string}', 
  async function (this: World, firstName: string, lastName: string, postalCode: string) {
    this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
    await this.checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
  }
);

When('Continúo al resumen del pedido', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.continueToOverview();
});

Then('Debo estar en la página de resumen del checkout', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.verifyCheckoutStepTwo();
});

Then('Debo ver el resumen del pedido', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.verifyOrderSummary();
});

When('Finalizo el pedido', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.finishOrder();
});

Then('Debo ver la confirmación del pedido', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.verifyOrderComplete();
});

When('Vuelvo a la página principal', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.goBackHome();
});

When('Remuevo {string} del carrito', async function (this: World, productName: string) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.removeProductFromCart(productName);
});

Then('El carrito debe estar vacío', async function (this: World) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.verifyCartIsEmpty();
});

When('Cancelo el checkout', async function (this: World) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.cancelCheckout();
});

Then('Debo ver un mensaje de error {string} en el checkout', 
  async function (this: World, expectedMessage: string) {
    this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
    await this.checkoutPage.verifyErrorMessage(expectedMessage);
  }
);

When('Continúo comprando', async function (this: World) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.continueShopping();
});
