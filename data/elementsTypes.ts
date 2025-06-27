export type CategoryKey = "character" | "body" | "wheel" | "glider";

// Base interface for all elements, now includes ElementStats
export interface ElementBase {
  id: number;
  name: string;
  category: CategoryKey;
  classId: number;
  imageUrl: ReturnType<typeof require>;
}

export interface CharacterElement extends ElementBase {
  category: "character";
}

export interface BodyElement extends ElementBase {
  category: "body";
  bodyType: "kart" | "bike" | "sportBike" | "ATV";
  // statBonus: any;
}

export interface WheelElement extends ElementBase {
  category: "wheel";
  // statBonus: any;
}

export interface GliderElement extends ElementBase {
  category: "glider";
}

// Define the structure for all the stats
export interface ElementStats {
  speedGround: number;
  speedAntiGravity: number;
  speedWater: number;
  speedAir: number;
  acceleration: number;
  weight: number;
  handlingGround: number;
  handlingAntiGravity: number;
  handlingWater: number;
  handlingAir: number;
  traction: number;
  miniTurbo: number;
}
