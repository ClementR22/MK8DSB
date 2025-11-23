import { Category } from "@/types/mk8d/categories";
import { ImageSourcePropType } from "react-native";

export const categoryImageSources: { [key in Category]: ImageSourcePropType } = {
  character: require("@/assets/images/elementsImages/mk8d/characters/Mario.png"),
  body: require("@/assets/images/elementsImages/mk8d/karts/Standard Kart.png"),
  wheel: require("@/assets/images/elementsImages/mk8d/wheels/Standard.png"),
  glider: require("@/assets/images/elementsImages/mk8d/gliders/Super Glider.png"),
};
