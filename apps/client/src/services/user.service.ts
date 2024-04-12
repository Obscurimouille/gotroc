import { APIService } from './api-service';

export class UserService {
  public static getAll() {
    return APIService.get('/user');
  }

  public static getById(id: number) {
    return APIService.get('/user/' + id);
  }

  public static formatRegisterDate(date: Date): string {
    date = new Date(date);
    const month = date.toLocaleString('fr-FR', { month: 'long' });
    return 'Membre depuis ' + month + ' ' + date.getFullYear();
  }
}
