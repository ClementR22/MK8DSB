// elementCompactSelector/selector/CategorySelectorCollapsed.tsx
import React, { memo } from "react";
import { Image, View, Pressable } from "react-native"; // No need for Text if not used
import { Category } from "@/data/elements/elementsTypes"; // For Category type
import { categoryImageSources } from "@/assets/images/categoryImageSources";
import { useCategorySelectorStyles } from "@/hooks/useCategorySelectorStyles"; // Import the hook

interface CategorySelectorCollapsedProps {
  selectedCategory: Category;
  onCollapsedCategoryPress: () => void; // This is the expand action
}

const CategorySelectorCollapsed: React.FC<CategorySelectorCollapsedProps> = ({
  selectedCategory,
  onCollapsedCategoryPress,
}) => {
  const styles = useCategorySelectorStyles();

  const categoryImage = categoryImageSources[selectedCategory];

  return (
    <Pressable onPress={onCollapsedCategoryPress} style={styles.container}>
      <View style={styles.buttonWrapper}>
        <View style={[styles.button, styles.buttonActive]}>
          <Image source={categoryImage} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </Pressable>
  );
};

export default memo(CategorySelectorCollapsed);
