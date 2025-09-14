// utils/designTokens.ts

import { StyleSheet } from "react-native";

// Spacing
export const CARD_SPACING = 16;
export const LIST_ITEM_SPACING = 8;
export const PADDING_HORIZONTAL = 20; // For screen-level padding
export const CATEGORY_SELECTOR_BORDER_WIDTH = 6;

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

export const CATEGORY_BUTTON_GALLERY_WIDTH = 60;
export const ELEMENT_PICKER_LIST_IMAGE_SIZE = CATEGORY_BUTTON_GALLERY_WIDTH;
export const ELEMENT_PICKER_LIST_IMAGE_RATIO = 1.1;

// Largeurs définies pour la colonne de gauche
export const LEFT_COLUMN_PADDING_HORIZONTAL = CATEGORY_SELECTOR_BORDER_WIDTH;
export const LEFT_PANNEL_WIDTH_EXPANDED = CATEGORY_BUTTON_GALLERY_WIDTH * 4 + CATEGORY_SELECTOR_BORDER_WIDTH * 2;
export const LEFT_PANNEL_WIDTH_COLLAPSED = CATEGORY_BUTTON_GALLERY_WIDTH + CATEGORY_SELECTOR_BORDER_WIDTH * 2;

export const SET_CARD_WIDTH = 220;
