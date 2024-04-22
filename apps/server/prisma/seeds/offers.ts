const now = new Date();

let yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

let twoDaysAgo = new Date();
twoDaysAgo.setDate(now.getDate() - 2);

let oneHourAgo = new Date();
oneHourAgo.setHours(now.getHours() - 1);

let fiveMinutesAgo = new Date();
fiveMinutesAgo.setMinutes(now.getMinutes() - 5);

export const SeedOffers: {
  title: string;
  subCategoryName: string;
  price: number;
  description: string;
  createdAt: Date;
  images: { uuid: string; extension: string }[];
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}[] = [
  {
    title: 'Console PS5',
    subCategoryName: 'consoles',
    price: 500,
    description: 'Console PS5 neuve jamais utilisée. Vendu avec 3 jeux. Prix non négociable.',
    createdAt: new Date('2023-09-20T10:15:00'),
    images: [
      {
        uuid: 'seed_ps5_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_ps5_2',
        extension: 'jpeg',
      },
    ],
    status: 'PENDING',
  },
  {
    title: 'Vélo femme',
    subCategoryName: 'bikes',
    price: 110.0,
    description: 'Vélo femme en bon état.',
    createdAt: new Date('2023-09-20T10:15:00'),
    images: [
      {
        uuid: 'seed_velo_1',
        extension: 'jpg',
      },
    ],
    status: 'REJECTED'
  },
  {
    title: 'Lot de jeux de société dans un état certin lol',
    price: 20.499,
    subCategoryName: 'toys-and-games',
    description: '8 jeux de société en bon état.',
    createdAt: new Date('2023-09-20T10:15:00'),
    images: [
      {
        uuid: 'seed_jeux_societe_1',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Jeux DS',
    price: 10,
    subCategoryName: 'video-games',
    description: 'Jeux DS en bon état.',
    createdAt: new Date('2023-09-20T10:15:00'),
    images: [
      {
        uuid: 'seed_jeux_ds_1',
        extension: 'jpg',
      },
    ],
    status: 'PENDING',
  },
  {
    title: 'Clio 4',
    price: 8890,
    subCategoryName: 'cars',
    description: 'Clio 4 en bon état. Quelques rayures sur la carrosserie.',
    createdAt: new Date('2023-09-20T10:15:00'),
    images: [
      {
        uuid: 'seed_clio_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_clio_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_clio_3',
        extension: 'jpg',
      },
      {
        uuid: 'seed_clio_4',
        extension: 'jpg',
      },
      {
        uuid: 'seed_clio_5',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Yamaha MT-07',
    price: 6000,
    subCategoryName: 'motorbikes',
    description: 'Yamaha MT-07 en bon état. Entretien régulier chez le concessionnaire.',
    createdAt: new Date('2024-04-01T14:21:00'),
    images: [
      {
        uuid: 'seed_mt07_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_mt07_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_mt07_3',
        extension: 'jpg',
      },
      {
        uuid: 'seed_mt07_4',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Honda CB650R',
    price: 7100,
    subCategoryName: 'motorbikes',
    description: 'Honda CB650R avec ABS. Controle technique OK.',
    createdAt: new Date('2024-03-31T11:45:00'),
    images: [
      {
        uuid: 'seed_cb650r_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_cb650r_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_cb650r_3',
        extension: 'jpg',
      },
    ],
    status: 'PENDING',
  },
  {
    title: 'Audi A3',
    price: 15300,
    subCategoryName: 'cars',
    description: 'Audi A3 en excellent état. Entretien régulier chez le concessionnaire.',
    createdAt: new Date('2024-03-15T09:33:00'),
    images: [
      {
        uuid: 'seed_a3_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_a3_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_a3_3',
        extension: 'jpg',
      },
      {
        uuid: 'seed_a3_4',
        extension: 'jpg',
      },
      {
        uuid: 'seed_a3_5',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Porsche 911 GT3 RS',
    price: 218000,
    subCategoryName: 'cars',
    description: 'Porsche 911 GT3 RS. Entretien chez Porsche.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_gt3rs_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_gt3rs_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_gt3rs_3',
        extension: 'jpg',
      },
      {
        uuid: 'seed_gt3rs_4',
        extension: 'jpg',
      },
      {
        uuid: 'seed_gt3rs_5',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Nintendo DS Lite',
    price: 50,
    subCategoryName: 'consoles',
    description: 'Nintendo DS Lite vendu sans chargeur.',
    createdAt: new Date(oneHourAgo),
    images: [
      {
        uuid: 'seed_ds_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_ds_2',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Casque moto',
    price: 50,
    subCategoryName: 'motorbike-equipment',
    description: 'Casque moto modulable en bon état.',
    createdAt: new Date(fiveMinutesAgo),
    images: [
      {
        uuid: 'seed_casque_moto_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_casque_moto_2',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Duplex 2 pièces 31 m²',
    price: 770,
    subCategoryName: 'rentals',
    description:
      "Duplex 2 pièces 31 m², Appartement meublé 2 pièces en duplex comprenant : Au RDC : entrée avec placard, salle d'eau avec WC, ainsi qu'un séjour avec cuisine ouverte entièrement équipée. En mezzanine : une chambre spacieuse avec placard et bureau. Grande terrasse commune et place de parking en sous-sol. Proximité immédiate du centre de PESSAC et ses commodités ! Garantie de Loyer Impayé (GLI) en place. Dossier complet à : location @ abaquegestion . fr - Documents d'identité - 2 derniers avis d'impositions - 3 derniers bulletins de salaire - Contrat de travail - Justifcatifs de domicile DOSSIER GARANT POUR ETUDIANT Surface : 31 m² Loyer : 770 € / mois (charges comprises) Montant des charges : 47.60 € / mois Modalité de récupération des charges locatives : Prévisionnelles mensuelles avec régularisation annuelle Honoraires à la charge du locataire : 405.47 € dont 93.57 € pour l’état des lieux Dépôt de garantie : 1444 € Date de réalisation du diagnostic énergétique : 14/03/2024 Consommation énergie primaire : 200 kWh/m²/an Consommation énergie finale : 0 kWh/m²/an Montant estimé des dépenses annuelles d'énergie pour un usage standard : entre 440 € et 630 € par an. Prix moyens des énergies indexés sur l'année 2021 (abonnements compris)",
    createdAt: new Date(fiveMinutesAgo),
    images: [
      {
        uuid: 'seed_duplex_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_duplex_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_duplex_3',
        extension: 'jpg',
      },
      {
        uuid: 'seed_duplex_4',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Triumph Trident 660',
    price: 8000,
    subCategoryName: 'motorbikes',
    description: 'Triumph Trident 660 en bon état.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_trident_660_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_trident_660_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_trident_660_3',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Audi R8',
    price: 200000,
    subCategoryName: 'cars',
    description: 'Audi R8 en excellent état. Entretien chez Audi.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_r8_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_r8_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_r8_3',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Porsche Cayenne',
    price: 62000,
    subCategoryName: 'cars',
    description: 'Porsche Cayenne en excellent état. Entretien chez Porsche.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_cayenne_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_cayenne_2',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'BMW E46',
    price: 1,
    subCategoryName: 'cars',
    description: 'BMW E46 vente pour pièces.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_e46_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_e46_2',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Peugeot 205 GTI',
    price: 29850,
    subCategoryName: 'cars',
    description: 'Peugeot 205 GTI en excellent état. Entretien chez Peugeot.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_205_gti_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_205_gti_2',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Alpine A110',
    price: 64100,
    subCategoryName: 'cars',
    description: 'Alpine A110 en excellent état. Entretien chez Alpine.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_a110_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_a110_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_a110_3',
        extension: 'jpg',
      },
      {
        uuid: 'seed_a110_4',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Vtech',
    price: 20,
    subCategoryName: 'consoles',
    description: 'Vtech en bon état.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_vtech_1',
        extension: 'jpg',
      },
      {
        uuid: 'seed_vtech_2',
        extension: 'jpg',
      },
      {
        uuid: 'seed_vtech_3',
        extension: 'jpg',
      },
      {
        uuid: 'seed_vtech_4',
        extension: 'jpg',
      },
      {
        uuid: 'seed_vtech_5',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Meuble de cuisine',
    price: 450,
    subCategoryName: 'furnishing',
    description: 'Meuble de cuisine en bon état.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_meuble_cuisine_1',
        extension: 'jpg',
      },
    ],
  },
  {
    title: 'Grille pain',
    price: 20,
    subCategoryName: 'appliances',
    description: 'Grille pain en bon état.',
    createdAt: new Date('2024-03-30T15:12:00'),
    images: [
      {
        uuid: 'seed_grille_pain_1',
        extension: 'jpg',
      },
    ],
  },
];
