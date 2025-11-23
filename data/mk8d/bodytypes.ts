import { Bodytype } from "@/types/mk8d/bodytypes";

type BodytypeItem = {
  name: Bodytype;
  imageUrl: ReturnType<typeof require>;
};

export const bodytypeNames: Bodytype[] = ["kart", "bike", "sportBike", "ATV"];

export const bodytypes = [
  {
    name: "kart",
    imageUrl: require("@/assets/images/elementsImages/mk8d/karts/Standard Kart.png"),
  } as BodytypeItem,

  {
    name: "bike",
    imageUrl: require("@/assets/images/elementsImages/mk8d/bikes/Standard Bike.png"),
  } as BodytypeItem,
  {
    name: "sportBike",
    imageUrl: require("@/assets/images/elementsImages/mk8d/sportBikes/Sport Bike.png"),
  } as BodytypeItem,
  {
    name: "ATV",
    imageUrl: require("@/assets/images/elementsImages/mk8d/ATVs/Standard ATV.png"),
  } as BodytypeItem,
];
