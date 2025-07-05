export type Bodytype = "kart" | "bike" | "sportBike" | "ATV"; // Example types, update if different

export interface BodytypeItem {
  name: Bodytype;
  imageUrl: ReturnType<typeof require>;
}
