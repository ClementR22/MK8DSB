import { Bodytype } from "@/types/bodytypesTypes";
import { ImageSourcePropType } from "react-native";

export const bodytypeImageSources: { [key in Bodytype]: ImageSourcePropType } = {
  kart: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  bike: require("@/assets/images/elementsImages/bikes/Standard Bike.png"),
  sportBike: require("@/assets/images/elementsImages/sportBikes/Sport Bike.png"),
  ATV: require("@/assets/images/elementsImages/ATVs/Standard ATV.png"),
};
