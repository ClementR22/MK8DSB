// components/CategorySelector.tsx
import React, { memo } from "react";
import { Category } from "@/data/elements/elementsTypes";
import IconSelector from "./IconSelector";
import { categoryImageSources } from "@/assets/images/categoryImageSources";
import { useThemeStore } from "@/stores/useThemeStore";
import { useCategorySelectorStyles } from "@/hooks/useCategorySelectorStyles";
import { StyleSheet } from "react-native";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryPress: (category: Category) => void;
}

const categoryOptions = Object.entries(categoryImageSources).map(([name, imageUrl]) => ({
  name: name as Category,
  imageUrl,
}));

const CategorySelector: React.FC<CategorySelectorProps> = memo(({ selectedCategory, onCategoryPress }) => {
  const styles = useCategorySelectorStyles();

  return (
    <IconSelector<Category>
      options={categoryOptions}
      selectedValues={selectedCategory}
      onSelect={onCategoryPress}
      buttonBaseStyle={StyleSheet.flatten([styles.buttonWrapper, styles.button])}
      activeStyle={styles.buttonActive}
      containerStyle={styles.container}
      imageStyle={styles.image}
    />
  );
});

export default CategorySelector;
