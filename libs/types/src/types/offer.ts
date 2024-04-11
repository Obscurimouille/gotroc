import { EnumCondition } from "../enums/enum-condition";

export type OfferImage = {
  uuid: string;
  extension: string;
  position: number;
}

export type Offer = {
  id: number;
  authorId: number;
  title: string;
  price: number;
  subCategoryName: string;
  // condition: EnumCondition;
  description: string;
  images: OfferImage[];
  createdAt: Date;
  updatedAt: Date;
}