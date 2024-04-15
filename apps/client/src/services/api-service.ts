import { APIResponse } from '@gotroc/types';

export class APIService {
  public static readonly API_URL = 'http://localhost:5600';

  public static get(endpoint: string) {
    return this.request(endpoint, 'GET', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static post(endpoint: string, body?: any) {
    return this.request(endpoint, 'POST', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public static async formData(endpoint: string, body: FormData): Promise<APIResponse> {
    return this.request(endpoint, 'POST', {
      body,
      headers: {},
    });
  }

  private static async request(
    endpoint: string,
    method: string,
    { body, headers }: { body?: any; headers?: HeadersInit | null },
  ): Promise<APIResponse> {
    const finalBody = body
      ? typeof body === 'string' || body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined;
    const response = await fetch(`${this.API_URL}${endpoint}`, {
      method,
      headers: headers || {},
      credentials: 'include',
      body: finalBody,
    });

    return await response.json();
  }
}
