import { expect } from "@playwright/test";

export class Login {
  constructor(page) {
    this.page = page;

    //elements
    this.userNameInput = page.locator('#signInName');
    this.userPasswordInput = page.locator('#password');
    this.loginSubmitButton = page.locator('#next');
    this.tokenRichTextArea = page.locator('#encodedToken');
    this.jwtHeader = page.locator('.jwtHeader');
  }
}