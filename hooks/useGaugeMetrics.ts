import useGaugeStore, { ContextId } from "@/stores/useGaugeStore";
import { useCallback, useMemo } from "react";
import { useGameData } from "./useGameData";

export const useGaugeMetrics = (contextId: ContextId) => {
  const { MAX_STAT_VALUE_BUILD } = useGameData();

  // Sélecteur optimisé : ne re-render que si LA largeur de CE contexte change
  const gaugeWidth = useGaugeStore((state) => state.gaugeWidths[contextId] ?? 0);
  const createLayoutHandler = useGaugeStore((state) => state.createLayoutHandler);

  // Mémorisé par contextId pour éviter de recréer à chaque render
  const handleGaugeLayout = useMemo(() => createLayoutHandler(contextId), [contextId, createLayoutHandler]);

  const getWidth = useCallback(
    (value: number, maxValue: number = MAX_STAT_VALUE_BUILD) => {
      if (gaugeWidth === 0) return 0;
      return (gaugeWidth * value) / maxValue;
    },
    [gaugeWidth]
  );

  return { gaugeWidth, getWidth, handleGaugeLayout };
};
