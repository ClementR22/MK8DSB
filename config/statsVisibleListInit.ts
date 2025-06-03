import { statNames } from "@/data/data";
import { StatsVisibleList } from "@/stores/useStatsVisibleListConfigStore";

const statsVisibleListConfig: Record<string, boolean> = {
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

export const statsVisibleListInit: StatsVisibleList = statNames.map((statName) => ({
  name: statName,
  checked: statsVisibleListConfig[statName],
}));
