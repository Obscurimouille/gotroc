export type MainCategory = {
  name: string;
  icon?: string;
  subCategories: Category[];
};

export type Category = {
  name: string;
  value: string;
};