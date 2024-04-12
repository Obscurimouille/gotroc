type MainCategory = {
  name: string;
  subCategories?: SubCategory[] | string[];
};

type SubCategory = {
  name: string;
  mainCategoryName: string;
  mainCategory?: MainCategory;
};

export { MainCategory, SubCategory };