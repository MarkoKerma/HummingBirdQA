import { test, expect } from '../../modules/base/pomFixtures'
import tokenJSON from '../../fixtures/token.json'

let page;
let token;
let context;

test.describe('Test workspace APIs', () => {
  test.beforeAll(async ({ wpage, loginDL }) => {
    page = wpage;
    context = await page.context();
    await loginDL.getJWTTokenFromMSC();
    token = tokenJSON.tokenJWT;
  });

  test('Create new workspace', async ({ apiDL }) => {
    const organisationCreate = await apiDL.createOrganisationAPI(token);
    const organisationResponse = await organisationCreate.json();
    const organisationId = await organisationResponse.result.id;

    //check workspace count before creation
    const numberOfWorkspaces = await apiDL.checkCountOfWorkspaces(token, organisationId);

    //create new workspace
    const newWorkspace = await apiDL.createWorkspaceAPI(token, organisationId);
    const workspaceResponse = await newWorkspace.json();
    expect(await newWorkspace.status()).toBe(201);
    expect(await workspaceResponse.result.id).toBeGreaterThan(0);

    //check workspace count after creation plus one existing object counted
    const newNumberOfWorkspaces = await apiDL.checkCountOfWorkspaces(token, organisationId);
    expect(numberOfWorkspaces + 1).toEqual(newNumberOfWorkspaces);
  });

  test.skip('Create container in workspace', async ({ apiDL }) => {
    const organisationCreate = await apiDL.createOrganisationAPI(token);
    const organisationResponse = await organisationCreate.json();
    const organisationId = await organisationResponse.result.id;

    //create new workspace
    const newWorkspace = await apiDL.createWorkspaceAPI(token, organisationId);
    const workspaceResponse = await newWorkspace.json();
    expect(await newWorkspace.status()).toBe(201);
    const workspaceId = await workspaceResponse.result.id;

    //create container workspace
    const newContainer = await apiDL.createContainerInWorkspaceAPI(token, organisationId);
  });
});