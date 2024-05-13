import { expect, request } from "@playwright/test";
import { General } from '../support/general';
import { Login } from '../elements/login';
import { URLS, ENDPOINTS } from '../../../environment';

let general;
let loginPage;

const loginURL = process.env.LOGIN_MSC_URL;
const userName = process.env.USER_NAME;
const userPassword = process.env.PASSWORD;

export class LoginDomainLogic {

  constructor(page) {
    this.page = page;

    general = new General(page);
    loginPage = new Login(page)
  }

  async getJWTTokenFromMSC() {
    await this.page.goto(loginURL);
    await loginPage.userNameInput.fill(userName)
    await loginPage.userPasswordInput.fill(userPassword)
    await loginPage.loginSubmitButton.click();
    await expect(this.page).toHaveTitle('jwt.ms: Welcome!');
    await this.page.reload();
    await expect(await loginPage.jwtHeader.nth(0)).toBeVisible();
    await expect(await loginPage.tokenRichTextArea).toBeVisible();
    const tokenValue = await loginPage.tokenRichTextArea.textContent();
    console.log('This is the JWT token: ' + tokenValue);

    await general.writeTokenToFile(tokenValue);
  }

  async userAPI(token) {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      URLS.API_URL + ENDPOINTS.USER + '/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
    );
    expect(response.status()).toBe(200);
    return response;
  }
}