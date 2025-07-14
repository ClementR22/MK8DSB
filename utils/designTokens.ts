// utils/designTokens.ts

import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

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

export const ELEMENT_PICKER_LIST_PADDING = 3;
export const ELEMENT_PICKER_LIST_IMAGE_SIZE = 50;

// Largeurs définies pour la colonne de gauche
export const LEFT_COLUMN_PADDING_HORIZONTAL = 10;
export const LEFT_PANNEL_WIDTH_EXPANDED = screenWidth * 0.7; // 70% de la largeur de l'écran
export const LEFT_PANNEL_WIDTH_COLLAPSED =
  ELEMENT_PICKER_LIST_IMAGE_SIZE + 2 * ELEMENT_PICKER_LIST_PADDING + 2 * LEFT_COLUMN_PADDING_HORIZONTAL; // Slightly wider for the new design
