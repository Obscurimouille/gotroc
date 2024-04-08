import { MainCategory } from "@gotroc/types";

export const Categories: MainCategory[] = [
  {
    name: 'Véhicules',
    value: 'vehicles',
    subCategories: [
      { name: 'Voitures', value: 'cars' },
      { name: 'Motos', value: 'motorbikes' },
      { name: 'Caravanes', value: 'caravans' },
      { name: 'Utilitaires', value: 'utilities' },
      { name: 'Equipement Auto', value: 'auto-equipment' },
      { name: 'Equipement Moto', value: 'motorbike-equipment' },
    ],
  },
  {
    name: 'Immobilier',
    value: 'real-estate',
    subCategories: [
      { name: 'Ventes immobilières', value: 'real-estate-sales' },
      { name: 'Locations', value: 'rentals' },
      { name: 'Colocations', value: 'roommates' },
      { name: 'Bureaux & Commerces', value: 'offices-and-shops' },
    ],
  },
  {
    name: 'Electronique',
    value: 'electronics',
    subCategories: [
      { name: 'Ordinateurs', value: 'computers' },
      { name: 'Accessoires informatique', value: 'computer-accessories' },
      { name: 'Image & Son', value: 'image-and-sound' },
      { name: 'Téléphones & Objets connectés', value: 'phones-and-connected-objects' },
      { name: 'Jeux vidéos', value: 'video-games' },
      { name: 'Consoles', value: 'consoles' },
      { name: 'Tablettes et liseuses', value: 'tablets-and-e-readers' },
    ],
  },
  {
    name: 'Maison & Jardin',
    value: 'home-and-garden',
    subCategories: [
      { name: 'Ameublement', value: 'furnishing' },
      { name: 'Décoration', value: 'decoration' },
      { name: 'Linge de maison', value: 'household-linen' },
      { name: 'Bricolage', value: 'diy' }, // Ajout de la valeur pour Bricolage
      { name: 'Jardinage', value: 'gardening' }, // Ajout de la valeur pour Jardinage
      { name: 'Electroménager', value: 'appliances' }, // Ajout de la valeur pour Electroménager
    ],
  },
  {
    name: 'Mode',
    value: 'fashion',
    subCategories: [
      { name: 'Vêtements', value: 'clothing' }, // Ajout de la valeur pour Vêtements
      { name: 'Chaussures', value: 'shoes' }, // Ajout de la valeur pour Chaussures
      { name: 'Accessoires & Bagagerie', value: 'accessories-and-luggage' }, // Ajout de la valeur pour Accessoires & Bagagerie
      { name: 'Montres & Bijoux', value: 'watches-and-jewelry' }, // Ajout de la valeur pour Montres & Bijoux
    ],
  },
  {
    name: 'Loisirs',
    value: 'leisure',
    subCategories: [
      { name: 'DVD & Films', value: 'movies' }, // Ajout de la valeur pour DVD & Films
      { name: 'CD & Musique', value: 'music' }, // Ajout de la valeur pour CD & Musique
      { name: 'Livres', value: 'books' }, // Ajout de la valeur pour Livres
      { name: 'Antiquités', value: 'antiques' }, // Ajout de la valeur pour Antiquités
      { name: 'Jouets & Jeux', value: 'toys-and-games' }, // Ajout de la valeur pour Jouets & Jeux
      { name: 'Instruments de musique', value: 'musical-instruments' }, // Ajout de la valeur pour Instruments de musique
      { name: 'Collection', value: 'collectibles' }, // Ajout de la valeur pour Collection
      { name: 'Modélisme', value: 'modeling' }, // Ajout de la valeur pour Modélisme
      { name: 'Vélos', value: 'bikes' }, // Ajout de la valeur pour Vélos
      { name: 'Vins et Gastronomie', value: 'wine-and-gastronomy' }, // Ajout de la valeur pour Vins et Gastronomie
    ],
  },
  {
    name: 'Animaux',
    value: 'animals',
    subCategories: [
      { name: 'Animaux', value: 'pets' }, // Ajout de la valeur pour Animaux
      { name: 'Accessoires', value: 'accessories' }, // Ajout de la valeur pour Accessoires
      { name: 'Animaux perdus', value: 'lost-animals' }, // Ajout de la valeur pour Animaux perdus
    ],
  },
  {
    name: 'Services',
    value: 'services',
    subCategories: [
      { name: 'Artistes et Musiciens', value: 'artists-and-musicians' },
      { name: 'Baby-sitting', value: 'babysitting' }, // Ajout de la valeur pour Baby-sitting
      { name: 'Evénements', value: 'events' }, // Ajout de la valeur pour Evénements
      { name: 'Covoiturage', value: 'carpooling' }, // Ajout de la valeur pour Covoiturage
      { name: 'Entraide entre voisins', value: 'neighbor-help' }, // Ajout de la valeur pour Entraide entre voisins
      { name: 'Cours particuliers', value: 'tutoring' }, // Ajout de la valeur pour Cours particuliers
      { name: 'Déménagement', value: 'moving' }, // Ajout de la valeur pour Déménagement
      { name: 'Gardiennage', value: 'guardianship' }, // Ajout de la valeur pour Gardiennage
      { name: 'Jardinnage', value: 'gardening-service' }, // Ajout de la valeur pour Jardinnage
      { name: 'Ménage', value: 'cleaning' }, // Ajout de la valeur pour Ménage
      { name: 'Travaux et Réparations', value: 'repairs' }, // Ajout de la valeur pour Travaux et Réparations
      { name: 'Service à la personne', value: 'personal-service' }, // Ajout de la valeur pour Service à la personne
      { name: 'Autres services', value: 'other-services' }, // Ajout de la valeur pour Autres services
    ],
  },
  {
    name: 'Materiel professionnel',
    value: 'professional-equipment',
    subCategories: [
      { name: 'Matériel agricole', value: 'agricultural-equipment' }, // Ajout de la valeur pour Matériel agricole
      { name: 'Tracteurs', value: 'tractors' }, // Ajout de la valeur pour Tracteurs
      { name: 'Poids lourds', value: 'heavy-duty' }, // Ajout de la valeur pour Poids lourds
      { name: 'Transport - Manutention', value: 'transport-and-handling' }, // Ajout de la valeur pour Transport - Manutention
      { name: 'BTP - Chantier Gros-oeuvre', value: 'construction-and-heavy-work' }, // Ajout de la valeur pour BTP - Chantier Gros-oeuvre
      { name: 'Outillage', value: 'tools' }, // Ajout de la valeur pour Outillage
      { name: 'Équipements Industriels', value: 'industrial-equipment' }, // Ajout de la valeur pour Équipements Industriels
      { name: 'Restauration - Hôtellerie', value: 'restaurant-and-hotel' }, // Ajout de la valeur pour Restauration - Hôtellerie
      { name: 'Fournitures de Bureau', value: 'office-supplies' }, // Ajout de la valeur pour Fournitures de Bureau
      { name: 'Matériaux', value: 'materials' }, // Ajout de la valeur pour Matériaux
      { name: 'Matériel Médical', value: 'medical-equipment' }, // Ajout de la valeur pour Matériel Médical
    ],
  },
];
