import { EnumCondition, Offer } from '@gotroc/types';
import IMG_205_GTI_1 from '../assets/offers/205_gti_1.jpg';
import IMG_205_GTI_2 from '../assets/offers/205_gti_2.jpg';
import IMG_A110_1 from '../assets/offers/a110_1.jpg';
import IMG_A110_2 from '../assets/offers/a110_2.jpg';
import IMG_A3_1 from '../assets/offers/a3_1.jpg';
import IMG_A3_2 from '../assets/offers/a3_2.jpg';
import IMG_A3_3 from '../assets/offers/a3_3.jpg';
import IMG_A3_4 from '../assets/offers/a3_4.jpg';
import IMG_A3_5 from '../assets/offers/a3_5.jpg';
import IMG_CASQUE_MOTO_1 from '../assets/offers/casque_moto_1.jpg';
import IMG_CASQUE_MOTO_2 from '../assets/offers/casque_moto_2.jpg';
import IMG_CAYENNE_1 from '../assets/offers/cayenne_1.jpg';
import IMG_CAYENNE_2 from '../assets/offers/cayenne_2.jpg';
import IMG_CB650R_1 from '../assets/offers/cb650r_1.jpg';
import IMG_CB650R_2 from '../assets/offers/cb650r_2.jpg';
import IMG_CB650R_3 from '../assets/offers/cb650r_3.jpg';
import IMG_CLIO_1 from '../assets/offers/clio_1.jpg';
import IMG_CLIO_2 from '../assets/offers/clio_2.jpg';
import IMG_CLIO_3 from '../assets/offers/clio_3.jpg';
import IMG_CLIO_4 from '../assets/offers/clio_4.jpg';
import IMG_CLIO_5 from '../assets/offers/clio_5.jpg';
import IMG_DS_1 from '../assets/offers/ds_1.jpg';
import IMG_DS_2 from '../assets/offers/ds_2.jpg';
import IMG_DUPLEX_1 from '../assets/offers/duplex_1.jpg';
import IMG_DUPLEX_2 from '../assets/offers/duplex_2.jpg';
import IMG_E46_1 from '../assets/offers/e46_1.jpg';
import IMG_E46_2 from '../assets/offers/e46_2.jpg';
import IMG_GT3RS_1 from '../assets/offers/gt3rs_1.jpg';
import IMG_GT3RS_2 from '../assets/offers/gt3rs_2.jpg';
import IMG_GT3RS_3 from '../assets/offers/gt3rs_3.jpg';
import IMG_GT3RS_4 from '../assets/offers/gt3rs_4.jpg';
import IMG_GT3RS_5 from '../assets/offers/gt3rs_5.jpg';
import IMG_JEUX_DS_1 from '../assets/offers/jeux_ds_1.jpg';
import IMG_JEUX_SOCIETE_1 from '../assets/offers/jeux_societe_1.jpg';
import IMG_MT07_1 from '../assets/offers/mt07_1.jpg';
import IMG_MT07_2 from '../assets/offers/mt07_2.jpg';
import IMG_MT07_3 from '../assets/offers/mt07_3.jpg';
import IMG_MT07_4 from '../assets/offers/mt07_4.jpg';
import IMG_PS5_1 from '../assets/offers/ps5_1.jpg';
import IMG_PS5_2 from '../assets/offers/ps5_2.jpeg';
import IMG_R8_1 from '../assets/offers/r8_1.jpg';
import IMG_R8_2 from '../assets/offers/r8_2.jpg';
import IMG_R8_3 from '../assets/offers/r8_3.jpg';
import IMG_TRIDENT_660_1 from '../assets/offers/trident_660_1.jpg';
import IMG_TRIDENT_660_2 from '../assets/offers/trident_660_2.jpg';
import IMG_TRIDENT_660_3 from '../assets/offers/trident_660_3.jpg';
import IMG_VELO_1 from '../assets/offers/velo_1.jpg';
import IMG_VTECH_1 from '../assets/offers/vtech_1.jpg';
import IMG_VTECH_2 from '../assets/offers/vtech_2.jpg';
import IMG_VTECH_3 from '../assets/offers/vtech_3.jpg';
import IMG_VTECH_4 from '../assets/offers/vtech_4.jpg';
import IMG_VTECH_5 from '../assets/offers/vtech_5.jpg';
import IMG_MEUBLE_CUISINE_1 from '../assets/offers/meuble_cuisine_1.jpg';
import IMG_GRILLE_PAIN_1 from '../assets/offers/grille_pain_1.jpg';
import IMG_SHREK_1 from '../assets/offers/shrek_1.jpeg';
import IMG_SHREK_2 from '../assets/offers/shrek_2.jpeg';

const now = new Date();
let yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

let twoDaysAgo = new Date();
twoDaysAgo.setDate(now.getDate() - 2);

let oneHourAgo = new Date();
oneHourAgo.setHours(now.getHours() - 1);

let fiveMinutesAgo = new Date();
fiveMinutesAgo.setMinutes(now.getMinutes() - 5);

export const Offers: Offer[] = [
  {
    id: 0,
    userId: 1,
    title: 'Console PS5',
    price: 500,
    category: 'consoles',
    condition: EnumCondition.GOOD,
    description: 'Console PS5 neuve jamais utilisée. Vendu avec 3 jeux. Prix non négociable.',
    images: [IMG_PS5_1, IMG_PS5_2],
    date: new Date('2024-03-17T12:01:30'),
  },
  {
    id: 1,
    userId: 2,
    title: 'Vélo femme',
    price: 110.00,
    category: 'bikes',
    condition: EnumCondition.FAIR,
    description: 'Vélo en très bon état. Vendu avec casque et gourde.',
    images: [IMG_VELO_1],
    date: new Date('2024-03-22T18:47:10'),
  },
  {
    id: 2,
    userId: 1,
    title: 'Lot de jeux de société dans un état certin lol',
    price: 20.499,
    category: 'toys-and-games',
    condition: EnumCondition.GOOD,
    description: '8 jeux de société en bon état.',
    images: [IMG_JEUX_SOCIETE_1],
    date: new Date(yesterday),
  },
  {
    id: 3,
    userId: 3,
    title: 'Jeux DS',
    price: 10,
    category: 'video-games',
    condition: EnumCondition.GOOD,
    description: 'Jeux DS en bon état.',
    images: [IMG_JEUX_DS_1],
    date: new Date(twoDaysAgo),
  },
  {
    id: 4,
    userId: 2,
    title: 'Clio 4',
    price: 8890,
    category: 'cars',
    condition: EnumCondition.FAIR,
    description: 'Clio 4 en bon état. Quelques rayures sur la carrosserie.',
    images: [IMG_CLIO_1, IMG_CLIO_2, IMG_CLIO_3, IMG_CLIO_4, IMG_CLIO_5],
    date: new Date('2023-09-20T10:15:00'),
  },
  {
    id: 5,
    userId: 1,
    title: 'Yamaha MT-07',
    price: 6000,
    category: 'motorbikes',
    condition: EnumCondition.GOOD,
    description: 'Yamaha MT-07 en bon état. Entretien régulier chez le concessionnaire.',
    images: [IMG_MT07_1, IMG_MT07_2, IMG_MT07_3, IMG_MT07_4],
    date: new Date('2024-04-01T14:21:00'),
  },
  {
    id: 6,
    userId: 3,
    title: 'Honda CB650R',
    price: 7100,
    category: 'motorbikes',
    condition: EnumCondition.GOOD,
    description: 'Honda CB650R avec ABS. Controle technique OK.',
    images: [IMG_CB650R_1, IMG_CB650R_2, IMG_CB650R_3],
    date: new Date('2024-03-31T11:45:00'),
  },
  {
    id: 7,
    userId: 2,
    title: 'Audi A3',
    price: 15300,
    category: 'cars',
    condition: EnumCondition.EXCELLENT,
    description: 'Audi A3 en excellent état. Entretien régulier chez le concessionnaire.',
    images: [IMG_A3_1, IMG_A3_2, IMG_A3_3, IMG_A3_4, IMG_A3_5],
    date: new Date('2024-03-15T09:33:00'),
  },
  {
    id: 8,
    userId: 3,
    title: 'Porsche 911 GT3 RS',
    price: 218000,
    category: 'cars',
    condition: EnumCondition.EXCELLENT,
    description: 'Porsche 911 GT3 RS. Entretien chez Porsche.',
    images: [IMG_GT3RS_1, IMG_GT3RS_2, IMG_GT3RS_3, IMG_GT3RS_4, IMG_GT3RS_5],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 9,
    userId: 1,
    title: 'Nintendo DS Lite',
    price: 50,
    category: 'consoles',
    condition: EnumCondition.FAIR,
    description: 'Nintendo DS Lite vendu sans chargeur.',
    images: [IMG_DS_1, IMG_DS_2],
    date: new Date(oneHourAgo),
  },
  {
    id: 10,
    userId: 2,
    title: 'Casque moto',
    price: 50,
    category: 'motorbike-equipment',
    condition: EnumCondition.GOOD,
    description: 'Casque moto modulable en bon état.',
    images: [IMG_CASQUE_MOTO_1, IMG_CASQUE_MOTO_2],
    date: new Date(fiveMinutesAgo),
  },
  {
    id: 11,
    userId: 3,
    title: 'Duplex 2 pièces 31 m²',
    price: 770,
    category: 'rentals',
    condition: EnumCondition.GOOD,
    description:
      "Duplex 2 pièces 31 m², Appartement meublé 2 pièces en duplex comprenant : Au RDC : entrée avec placard, salle d'eau avec WC, ainsi qu'un séjour avec cuisine ouverte entièrement équipée. En mezzanine : une chambre spacieuse avec placard et bureau. Grande terrasse commune et place de parking en sous-sol. Proximité immédiate du centre de PESSAC et ses commodités ! Garantie de Loyer Impayé (GLI) en place. Dossier complet à : location @ abaquegestion . fr - Documents d'identité - 2 derniers avis d'impositions - 3 derniers bulletins de salaire - Contrat de travail - Justifcatifs de domicile DOSSIER GARANT POUR ETUDIANT Surface : 31 m² Loyer : 770 € / mois (charges comprises) Montant des charges : 47.60 € / mois Modalité de récupération des charges locatives : Prévisionnelles mensuelles avec régularisation annuelle Honoraires à la charge du locataire : 405.47 € dont 93.57 € pour l’état des lieux Dépôt de garantie : 1444 € Date de réalisation du diagnostic énergétique : 14/03/2024 Consommation énergie primaire : 200 kWh/m²/an Consommation énergie finale : 0 kWh/m²/an Montant estimé des dépenses annuelles d'énergie pour un usage standard : entre 440 € et 630 € par an. Prix moyens des énergies indexés sur l'année 2021 (abonnements compris)",
    images: [IMG_DUPLEX_1, IMG_DUPLEX_2],
    date: new Date(fiveMinutesAgo),
  },
  {
    id: 12,
    userId: 1,
    title: 'Triumph Trident 660',
    price: 8000,
    category: 'motorbikes',
    condition: EnumCondition.GOOD,
    description: 'Triumph Trident 660 en bon état.',
    images: [IMG_TRIDENT_660_1, IMG_TRIDENT_660_2, IMG_TRIDENT_660_3],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 13,
    userId: 4,
    title: 'Audi R8',
    price: 200000,
    category: 'cars',
    condition: EnumCondition.EXCELLENT,
    description: 'Audi R8 en excellent état. Entretien chez Audi.',
    images: [IMG_R8_1, IMG_R8_2, IMG_R8_3],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 14,
    userId: 3,
    title: 'Porsche Cayenne',
    price: 62000,
    category: 'cars',
    condition: EnumCondition.EXCELLENT,
    description: 'Porsche Cayenne en excellent état. Entretien chez Porsche.',
    images: [IMG_CAYENNE_1, IMG_CAYENNE_2],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 15,
    userId: 2,
    title: 'BMW E46',
    price: 1,
    category: 'cars',
    condition: EnumCondition.DAMAGED,
    description: 'BMW E46 vente pour pièces.',
    images: [IMG_E46_1, IMG_E46_2],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 16,
    userId: 4,
    title: 'Peugeot 205 GTI',
    price: 29850,
    category: 'cars',
    condition: EnumCondition.GOOD,
    description: 'Peugeot 205 GTI en excellent état. Entretien chez Peugeot.',
    images: [IMG_205_GTI_1, IMG_205_GTI_2],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 17,
    userId: 1,
    title: 'Alpine A110',
    price: 64100,
    category: 'cars',
    condition: EnumCondition.EXCELLENT,
    description: 'Alpine A110 en excellent état. Entretien chez Alpine.',
    images: [IMG_A110_1, IMG_A110_2],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 18,
    userId: 2,
    title: 'Vtech',
    price: 20,
    category: 'consoles',
    condition: EnumCondition.FAIR,
    description: 'Vtech en bon état.',
    images: [IMG_VTECH_1, IMG_VTECH_2, IMG_VTECH_3, IMG_VTECH_4, IMG_VTECH_5],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 19,
    userId: 3,
    title: 'Meuble de cuisine',
    price: 450,
    category: 'furnishing',
    condition: EnumCondition.FAIR,
    description: 'Meuble de cuisine en bon état.',
    images: [IMG_MEUBLE_CUISINE_1],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 20,
    userId: 4,
    title: 'Grille pain',
    price: 20,
    category: 'appliances',
    condition: EnumCondition.GOOD,
    description: 'Grille pain en bon état.',
    images: [IMG_GRILLE_PAIN_1],
    date: new Date('2024-03-30T15:12:00'),
  },
  {
    id: 21,
    userId: 1,
    title: 'Ménage à domicile',
    price: 20,
    category: 'cleaning',
    condition: EnumCondition.GOOD,
    description: 'Ménage à domicile.',
    images: [IMG_SHREK_1, IMG_SHREK_2],
    date: new Date('2024-03-30T15:12:00'),
  }
];
