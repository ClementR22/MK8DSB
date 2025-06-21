import { statNames } from "@/data/data";
import { ResultStats } from "@/contexts/ResultStatsContext";

const resultStatsConfig: Record<string, boolean> = {
  speedGround: true,
  speedAntiGravity: false,
  speedWater: false,
  speedAir: false,
  acceleration: false,
  weight: false,
  handlingGround: false,
  handlingAntiGravity: false,
  handlingWater: false,
  handlingAir: false,
  traction: false,
  miniTurbo: false,
};

export const resultStatsInit: ResultStats = statNames.map((statName) => ({
  name: statName,
  checked: resultStatsConfig[statName],
}));
