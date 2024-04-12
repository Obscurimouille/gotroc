import { APIResponse } from "@gotroc/types";

export class APIService {
  public static readonly API_URL = 'http://localhost:5600';

  public static get(endpoint: string) {
    return this.request(endpoint, 'GET');
  }

  public static post(endpoint: string, body?: any) {
    return this.request(endpoint, 'POST', body);
  }

  private static async request(endpoint: string, method: string, body?: any): Promise<APIResponse> {
    const response = await fetch(`${this.API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

    return await response.json();
  }
}
