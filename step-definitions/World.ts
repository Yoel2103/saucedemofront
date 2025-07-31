import { Browser, BrowserContext, Page } from '@playwright/test';
import { setWorldConstructor } from '@cucumber/cucumber';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

export class World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  productsPage!: ProductsPage;
  cartPage!: CartPage;
  checkoutPage!: CheckoutPage;
}

setWorldConstructor(World);