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
  speedGround: "spdG",
  speedAntiGravity: "spdAG",
  speedWater: "spdW",
  speedAir: "spdA",
  acceleration: "acc",
  weight: "wgt",
  handlingGround: "hanG",
  handlingAntiGravity: "hanAG",
  handlingWater: "hanW",
  handlingAir: "hanA",
  traction: "tra",
  miniTurbo: "mtu",
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

export const statNamesSpeed: StatNameSpeed[] = ["close", "speedGround", "speedAntiGravity", "speedWater", "speedAir"];

export const statNamesHandling: StatNameHandling[] = [
  "close",
  "handlingGround",
  "handlingAntiGravity",
  "handlingWater",
  "handlingAir",
];
