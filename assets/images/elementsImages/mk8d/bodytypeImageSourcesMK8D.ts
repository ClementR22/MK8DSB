import { Bodytype } from "@/types/mk8d/bodytypes";
import { ImageSourcePropType } from "react-native";

export const bodytypeImageSourcesMK8D: { [key in Bodytype]: ImageSourcePropType } = {
  kart: require("@/assets/images/elementsImages/mk8d/karts/Standard Kart.png"),
  bike: require("@/assets/images/elementsImages/mk8d/bikes/Standard Bike.png"),
  sportBike: require("@/assets/images/elementsImages/mk8d/sportBikes/Sport Bike.png"),
  ATV: require("@/assets/images/elementsImages/mk8d/ATVs/Standard ATV.png"),
};
