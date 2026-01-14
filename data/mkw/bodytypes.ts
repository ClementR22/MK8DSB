import { Bodytype } from "@/types/mkw/bodytypes";

type BodytypeItem = {
  name: Bodytype;
  imageUrl: ReturnType<typeof require>;
};

export const bodytype: Bodytype[] = ["kart", "bike", "ATV"];

export const bodytypesItems = [
  {
    name: "kart",
    imageUrl: require("@/assets/images/elementsImages/mkw/karts/StandardKart.png"),
  } as BodytypeItem,

  {
    name: "bike",
    imageUrl: require("@/assets/images/elementsImages/mkw/bikes/StandardBike.png"),
  } as BodytypeItem,

  {
    name: "ATV",
    imageUrl: require("@/assets/images/elementsImages/mkw/ATVs/FunkyDorrie.png"),
  } as BodytypeItem,
];
