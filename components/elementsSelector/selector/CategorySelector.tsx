import { category4Names } from "@/data/data";
import { CategoryKey } from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore"; // Assuming theme store is needed for styles
import React, { memo } from "react";
import ImageButtonSelector, { ImageButtonOption } from "./ImageButtonSelector"; // Import the generic selector

interface CategorySelectorProps {
  selectedCategory: CategoryKey;
  setSelectedCategory: (category: CategoryKey) => void;
}

const categoryImageSources: { [key in CategoryKey]: any } = {
  character: require("@/assets/images/elementsImages/characters/Mario.png"),
  body: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  wheel: require("@/assets/images/elementsImages/wheels/Standard.png"),
  glider: require("@/assets/images/elementsImages/gliders/Super Glider.png"),
};

// Transform your category data into the format expected by ImageButtonSelector
const categoryOptions: ImageButtonOption[] = (category4Names as CategoryKey[]).map((category) => ({
  key: category,
  imageUrl: categoryImageSources[category],
  label: category, // Optional: add label if you want to display text (e.g., for accessibility or fallback)
}));

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useThemeStore((state) => state.theme); // Used for activeColor

  // Optionally, you can wrap ImageButtonSelector in a View to apply specific category selector styles
  // or just return ImageButtonSelector directly if its internal container styles are sufficient.
  return (
    <ImageButtonSelector
      options={categoryOptions}
      selectionMode="single"
      initialSelection={selectedCategory}
      onSelectionChange={setSelectedCategory}
      activeStyleProperty="backgroundColor" // Based on your original CategorySelector
      activeColor={theme.primary} // Use theme.primary for active state
    />
  );
};

export default memo(CategorySelector);
