// elementCompactSelector/selector/useCategorySelectorStyles.ts

import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
// Assuming you have a central place for common constants like a new theme/design system hook or file
import {
  BORDER_RADIUS_18,
  SHADOW_STYLE,
  CATEGORY_SELECTOR_BORDER_WIDTH,
  BORDER_RADIUS_15,
  CATEGORY_BUTTON_GALLERY_WIDTH,
} from "@/utils/designTokens";

const imageSize = 50;

export const useCategorySelectorStyles = (isInGalleryPannel = false) => {
  const theme = useThemeStore((state) => state.theme);

  const styles = useMemo(() => {
    return StyleSheet.create({
      // --- Styles for the Expanded CategorySelector ---
      container: {
        flexDirection: "row" as "row",
        width: "100%",
        justifyContent: "space-between", // Distribute items more evenly, possibly with padding around them
        overflow: "hidden" as "hidden",
        borderRadius: BORDER_RADIUS_15, // Use a larger, more prominent radius
        backgroundColor: theme.surface_container, // Use surface color for card-like elements
        ...SHADOW_STYLE, // Apply shadow
        borderWidth: CATEGORY_SELECTOR_BORDER_WIDTH, // Use consistent spacing token
        borderColor: "transparent",
      },
      buttonWrapper: {
        width: isInGalleryPannel ? CATEGORY_BUTTON_GALLERY_WIDTH : "25%",
      },
      button: {
        justifyContent: "center" as "center",
        alignItems: "center" as "center",
        width: "100%",
        borderRadius: BORDER_RADIUS_18 / 2, // Slightly less rounded than container
        overflow: "hidden" as "hidden",
        height: imageSize, // Slightly larger buttons for better touch target
        //    backgroundColor: theme.surface, // A subtle background for non-selected buttons
      },
      buttonActive: {
        backgroundColor: theme.primary, // Primary color for active button
        // Add a subtle border or heavier shadow for active state if desired
        // borderWidth: 2,
        // borderColor: theme.outline,
      },

      // --- Common Styles (Applied directly to the Image) ---
      image: {
        width: imageSize,
        height: imageSize * 0.8,
      },
    });
  }, [theme]);

  return styles;
};
