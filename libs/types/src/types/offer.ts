import { EnumCondition } from '../enums/enum-condition';

export type OfferImage = {
  imageUUID: string;
  position: number;
};

export type Offer = {
  id: number;
  authorId: number;
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
};
