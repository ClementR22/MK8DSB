import { BodytypeMK8D } from "@/types/mk8d/bodytypes";
import { ImageSourcePropType } from "react-native";

export const bodytypeImageSourcesMK8D: { [key in BodytypeMK8D]: ImageSourcePropType } = {
  kart: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  bike: require("@/assets/images/elementsImages/bikes/Standard Bike.png"),
  sportBike: require("@/assets/images/elementsImages/sportBikes/Sport Bike.png"),
  ATV: require("@/assets/images/elementsImages/ATVs/Standard ATV.png"),
};
