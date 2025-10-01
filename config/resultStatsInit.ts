import { statNames } from "@/data/stats/statsData";
import { ResultStats } from "@/contexts/ResultStatsContext";

const resultStatsDefaultConfig: Record<string, boolean> = {
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

export const resultStatsDefaultInit: ResultStats = statNames.map((statName) => ({
  name: statName,
  checked: resultStatsDefaultConfig[statName],
}));

export const resultStatsSaveScreenInit: ResultStats = statNames.map((statName) => ({
  name: statName,
  checked: true,
}));
