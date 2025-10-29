import React, { useCallback, useMemo } from "react";
import { create } from "zustand";
import { LayoutChangeEvent } from "react-native";
import { MAX_STAT_VALUE } from "@/constants/constants";

export type ContextId = "stat-gauge-compact" | "stat-gauge-build-card" | "stat-gauge-gallery";

interface GaugeStore {
  gaugeWidths: Record<ContextId, number>;
  setGaugeWidth: (contextId: ContextId, width: number) => void;
  createLayoutHandler: (contextId: ContextId) => (event: LayoutChangeEvent) => void;
}

export const useGaugeStore = create<GaugeStore>((set, get) => ({
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
