import { create } from "zustand";
import { LayoutChangeEvent } from "react-native";

export type ContextId = "stat-gauge-compact" | "stat-gauge-build-card" | "stat-gauge-gallery";

interface GaugeState {
  gaugeWidths: Record<ContextId, number>;
  setGaugeWidth: (contextId: ContextId, width: number) => void;
  createLayoutHandler: (contextId: ContextId) => (event: LayoutChangeEvent) => void;
}

const useGaugeStore = create<GaugeState>((set, get) => ({
  gaugeWidths: {
    "stat-gauge-compact": 0,
    "stat-gauge-build-card": 0,
    "stat-gauge-gallery": 0,
  },

  setGaugeWidth: (contextId: ContextId, width: number) => {
    const current = get().gaugeWidths[contextId];
    // Ne met à jour que si la largeur change vraiment
    if (current !== width) {
      set((state) => ({
        gaugeWidths: { ...state.gaugeWidths, [contextId]: width },
      }));
    }
  },

  createLayoutHandler: (contextId: ContextId) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    get().setGaugeWidth(contextId, width);
  },
}));

export default useGaugeStore;
