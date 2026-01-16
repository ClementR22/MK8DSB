import { Category, SelectedClassIdsByCategory, MultiSelectedClassIdsByCategory } from "@/types/mk8d/categories";

type CategoryItem = {
  name: Category;
  imageUrl: ReturnType<typeof require>;
};

export const categories: Category[] = ["character", "body", "wheel", "glider"];

export const numberOfCategories = categories.length;

export const categoriesItems = [
  { name: "character", imageUrl: require("@/assets/images/elementsImages/mk8d/characters/Mario.png") } as CategoryItem,

  {
    name: "body",
    imageUrl: require("@/assets/images/elementsImages/mk8d/karts/StandardKart.png"),
  } as CategoryItem,

  {
    name: "wheel",
    imageUrl: require("@/assets/images/elementsImages/mk8d/wheels/Standard.png"),
  } as CategoryItem,

  {
    name: "glider",
    imageUrl: require("@/assets/images/elementsImages/mk8d/gliders/SuperGlider.png"),
  } as CategoryItem,
];

export const selectedClassIdsByCategoryInit: SelectedClassIdsByCategory = {
  character: 9,
  body: 16,
  wheel: 30,
  glider: 39,
};

export const multiSelectedClassIdsByCategoryInit: MultiSelectedClassIdsByCategory = {
  character: new Set(),
  body: new Set(),
  wheel: new Set(),
  glider: new Set(),
};
