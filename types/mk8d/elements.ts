import { BaseElementData } from "../common/elements";
import { Bodytype } from "./bodytypes";
import { Category } from "./categories";

export type ElementData = BaseElementData & {
  category: Category;
};

export interface ElementDataCharacter extends ElementData {
  category: "character";
}

export interface ElementDataBody extends ElementData {
  category: "body";
  bodytype: Bodytype;
}

export interface ElementDataWheel extends ElementData {
  category: "wheel";
}

export interface ElementDataGlider extends ElementData {
  category: "glider";
}

// Define the structure for all the stats
export type ElementStats = {
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
};
