import { APIService } from './api-service';
import i18next, { TFunction } from 'i18next';

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

  /**
   * Format the register date of a user based on the current language
   * @param date The date to format
   * @param t The translation function
   * @returns The formatted date
   * @example UserService.formatRegisterDate(new Date(), t) => "Member since January 2022"
   */
  public static formatRegisterDate(date: Date, t: TFunction<"translation", undefined>): string {
    date = new Date(date);
    const month = date.toLocaleString(i18next.language, { month: 'long' });
    return t('page.dashboard.profile.member-since', { month: month, year: date.getFullYear() });
  }
}
