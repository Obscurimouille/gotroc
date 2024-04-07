import { EnumCondition, Offer } from '@gotroc/types';
import IMG_A3_1 from '../assets/offers/a3_1.jpg';
import IMG_A3_2 from '../assets/offers/a3_2.jpg';
import IMG_A3_3 from '../assets/offers/a3_3.jpg';
import IMG_A3_4 from '../assets/offers/a3_4.jpg';
import IMG_A3_5 from '../assets/offers/a3_5.jpg';
import IMG_CASQUE_MOTO_1 from '../assets/offers/casque_moto_1.jpg';
import IMG_CASQUE_MOTO_2 from '../assets/offers/casque_moto_2.jpg';
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
import IMG_velo_1 from '../assets/offers/velo_1.jpg';

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
    title: 'Vélo femme',
    price: 110.00,
    category: 'bikes',
    condition: EnumCondition.FAIR,
    description: 'Vélo en très bon état. Vendu avec casque et gourde.',
    images: [IMG_velo_1],
    date: new Date('2024-03-22T18:47:10'),
  },
  {
    id: 2,
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
    title: 'Jeux DS',
    price: 10,
    category: 'toys-and-games',
    condition: EnumCondition.GOOD,
    description: 'Jeux DS en bon état.',
    images: [IMG_JEUX_DS_1],
    date: new Date(twoDaysAgo),
  },
  {
    id: 4,
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
    title: 'Duplex 2 pièces 31 m²',
    price: 770,
    category: 'rentals',
    condition: EnumCondition.GOOD,
    description:
      "Duplex 2 pièces 31 m², Appartement meublé 2 pièces en duplex comprenant : Au RDC : entrée avec placard, salle d'eau avec WC, ainsi qu'un séjour avec cuisine ouverte entièrement équipée. En mezzanine : une chambre spacieuse avec placard et bureau. Grande terrasse commune et place de parking en sous-sol. Proximité immédiate du centre de PESSAC et ses commodités ! Garantie de Loyer Impayé (GLI) en place. Dossier complet à : location @ abaquegestion . fr - Documents d'identité - 2 derniers avis d'impositions - 3 derniers bulletins de salaire - Contrat de travail - Justifcatifs de domicile DOSSIER GARANT POUR ETUDIANT Surface : 31 m² Loyer : 770 € / mois (charges comprises) Montant des charges : 47.60 € / mois Modalité de récupération des charges locatives : Prévisionnelles mensuelles avec régularisation annuelle Honoraires à la charge du locataire : 405.47 € dont 93.57 € pour l’état des lieux Dépôt de garantie : 1444 € Date de réalisation du diagnostic énergétique : 14/03/2024 Consommation énergie primaire : 200 kWh/m²/an Consommation énergie finale : 0 kWh/m²/an Montant estimé des dépenses annuelles d'énergie pour un usage standard : entre 440 € et 630 € par an. Prix moyens des énergies indexés sur l'année 2021 (abonnements compris)",
    images: [IMG_DUPLEX_1, IMG_DUPLEX_2],
    date: new Date(fiveMinutesAgo),
  },
];
