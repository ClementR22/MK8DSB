import { category4Names } from "@/data/data";
import { CategoryKey } from "@/data/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { useCallback, memo, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native"; // Import Image

interface CategorySelectorProps {
  selectedCategory: CategoryKey;
  setSelectedCategory: (category: CategoryKey) => void;
}

// 1. Define your image sources
// IMPORTANT: Replace these with your actual image paths.
// You might want to categorize them based on element type (character, body, etc.)
// For example, you could have a `categoryImages` object in your `@/data/assets`
// or directly define them here.
const categoryImageSources: { [key in CategoryKey]: any } = {
  character: require("@/assets/images/elementsImages/characters/Mario.png"), // Example: path to Mario image
  body: require("@/assets/images/elementsImages/karts/Standard Kart.png"), // Example: path to Standard Kart image
  wheel: require("@/assets/images/elementsImages/wheels/Standard.png"), // Example: path to Standard Tire image
  glider: require("@/assets/images/elementsImages/gliders/Super Glider.png"), // Example: path to Super Glider image
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  // Destructure specific theme properties via a stable selector.
  const theme = useThemeStore((state) => state.theme);

  // Memoize the common base styles once.
  const memoizedCategoryButtonBaseStyle = useMemo(
    () => [styles.categoryButton, { backgroundColor: theme.surface_container_high }],
    [theme.surface_container_high]
  );

  // The onPress handler for each button. It's stable because setSelectedCategory is stable.
  const handlePress = useCallback(
    (category: CategoryKey) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory]
  );

  return (
    <View style={styles.container}>
      {(category4Names as CategoryKey[]).map((category) => {
        const isSelected = selectedCategory === category;
        const imageSource = categoryImageSources[category];

        return (
          <Pressable
            key={category}
            onPress={() => handlePress(category)}
            style={[
              memoizedCategoryButtonBaseStyle,
              isSelected && { backgroundColor: theme.primary }, // Apply active background if selected
              // Add a border to selected items for better visual feedback
            ]}
          >
            <Image source={imageSource} style={styles.categoryImage} resizeMode="contain" />
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
    justifyContent: "space-between",
    flex: 1,
  },
  categoryButton: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    // Adjust button size to accommodate image if needed
    width: 50, // Example fixed width
    height: 50, // Example fixed height
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  // Keep categoryButtonText style as a fallback or for other uses
  categoryButtonText: {
    fontSize: 14, // Slightly smaller font for fallback to fit
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default memo(CategorySelector);
