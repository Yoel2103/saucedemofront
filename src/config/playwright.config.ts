import { LaunchOptions } from '@playwright/test';

export const browserConfig: LaunchOptions = {
  headless: process.env.HEADLESS === 'true',
  slowMo: 50,
  timeout: 50000
};

export const contextConfig = {
  viewport: { width: 1920, height: 1080 },
  ignoreHTTPSErrors: true,
  screenshot: 'only-on-failure' as const,
  video: 'retain-on-failure' as const
};