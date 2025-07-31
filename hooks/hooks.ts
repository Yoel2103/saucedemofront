import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { World } from '../step-definitions/World';
import { browserConfig, contextConfig } from '../src/config/playwright.config';

// Aumentar el timeout por defecto a 60 segundos
setDefaultTimeout(60000);

let browser: Browser;

BeforeAll(async function () {
  console.log('Launching browser... HEADLESS =', process.env.HEADLESS);
  browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions'
    ]
  });
  console.log('Browser launched successfully');
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});