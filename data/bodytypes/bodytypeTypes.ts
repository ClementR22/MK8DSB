export type Bodytype = "kart" | "bike" | "sportBike" | "ATV"; // Example types, update if different

export interface BodytypeItemImage {
  name: Bodytype;
  imageUrl: ReturnType<typeof require>;
}
