export const SeedCategories: {
  [key: string]: {
    value: string;
    requiresCondition?: boolean;
    requiresMileage?: boolean;
    illustration?: { uuid: string; extension: string };
  }[];
} = {
  vehicles: [
    {
      value: 'cars',
      requiresCondition: true,
      requiresMileage: true,
      illustration: { uuid: 'seed_cars', extension: 'jpg' },
    },
    {
      value: 'motorbikes',
      requiresCondition: true,
      requiresMileage: true,
      illustration: { uuid: 'seed_motorbikes', extension: 'jpg' },
    },
    { value: 'caravans', requiresCondition: true },
    { value: 'auto-equipment', requiresCondition: true },
    { value: 'motorbike-equipment', requiresCondition: true },
  ],
  'real-estate': [
    {
      value: 'real-estate-sales',
      illustration: { uuid: 'seed_real-estate-sales', extension: 'jpg' },
    },
    { value: 'rentals' },
    { value: 'roommates' },
    { value: 'offices-and-shops' },
  ],
  electronics: [
    { value: 'computers', requiresCondition: true },
    { value: 'computer-accessories', requiresCondition: true },
    { value: 'image-and-sound', requiresCondition: true },
    { value: 'phones-and-connected-objects', requiresCondition: true },
    {
      value: 'video-games',
      requiresCondition: true,
      illustration: { uuid: 'seed_video-games', extension: 'jpg' },
    },
    { value: 'tablets-and-e-readers', requiresCondition: true },
  ],
  'home-and-garden': [
    {
      value: 'furnishing',
      requiresCondition: true,
      illustration: { uuid: 'seed_furnishing', extension: 'jpg' },
    },
    { value: 'decoration', requiresCondition: true },
    { value: 'household-linen', requiresCondition: true },
    { value: 'diy', requiresCondition: true },
    { value: 'gardening', requiresCondition: true },
    { value: 'appliances', requiresCondition: true },
  ],
  fashion: [
    {
      value: 'clothing',
      requiresCondition: true,
      illustration: { uuid: 'seed_clothing', extension: 'jpg' },
    },
    { value: 'shoes', requiresCondition: true },
    { value: 'accessories-and-luggage', requiresCondition: true },
    { value: 'watches-and-jewelry', requiresCondition: true },
  ],
  leisure: [
    { value: 'movies', requiresCondition: true },
    { value: 'music', requiresCondition: true },
    {
      value: 'books',
      requiresCondition: true,
      illustration: { uuid: 'seed_books', extension: 'jpg' },
    },
    { value: 'antiques', requiresCondition: true },
    { value: 'toys-and-games', requiresCondition: true },
    { value: 'musical-instruments', requiresCondition: true },
    { value: 'collectibles', requiresCondition: true },
    { value: 'modeling', requiresCondition: true },
    { value: 'bikes', requiresCondition: true },
    { value: 'wine-and-gastronomy' },
  ],
  animals: [
    { value: 'pets' },
    { value: 'accessories', requiresCondition: true },
    { value: 'lost-animals' },
  ],
  services: [
    { value: 'artists-and-musicians' },
    { value: 'babysitting' },
    { value: 'events' },
    { value: 'carpooling' },
    { value: 'neighbor-help' },
    { value: 'tutoring' },
    { value: 'moving' },
    { value: 'guardianship' },
    { value: 'gardening-service' },
    { value: 'cleaning' },
    { value: 'repairs' },
    { value: 'personal-service' },
    { value: 'other-services' },
  ],
};
