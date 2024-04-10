export class UserService {
  public static formatRegisterDate(date: Date): string {
    const month = date.toLocaleString('fr-FR', { month: 'long' });
    return 'Membre depuis ' + month + ' ' + date.getFullYear();
  }
}
