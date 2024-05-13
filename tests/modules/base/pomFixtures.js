import { firefox, test as baseTest, chromium } from "@playwright/test";
import path from "path";
import { General } from '../ui/support/general';
import { Login } from '../ui/elements/login';
import { LoginDomainLogic } from '../ui/domainLogic/loginDL';
import { APIDL } from '../ui/domainLogic/APIDL';

const testPages = baseTest.extend({
  wpage: [
    async ({}, use) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await page.close();
    await context.close();
    await browser.close();
    },
    { auto: "true" },
  ],
    login: async ({ wpage }, use) => {
      await use(new Login(wpage));
    },
    general: async ({ wpage }, use) => {
      await use(new General(wpage));
    },
    loginDL: async ({ wpage }, use) => {
      await use(new LoginDomainLogic(wpage));
    },
    apiDL: async ({ wpage }, use) => {
      await use(new APIDL(wpage));
    },
});

export const test = testPages;
export const expect = testPages.expect;