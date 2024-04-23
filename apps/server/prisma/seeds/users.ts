import { fiveMinutesAgo, oneHourAgo, yesterday } from './utils';

export const DEFAULT_PASSWORD = 'Password123!';
export const DEFAULT_HASH_SALT = 10;

export const SeedUsers: {
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  nbDefaultOffers: number;
  avatar?: [string, string];
  isAdmin?: boolean;
  ratings?: { value: number; authorUsername: string; note?: string; date: Date }[];
}[] = [
  {
    username: 'alicedu92',
    firstname: 'Alice',
    lastname: 'Dupont',
    email: 'alice.dupont@gmail.com',
    nbDefaultOffers: 2,
    avatar: ['seed_avatar_woman_1', 'png'],
    ratings: [
      {
        value: 5,
        authorUsername: 'bob-online',
        note: 'Alice est une excellente vendeuse, je recommande.',
        date: new Date('2021-09-01'),
      },
      {
        value: 3,
        authorUsername: 'radis-doux-du-sud',
        date: new Date(yesterday),
      },
    ],
  },
  {
    username: 'bob-online',
    firstname: 'Bob',
    email: 'bob99@yahoot.com',
    nbDefaultOffers: 5,
    avatar: ['seed_avatar_man_1', 'png'],
    ratings: [
      {
        value: 4,
        authorUsername: 'alicedu92',
        note: 'Bon vendeur, je recommande.',
        date: new Date(fiveMinutesAgo),
      },
      {
        value: 1,
        authorUsername: 'radis-doux-du-sud',
        note: 'Nul, ne répond pas aux messages.',
        date: new Date('2024-01-16'),
      },
    ],
  },
  {
    username: 'radis-doux-du-sud',
    firstname: 'Charlie',
    lastname: 'Brown',
    email: 'c.brown@laposte.net',
    nbDefaultOffers: 6,
    avatar: ['seed_avatar_man_2', 'png'],
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
    avatar: ['seed_avatar_woman_2', 'png'],
    ratings: [
      {
        value: 2,
        authorUsername: 'alicedu92',
        note: 'Produit non conforme.',
        date: new Date(oneHourAgo),
      },
    ],
  },
  {
    username: 'admin',
    firstname: 'Admin',
    email: 'admin@localhost.com',
    nbDefaultOffers: 0,
    isAdmin: true,
  },
];
