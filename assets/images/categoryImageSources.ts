import { Category } from "@/data/elements/elementsTypes";
import { ImageSourcePropType } from "react-native";

export const categoryImageSources: { [key in Category]: ImageSourcePropType } = {
  character: require("@/assets/images/elementsImages/characters/Mario.png"),
  body: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  wheel: require("@/assets/images/elementsImages/wheels/Standard.png"),
  glider: require("@/assets/images/elementsImages/gliders/Super Glider.png"),
};
