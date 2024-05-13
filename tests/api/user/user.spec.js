import { test, expect } from '../../modules/base/pomFixtures'
import tokenJSON from '../../fixtures/token.json'

let page;
let token;
let context;

test.describe('Test Humming Bird APIs', () => {
  test.beforeAll(async ({ wpage, loginDL }) => {
    page = wpage;
    context = await page.context();
    await loginDL.getJWTTokenFromMSC();
    token = tokenJSON.tokenJWT;
  });

  test('Check user details', async ({ apiDL }) => {
    const userResponse = await apiDL.userAPI(token);
    const responseJSON = await userResponse.json();
    expect(await responseJSON.result.firstName).toEqual('Marko Petricevic');
  });

  test('Check creating new organisation', async ({ apiDL }) => {
    const organisationCreate = await apiDL.createOrganisationAPI(token);
    const organisationResponse = await organisationCreate.json();
    expect(await organisationCreate.status()).toBe(201);
    expect(await organisationResponse.result.id).toBeGreaterThan(0);
  });
});