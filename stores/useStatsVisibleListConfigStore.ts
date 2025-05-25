import { create } from "zustand";
import { statNames } from "@/data/data";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

// === TYPES ===
export type StatsVisibleConfig = "no" | "yes" | "sync";

type StatVisibility = {
  name: string;
  checked: boolean;
};

export type StatsVisibleList = StatVisibility[];

interface StatsVisibleListConfigState {
  statsVisibleConfig: StatsVisibleConfig;
  setStatsVisibleConfig: (newValue: StatsVisibleConfig) => Promise<void>;

  statsVisibleListDefault: StatsVisibleList;
  setStatsVisibleListDefault: (newList: StatsVisibleList) => void;
  toggleCheckListStatsVisibleListDefault: (name: string) => void;
}

// === CONFIGURATION INITIALE ===
export const statsVisibleConfigList: { label: string; value: StatsVisibleConfig }[] = [
  { label: "DontConfigure", value: "no" },
  { label: "Configure", value: "yes" },
  { label: "AllwaysSync", value: "sync" },
];

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

export const statsVisibleListDefaultInit: StatsVisibleList = statNames.map((statName) => ({
  name: statName,
  checked: statsVisibleListConfig[statName],
}));

export const useStatsVisibleListConfigStore = create<StatsVisibleListConfigState>((set, get) => ({
  statsVisibleConfig: "no",

  async setStatsVisibleConfig(newValue) {
    set({ statsVisibleConfig: newValue });
    await saveThingInMemory("statsVisibleConfig", newValue);
  },

  statsVisibleListDefault: statsVisibleListDefaultInit,

  setStatsVisibleListDefault(newList) {
    set({ statsVisibleListDefault: newList });
    saveThingInMemory("statsVisibleListDefault", newList);
  },

  toggleCheckListStatsVisibleListDefault(name) {
    const newList = toggleAndGetChecks(get().statsVisibleListDefault, name);
    get().setStatsVisibleListDefault(newList);
  },
}));
