import { Bodytype } from "@/types/mkw/bodytypes";

type BodytypeItem = {
  name: Bodytype;
  imageUrl: ReturnType<typeof require>;
};

export const bodytypeNames: Bodytype[] = ["kart", "bike", "ATV"];

export const bodytypes = [
  {
    name: "kart",
    imageUrl: require("@/assets/images/elementsImages/mkw/karts/Standard Kart.png"),
  } as BodytypeItem,

  {
    name: "bike",
    imageUrl: require("@/assets/images/elementsImages/mkw/bikes/Standard Bike.png"),
  } as BodytypeItem,

  {
    name: "ATV",
    imageUrl: require("@/assets/images/elementsImages/mkw/ATVs/Funky Dorrie.png"),
  } as BodytypeItem,
];
