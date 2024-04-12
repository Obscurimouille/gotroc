import { User } from "@gotroc/types";
import { APIService } from "./api-service";

export class AuthService {
  public static async login(identifier: string, password: string) {
    const result = await APIService.post('/auth/login', { identifier, password });
    return result;
  }

  public static async me(): Promise<User | null> {
    const result = await APIService.get('/auth/');
    if (result.success) return result.data;
    return null;
  }

  public static async logout() {
    await APIService.post('/auth/logout');
    document.location.href = '/login';
  }
}
