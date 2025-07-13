import { categories } from "@/data/elements/elementsData";
import { Category } from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore"; // Assuming theme store is needed for styles
import React, { memo, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import TooltipWrapper from "@/components/TooltipWrapper";
import { ITEM_CARD_BORDER_RADIUS } from "@/hooks/useItemCardStyle";

const CATEGORY_SELECTOR_PADDING = 6;

interface CategorySelectorProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const categoryImageSources: { [key in Category]: any } = {
  character: require("@/assets/images/elementsImages/characters/Mario.png"),
  body: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  wheel: require("@/assets/images/elementsImages/wheels/Standard.png"),
  glider: require("@/assets/images/elementsImages/gliders/Super Glider.png"),
};

interface categoryOption {
  name: Category;
  imageUrl: any;
}

// Transform your category data into the format expected by ImageButtonSelector
const categoryOptions: categoryOption[] = (categories as Category[]).map((category) => ({
  name: category,
  imageUrl: categoryImageSources[category],
}));

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useThemeStore((state) => state.theme); // Used for activeColor

  const containerDynamicStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.primary_container }],
    [theme.primary_container]
  );

  const buttonActiveStyle = useMemo(() => ({ backgroundColor: theme.primary }), [theme]);

  return (
    <View style={containerDynamicStyle}>
      {categoryOptions.map((category) => {
        const isActive = selectedCategory === category.name;

        return (
          <TooltipWrapper
            key={category.name}
            tooltipText={category.name}
            onPress={() => setSelectedCategory(category.name)}
            style={styles.buttonWrapper}
            innerContainerStyle={[
              styles.button,
              isActive && buttonActiveStyle,
              // Optional: pressed state
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
    overflow: "hidden"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  image: {
    width: "80%",
    height: "80%"
  },
});

export default memo(CategorySelector);
