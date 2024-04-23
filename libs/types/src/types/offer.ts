import { User } from './user';

type OfferImage = {
  imageUUID: string;
  position: number;
};

type Offer = {
  id: number;
  authorId: number;
  author: User;
  title: string;
  price: number;
  subCategoryName: string;
  subCategory?: {
    name: string;
    mainCategoryName: string;
  };
  // condition: EnumCondition;
  description: string;
  images: OfferImage[];
  createdAt: Date;
  updatedAt: Date;
  bookmarked?: boolean;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
};

type Rating = {
  id: number;
  authorId: number;
  author?: User;
  targetId: number;
  value: number;
  note?: string;
  datetime: Date;
};

export { Rating, Offer, OfferImage };
