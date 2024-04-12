export const DEFAULT_PASSWORD = 'Password123!';
export const DEFAULT_HASH_SALT = 10;

export const SeedUsers: {
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  nbDefaultOffers: number;
}[] = [
  {
    username: 'alicedu92',
    firstname: 'Alice',
    lastname: 'Dupont',
    email: 'alice.dupont@gmail.com',
    nbDefaultOffers: 2,
  },
  {
    username: 'bob-online',
    firstname: 'Bob',
    email: 'bob99@yahoot.com',
    nbDefaultOffers: 5,
  },
  {
    username: 'radis-doux-du-sud',
    firstname: 'Charlie',
    lastname: 'Brown',
    email: 'c.brown@laposte.net',
    nbDefaultOffers: 6,
  },
  {
    username: 'david-75',
    email: 'david.doudou@gmail.com',
    nbDefaultOffers: 1,
  },
  {
    username: 'elisa-72',
    firstname: 'Elisa',
    email: 'elisadu72@gmail.com',
    nbDefaultOffers: 0,
  },
];
