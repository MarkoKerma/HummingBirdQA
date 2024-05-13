import { expect, request } from "@playwright/test";
import { General } from '../support/general';
import { URLS, ENDPOINTS } from '../../../environment';

let general;

export class APIDL {
  constructor(page) {
    this.page = page;

    general = new General(page);
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

  async createOrganisationAPI(token) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      URLS.API_URL + ENDPOINTS.ORGANISATIONS,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: "Marko 6",
        },
      },
    );
    expect(response.status()).toBe(201);
    return response;
  }

  async createWorkspaceAPI(token, organisationID) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      URLS.API_URL + ENDPOINTS.WORKSPACE + '/create/' + organisationID,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: "Marko 6",
        },
      },
    );
    expect(response.status()).toBe(201);
    await this.page.waitForTimeout(7000);
    return response;
  }

  async checkCountOfWorkspaces(token, organisationID) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      `${URLS.API_URL}${ENDPOINTS.ORGANISATIONS}/:id/query?id=${organisationID}&Depth=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          filters: [],
          page: 1,
          pageSize: 50,
          orderBy: []
        },
      },
    );
    expect(response.status()).toBe(200);
    const responseJSON = await response.json();
    return await responseJSON.result.totalCount;
  }

  async createContainerInWorkspaceAPI(token, workspaceId) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      `${URLS.API_URL}${ENDPOINTS.WORKSPACE}/${workspaceId}/create/container`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          viewId: 1,
        },
      },
    );
    expect(response.status()).toBe(201);
    await this.page.waitForTimeout(5000);
    return response;
  }
}