import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { World } from './World';

Given('Me encuentro en la pagina de Sauce Demo', async function (this: World) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateTo('https://www.saucedemo.com/');
  await this.loginPage.verifyLoginPageIsVisible();
});

When('Ingreso con usuario {string} y contraseña {string}', 
  async function (this: World, username: string, password: string) {
    await this.loginPage.login(username, password);
  }
);

Then('Debo ser redirigido a la página de productos', async function (this: World) {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyProductsPageIsLoaded();
});

Then('Debo ver el título de los productos', async function (this: World) {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyProductsPageIsLoaded();
});

Then('Debo ver un mensaje de error {string}', 
  async function (this: World, expectedMessage: string) {
    await this.loginPage.verifyErrorMessage(expectedMessage);
  }
);

Then('Debo ver un mensaje de error que contenga {string}', 
  async function (this: World, expectedMessage: string) {
    await this.loginPage.verifyErrorMessageContains(expectedMessage);
  }
);

Then('Debo permanecer en la página de inicio de sesión', async function (this: World) {
  await this.loginPage.verifyLoginPageIsVisible();
});

Given('Me encuentro en la página de productos', async function (this: World) {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyProductsPageIsLoaded();
});