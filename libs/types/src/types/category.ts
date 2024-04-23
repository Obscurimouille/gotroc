type MainCategory = {
  name: string;
  subCategories?: SubCategory[] | string[];
};

type SubCategory = {
  name: string;
  mainCategoryName: string;
  mainCategory?: MainCategory;
  illustrationUUID?: string;
};

export { MainCategory, SubCategory };