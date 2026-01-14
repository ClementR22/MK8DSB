import { Bodytype } from "@/types/mk8d/bodytypes";

type BodytypeItem = {
  name: Bodytype;
  imageUrl: ReturnType<typeof require>;
};

export const bodytype: Bodytype[] = ["kart", "bike", "sportBike", "ATV"];

export const bodytypesItems = [
  {
    name: "kart",
    imageUrl: require("@/assets/images/elementsImages/mk8d/karts/StandardKart.png"),
  } as BodytypeItem,

  {
    name: "bike",
    imageUrl: require("@/assets/images/elementsImages/mk8d/bikes/StandardBike.png"),
  } as BodytypeItem,

  {
    name: "sportBike",
    imageUrl: require("@/assets/images/elementsImages/mk8d/sportBikes/SportBike.png"),
  } as BodytypeItem,

  {
    name: "ATV",
    imageUrl: require("@/assets/images/elementsImages/mk8d/ATVs/StandardATV.png"),
  } as BodytypeItem,
];
