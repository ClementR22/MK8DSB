// elementsSelector/selector/useCategorySelectorStyles.ts

import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useThemeStore } from "@/stores/useThemeStore"; // Import your theme store
import { ITEM_CARD_BORDER_RADIUS } from "@/hooks/useItemCardStyle"; // Assuming this is a constant

const CATEGORY_SELECTOR_PADDING = 6;
const IMAGE_HEIGHT = 50;

export const useCategorySelectorStyles = () => {
  const theme = useThemeStore((state) => state.theme);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: "row" as "row", // Explicitly type to avoid inference issues
        width: "100%",
        borderRadius: ITEM_CARD_BORDER_RADIUS,
        overflow: "hidden",
        padding: CATEGORY_SELECTOR_PADDING, // Use the constant defined in this file
        justifyContent: "space-between", // For multiple items in a row
        backgroundColor: theme.primary_container, // Theme color
      },
      buttonWrapper: {
        flex: 1, // Each button takes equal space
        overflow: "hidden",
        borderRadius: 10,
      },
      button: {
        justifyContent: "center" as "center",
        alignItems: "center" as "center",
        height: IMAGE_HEIGHT, // Standard height for expanded buttons
      },
      buttonActive: {
        backgroundColor: theme.primary, // Active theme color
      },
      image: {
        width: IMAGE_HEIGHT * 0.8,
      },
    });
  }, [theme]); // Re-create styles only if theme changes

  return styles;
};
