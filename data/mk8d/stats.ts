import { StatNameHandling, StatName, StatNameSpeed, ChosenStat } from "@/types/mk8d/stats";
import { SortNameElementDefault, SortNameBuildCardDefault, StatNameSortDefault } from "@/types/mk8d/sorts";

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
  miniTurbo: "MTu",
};

const statNamesSortDefault: StatNameSortDefault[] = [
  "speed", // A special button to open the speed-specific sorting sub-menu
  "acceleration",
  "weight",
  "handling", // A special button to open the handling-specific sorting sub-menu
  "traction",
  "miniTurbo",
];

export const sortNamesBuildCardDefault: SortNameBuildCardDefault[] = ["name", ...statNamesSortDefault];
export const sortNamesElementDefault: SortNameElementDefault[] = ["id", ...sortNamesBuildCardDefault];

export const statNamesSpeed: StatNameSpeed[] = ["speedGround", "speedAntiGravity", "speedWater", "speedAir"];

export const statNamesHandling: StatNameHandling[] = [
  "handlingGround",
  "handlingAntiGravity",
  "handlingWater",
  "handlingAir",
];

const chosenStatsSelectedInit: StatName[] = ["speedGround", "acceleration", "miniTurbo"];

export const chosenStatsInit: ChosenStat[] = statNames.map((name) => ({
  name,
  checked: chosenStatsSelectedInit.includes(name),
  value: 0,
  statFilterNumber: 0,
}));
