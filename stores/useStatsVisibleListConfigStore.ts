import { create } from "zustand";
import { statNames } from "@/data/data";
import { toggleAndGetChecks, toggleCheckList } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

// === TYPES ===
export type StatsVisibleConfig = "no" | "yes" | "sync";

export interface StatVisibility {
  name: string;
  checked: boolean;
}

interface StatsVisibleListConfigState {
  statsVisibleConfig: StatsVisibleConfig;
  setStatsVisibleConfig: (newValue: StatsVisibleConfig) => Promise<void>;
  isDefault: boolean;
  isSync: boolean;

  statsVisibleListDefault: StatVisibility[];
  setStatsVisibleListDefault: (newList: StatVisibility[]) => void;
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

export const statsVisibleListDefaultInit: StatVisibility[] = statNames.map((statName) => ({
  name: statName,
  checked: statsVisibleListConfig[statName],
}));

// === STORE ZUSTAND ===
export const useStatsVisibleListConfigStore = create<StatsVisibleListConfigState>((set, get) => ({
  statsVisibleConfig: "no",
  async setStatsVisibleConfig(newValue) {
    set({ statsVisibleConfig: newValue });
    await saveThingInMemory("statsVisibleConfig", newValue);
  },

  get isDefault() {
    return get().statsVisibleConfig === "yes";
  },
  get isSync() {
    return get().statsVisibleConfig === "sync";
  },

  statsVisibleListDefault: statsVisibleListDefaultInit,

  setStatsVisibleListDefault(newList) {
    set({ statsVisibleListDefault: newList });
    saveThingInMemory("statsVisibleListDefault", newList);
  },

  toggleCheckListStatsVisibleListDefault(name) {
    const newList = toggleAndGetChecks(get().statsVisibleListDefault, name);
    set({ statsVisibleListDefault: newList });
  },
}));
