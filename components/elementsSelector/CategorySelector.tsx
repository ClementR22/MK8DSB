import { category4Names } from "@/data/data";
import { CategoryKey } from "@/data/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import { translate } from "@/translations/translations";
import React, { useCallback, memo, useMemo } from "react"; // Import useMemo explicitly
import { Pressable, StyleSheet, Text, View } from "react-native"; // Import View for layout

interface CategorySelectorProps {
  selectedCategory: CategoryKey;
  setSelectedCategory: (category: CategoryKey) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  // Destructure theme properties directly to avoid re-rendering if only other theme parts change.
  // This is a good pattern for optimizing Zustand selectors.
  const theme = useThemeStore((state) => state.theme);

  // Memoize the common base styles once.
  // These styles don't depend on `selectedCategory` or the individual `category`.
  const memoizedCategoryButtonBaseStyle = useMemo(
    () => [styles.categoryButton, { backgroundColor: theme.surface_container_high }],
    [theme.surface_container_high]
  ); // Only re-create if surface_container_high changes

  const memoizedCategoryButtonTextBaseStyle = useMemo(
    () => [styles.categoryButtonText, { color: theme.on_surface }],
    [theme.on_surface]
  ); // Only re-create if on_surface changes

  // The onPress handler for each button. It's stable because setSelectedCategory is stable.
  // The 'category' parameter makes it dynamic per button.
  const handlePress = useCallback(
    (category: CategoryKey) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory]
  ); // setSelectedCategory is typically stable from parent

  return (
    <View style={styles.container}>
      {(category4Names as CategoryKey[]).map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <Pressable
            key={category}
            onPress={() => handlePress(category)} // Use the memoized handler
            style={[
              memoizedCategoryButtonBaseStyle, // Apply base styles
              isSelected && { backgroundColor: theme.primary }, // Apply active background if selected
            ]}
          >
            <Text
              style={[
                memoizedCategoryButtonTextBaseStyle, // Apply base text styles
                isSelected && { color: theme.on_primary }, // Apply active text color if selected
              ]}
            >
              {translate(category)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default memo(CategorySelector);
