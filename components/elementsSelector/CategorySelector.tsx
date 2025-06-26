import { category4Names } from "@/data/data";
import { CategoryKey } from "@/data/elementsData";
import { useThemeStore } from "@/stores/useThemeStore";
import { translate } from "@/translations/translations";
import React, { useCallback, memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CategorySelectorProps {
  selectedCategory: CategoryKey;
  setSelectedCategory: (category: CategoryKey) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useThemeStore((state) => state.theme);

  const categoryButtonStyles = useCallback(
    (category: CategoryKey) => [
      styles.categoryButton,
      { backgroundColor: theme.surface_container_high },
      selectedCategory === category && { backgroundColor: theme.primary },
    ],
    [selectedCategory, theme.surface_container_high, theme.primary]
  );

  const categoryButtonTextStyles = useCallback(
    (category: CategoryKey) => [
      styles.categoryButtonText,
      { color: selectedCategory === category ? theme.on_primary : theme.on_surface },
    ],
    [selectedCategory, theme.on_primary, theme.on_surface]
  );

  return (
    <View style={[styles.categorySelectorContainer, { borderColor: theme.on_surface_variant }]}>
      {(category4Names as CategoryKey[]).map((category) => (
        <Pressable key={category} onPress={() => setSelectedCategory(category)} style={categoryButtonStyles(category)}>
          <Text style={categoryButtonTextStyles(category)}>{translate(category)}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categorySelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default memo(CategorySelector);
