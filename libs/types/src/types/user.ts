type User = {
  id: number;
  username: string;
  firstname: string | null ;
  lastname: string | null;
  email: string;
  registerDate: Date;
  avatarUUID: string | null;
}

type UserWithPassword = User & {
  password: string;
}

export { User, UserWithPassword };