// elementCompactSelector/selector/CategorySelector.tsx
import { categories } from "@/data/elements/elementsData"; // Assumed to be a stable reference or memoized
import { Category } from "@/data/elements/elementsTypes";
import React, { memo, useMemo, useCallback } from "react"; // Import useCallback
import { Image, View } from "react-native";
import TooltipWrapper from "@/components/TooltipWrapper";
import { useCategorySelectorStyles } from "@/hooks/useCategorySelectorStyles";
import { categoryImageSources } from "@/data/categories/categoryImageSources";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryPress: (category: Category) => void;
}

// Interface for memoized category options
interface MemoizedCategoryOption {
  name: Category;
  imageUrl: any;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategoryPress }) => {
  const styles = useCategorySelectorStyles();

  // Memoize categoryOptions to prevent re-creation on every render
  // Assumes 'categories' array and 'categoryImageSources' object are stable references
  const memoizedCategoryOptions: MemoizedCategoryOption[] = useMemo(() => {
    return (categories as Category[]).map((category) => ({
      name: category,
      imageUrl: categoryImageSources[category],
    }));
  }, [categories, categoryImageSources]); // Dependencies for memoization

  return (
    <View style={styles.container}>
      {/* Use specific expanded style */}
      {memoizedCategoryOptions.map((category) => {
        const isActive = selectedCategory === category.name;

        return (
          <TooltipWrapper
            key={category.name}
            tooltipText={category.name}
            onPress={() => onCategoryPress(category.name)} // Use the memoized handler
            style={styles.buttonWrapper}
            innerContainerStyle={[
              styles.button,
              isActive && styles.buttonActive, // Use active style from hook
            ]}
          >
            <Image source={category.imageUrl} style={styles.image} resizeMode="contain" />
          </TooltipWrapper>
        );
      })}
    </View>
  );
};

export default memo(CategorySelector);
