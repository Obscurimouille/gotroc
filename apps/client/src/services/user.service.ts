import { APIService } from './api-service';

export class UserService {
  public static updateProfile(data: {
    firstname: string;
    lastname: string;
    email: string;
    avatar?: File;
  }) {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    if (data.avatar) formData.append('avatar', data.avatar);

    return APIService.formData('/user/profile', formData, {
      method: 'PUT',
    });
  }

  public static getAll() {
    return APIService.get('/user');
  }

  public static getById(id: number) {
    return APIService.get('/user/' + id);
  }

  public static getAvatarURL(avatarUUID: string) {
    return `${APIService.API_URL}/user/avatar/${avatarUUID}`;
  }

  public static formatRegisterDate(date: Date): string {
    date = new Date(date);
    const month = date.toLocaleString('fr-FR', { month: 'long' });
    return 'Membre depuis ' + month + ' ' + date.getFullYear();
  }
}
