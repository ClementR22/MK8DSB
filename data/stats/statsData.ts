import {
  StatName,
  StatNameCompareDefault,
  StatNameHandling,
  StatNameSortElementDefault,
  StatNameSortSetCardDefault,
  StatNameSpeed,
} from "./statsTypes";

export const statNames: StatName[] = [
  "speedGround",
  "speedAntiGravity",
  "speedWater",
  "speedAir",
  "acceleration",
  "weight",
  "handlingGround",
  "handlingAntiGravity",
  "handlingWater",
  "handlingAir",
  "traction",
  "miniTurbo",
];

export const statNamesCompact = {
  speedGround: "SG",
  speedAntiGravity: "SAG",
  speedWater: "SW",
  speedAir: "SA",
  acceleration: "Acc",
  weight: "Wei",
  handlingGround: "HG",
  handlingAntiGravity: "HAG",
  handlingWater: "HW",
  handlingAir: "HA",
  traction: "Tra",
  miniTurbo: "MT",
};

export const statNamesCompareDefault: StatNameCompareDefault[] = [
  "speed", // A special button to open the speed-specific sorting sub-menu
  "acceleration",
  "weight",
  "handling", // A special button to open the handling-specific sorting sub-menu
  "traction",
  "miniTurbo",
];

export const statNamesSortSetCardDefault: StatNameSortSetCardDefault[] = ["name", ...statNamesCompareDefault];
export const statNamesSortElementDefault: StatNameSortElementDefault[] = ["id", ...statNamesSortSetCardDefault];

export const statNamesSpeed: StatNameSpeed[] = ["speedGround", "speedAntiGravity", "speedWater", "speedAir"];

export const statNamesHandling: StatNameHandling[] = [
  "handlingGround",
  "handlingAntiGravity",
  "handlingWater",
  "handlingAir",
];
