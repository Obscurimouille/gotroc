import { EnumCondition } from "../enums/enum-condition";

export type Offer = {
  id: number;
  userId: number;
  title: string;
  price: number;
  category: string;
  condition: EnumCondition;
  description: string;
  images: string[];
  date: Date;
}