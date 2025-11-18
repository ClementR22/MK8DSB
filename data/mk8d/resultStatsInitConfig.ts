import { statNames } from "./stats";
import { ResultStat } from "@/types/mk8d/stats";
import { StatName } from "@/types/mk8d";

const resultStatsDefaultConfig: Record<StatName, boolean> = {
  speedGround: true,
  speedAntiGravity: false,
  speedWater: false,
  speedAir: false,
  acceleration: true,
  weight: false,
  handlingGround: false,
  handlingAntiGravity: false,
  handlingWater: false,
  handlingAir: false,
  traction: false,
  miniTurbo: true,
};

export const resultStatsDefaultInit: ResultStat[] = statNames.map((statName) => ({
  name: statName,
  checked: resultStatsDefaultConfig[statName],
}));

export const resultStatsSaveScreenInit: ResultStat[] = statNames.map((statName) => ({
  name: statName,
  checked: true,
}));
