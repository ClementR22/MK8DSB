import { Category, SelectedClassIdsByCategory, MultiSelectedClassIdsByCategory } from "@/types/mkw/categories";

type CategoryItem = {
  name: Category;
  imageUrl: ReturnType<typeof require>;
};

export const categories: Category[] = ["character", "body"];

export const numberOfCategories = categories.length;

export const categoriesItems = [
  { name: "character", imageUrl: require("@/assets/images/elementsImages/mkw/characters/Mario.png") } as CategoryItem,

  {
    name: "body",
    imageUrl: require("@/assets/images/elementsImages/mkw/karts/StandardKart.png"),
  } as CategoryItem,
];

export const selectedClassIdsByCategoryInit: SelectedClassIdsByCategory = {
  character: 10,
  body: 20,
};

export const multiSelectedClassIdsByCategoryInit: MultiSelectedClassIdsByCategory = {
  character: new Set(),
  body: new Set(),
};
