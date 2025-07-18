export type Category = "character" | "body" | "wheel" | "glider";

// Base interface for all elements, now includes ElementStats
export interface ElementData {
  id: number;
  name: string;
  category: Category;
  classId: number;
  imageUrl: ReturnType<typeof require>;
}

export interface ElementDataCharacter extends ElementData {
  category: "character";
}

export interface ElementDataBody extends ElementData {
  category: "body";
  bodytype: "kart" | "bike" | "sportBike" | "ATV";
  // statBonus: any;
}

export interface ElementDataWheel extends ElementData {
  category: "wheel";
  // statBonus: any;
}

export interface ElementDataGlider extends ElementData {
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
