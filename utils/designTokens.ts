// utils/designTokens.ts

import { StyleSheet } from "react-native";

// Spacing
export const CARD_SPACING = 16;
export const LIST_ITEM_SPACING = 8;
export const PADDING_HORIZONTAL = 20; // For screen-level padding
export const CATEGORY_SELECTOR_PADDING = 6;

// Border Radius
export const BORDER_RADIUS_8 = 8;
export const BORDER_RADIUS_12 = 12;
export const BORDER_RADIUS_15 = 15;
export const BORDER_RADIUS_18 = 18; // More prominent rounded corners

// Shadows (for depth)
export const SHADOW_STYLE = StyleSheet.create({
  shadow: {
    shadowColor: "#000", // Black shadow
    shadowOffset: {
      width: 0,
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.15, // Softer shadow
    shadowRadius: 3.84, // Blur radius
    elevation: 5, // Android shadow
  },
}).shadow;

export const SHADOW_STYLE_LIGHT = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
}).shadow;
