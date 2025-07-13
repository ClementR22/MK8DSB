// elementsSelector/selector/CategorySelector.tsx
import { categories } from "@/data/elements/elementsData"; // Assumed to be a stable reference or memoized
import { Category } from "@/data/elements/elementsTypes";
import React, { memo, useMemo, useCallback } from "react"; // Import useCallback
import { Image, View } from "react-native";
import TooltipWrapper from "@/components/TooltipWrapper";
import { useCategorySelectorStyles } from "@/hooks/useCategorySelectorStyles";
import { categoryImageSources } from "@/data/categories/categoryImageSources";

interface CategorySelectorProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

// Interface for memoized category options
interface MemoizedCategoryOption {
  name: Category;
  imageUrl: any;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  const styles = useCategorySelectorStyles();

  // Memoize categoryOptions to prevent re-creation on every render
  // Assumes 'categories' array and 'categoryImageSources' object are stable references
  const memoizedCategoryOptions: MemoizedCategoryOption[] = useMemo(() => {
    return (categories as Category[]).map((category) => ({
      name: category,
      imageUrl: categoryImageSources[category],
    }));
  }, [categories, categoryImageSources]); // Dependencies for memoization

  // Use useCallback for the onPress handler to provide a stable function reference
  const handleCategoryPress = useCallback(
    (categoryName: Category) => {
      setSelectedCategory(categoryName);
    },
    [setSelectedCategory] // Dependency array: recreate if setSelectedCategory changes
  );

  return (
    <View style={styles.container}>
      {/* Use specific expanded style */}
      {memoizedCategoryOptions.map((category) => {
        const isActive = selectedCategory === category.name;

        return (
          <TooltipWrapper
            key={category.name}
            tooltipText={category.name}
            onPress={() => handleCategoryPress(category.name)} // Use the memoized handler
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: CATEGORY_SELECTOR_PADDING,
    width: "100%",
    borderRadius: ITEM_CARD_BORDER_RADIUS,
  },
  buttonWrapper: {
    width: "22%", // un peu moins que 1/4
    borderRadius: 10,
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  image: {
    width: "80%",
    height: "80%",
  },
});

export default memo(CategorySelector);
