// components/CategorySelector.tsx
import React, { memo } from "react";
import { Category } from "@/data/elements/elementsTypes";
import IconSelector from "./IconSelector";
import { categoryImageSources } from "@/assets/images/categoryImageSources";
import { useThemeStore } from "@/stores/useThemeStore";
import { useCategorySelectorStyles } from "@/hooks/useCategorySelectorStyles";
import { Animated, StyleSheet } from "react-native";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryPress: (category: Category) => void;
  isInGalleryPannel?: boolean;
  animatedCategoryMarginLeft?: Animated.Value;
}

const categoryOptions = Object.entries(categoryImageSources).map(([name, imageUrl]) => ({
  name: name as Category,
  imageUrl,
}));

const CategorySelector: React.FC<CategorySelectorProps> = memo(
  ({
    selectedCategory,
    onCategoryPress,
    isInGalleryPannel = false,
    animatedCategoryMarginLeft = new Animated.Value(0),
  }) => {
    const styles = useCategorySelectorStyles(isInGalleryPannel);

    return (
      <IconSelector<Category>
        options={categoryOptions}
        selectedValues={selectedCategory}
        onSelect={onCategoryPress}
        buttonStyle={styles.button}
        buttonWrapperStyle={styles.buttonWrapper}
        activeStyle={styles.buttonActive}
        containerStyle={styles.container}
        imageStyle={styles.image}
        overlapAmount={animatedCategoryMarginLeft}
      />
    );
  }
);

export default CategorySelector;
