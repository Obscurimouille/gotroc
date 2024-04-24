import { fiveMinutesAgo, oneHourAgo, yesterday } from './utils';

export const DEFAULT_PASSWORD = 'Password123!';
export const DEFAULT_HASH_SALT = 10;

export const SeedUsers: {
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  nbDefaultOffers: number;
  registerDate: Date;
  avatar?: [string, string];
  isAdmin?: boolean;
  ratings?: { value: number; authorUsername: string; note?: string; date: Date }[];
}[] = [
  {
    username: 'alicedu92',
    firstname: 'Alice',
    lastname: 'Dupont',
    email: 'alice.dupont@gmail.com',
    nbDefaultOffers: 4,
    avatar: ['seed_avatar_woman_1', 'png'],
    registerDate: new Date('2021-02-23'),
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
    registerDate: new Date('2022-03-12'),
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
    nbDefaultOffers: 7,
    avatar: ['seed_avatar_man_2', 'png'],
    registerDate: new Date('2023-01-05'),
  },
  {
    username: 'david-75',
    email: 'david.doudou@gmail.com',
    nbDefaultOffers: 1,
    registerDate: new Date('2021-12-25'),
  },
  {
    username: 'elisa-72',
    firstname: 'Elisa',
    email: 'elisadu72@gmail.com',
    nbDefaultOffers: 0,
    avatar: ['seed_avatar_woman_2', 'png'],
    registerDate: new Date('2022-06-17'),
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
    registerDate: new Date('2018-07-09'),
  },
  {
    username: 'leTroqueurFou',
    email: 'troqueurfou@gmail.com',
    nbDefaultOffers: 14,
    registerDate: new Date('2019-02-14'),
    avatar: ['seed_avatar_man_3', 'png'],
    ratings: [
      {
        value: 5,
        authorUsername: 'elisa-72',
        note: 'Impeccable, je recommande.',
        date: new Date('2023-06-17'),
      },
      {
        value: 5,
        authorUsername: 'alicedu92',
        note: 'À l\'écoute et très sympathique.',
        date: new Date('2021-09-02'),
      },
      {
        value: 2,
        authorUsername: 'bob-online',
        note: 'Produit endommagé à la réception. Merci de faire plus attention à l\'emballage.',
        date: new Date('2024-02-11'),
      },
      {
        value: 4,
        authorUsername: 'radis-doux-du-sud',
        note: 'Bon échange, je recommande.',
        date: new Date(yesterday),
      },
      {
        value: 5,
        authorUsername: 'alicedu92',
        note: 'Deuxième échange avec ce membre, toujours aussi satisfaite.',
        date: new Date(oneHourAgo),
      },
      {
        value: 5,
        authorUsername: 'david-75',
        note: 'Rien à redire, parfait.',
        date: new Date(oneHourAgo),
      },
    ],
  }
];
