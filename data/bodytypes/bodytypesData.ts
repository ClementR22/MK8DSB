import { Bodytype, BodytypeItem } from "../../types/bodytypesTypes";

export const bodytypeNames: Bodytype[] = ["kart", "bike", "sportBike", "ATV"];

export const bodytypesData = [
  {
    name: "kart",
    imageUrl: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  } as BodytypeItem,

  {
    name: "bike",
    imageUrl: require("@/assets/images/elementsImages/bikes/Standard Bike.png"),
  } as BodytypeItem,
  {
    name: "sportBike",
    imageUrl: require("@/assets/images/elementsImages/sportBikes/Sport Bike.png"),
  } as BodytypeItem,
  {
    name: "ATV",
    imageUrl: require("@/assets/images/elementsImages/ATVs/Standard ATV.png"),
  } as BodytypeItem,
];
