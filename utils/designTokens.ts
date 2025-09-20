import { StyleSheet } from "react-native";

// init
export const HEIGHT_STAT_GAUGE_CONTAINER = 34;
export const BORDER_RADIUS_STAT_GAUGE_CONTAINER = HEIGHT_STAT_GAUGE_CONTAINER / 2; // 17

// Spacing
export const PADDING_SEARCH_CONTAINER = 7;
export const CARD_SPACING = 16;
export const LIST_ITEM_SPACING = 8;
export const PADDING_HORIZONTAL_ELEMENT_CARD = 20; // For screen-level padding
export const BORDER_WIDTH_CATEGORY_SELECTOR = 4;
export const PADDING_PAGINATED_WRAPPER_CONTAINER = 6;
export const MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER = 10;
export const PADDING_SET_CARDS_CONTAINER = 12;
export const MARGIN_CONTAINER_LOWEST = 16;

// calc
export const BORDER_RADIUS_BIG = BORDER_RADIUS_STAT_GAUGE_CONTAINER + PADDING_SEARCH_CONTAINER; // 24
export const BORDER_RADIUS_12 = BORDER_RADIUS_BIG - PADDING_SET_CARDS_CONTAINER; // 12

// Border Radius
export const BORDER_RADIUS_15 = 15;
export const BORDER_RADIUS_18 = 18; // More prominent rounded corners
export const BORDER_RADIUS_INF = 200;
export const BORDER_RADIUS_CATEGORY_SELECTOR = 8; // au lieu de BORDER_RADIUS_12 - PADDING_PAGINATED_WRAPPER_CONTAINER; // = 6

export const BORDER_RADIUS_MODAL_CHILDREN_CONTAINER = BORDER_RADIUS_12;
export const BORDER_RADIUS_MODAL_CONTAINER =
  BORDER_RADIUS_MODAL_CHILDREN_CONTAINER + MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER;

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
export const LEFT_COLUMN_PADDING_HORIZONTAL = BORDER_WIDTH_CATEGORY_SELECTOR;
export const LEFT_PANNEL_WIDTH_EXPANDED = CATEGORY_BUTTON_GALLERY_WIDTH * 4 + BORDER_WIDTH_CATEGORY_SELECTOR * 2;
export const LEFT_PANNEL_WIDTH_COLLAPSED = CATEGORY_BUTTON_GALLERY_WIDTH + BORDER_WIDTH_CATEGORY_SELECTOR * 2;

export const SET_CARD_WIDTH = 220;
