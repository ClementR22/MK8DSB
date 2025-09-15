import { MAX_STAT_VALUE } from "@/constants/constants";
import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

export const useGaugeMetrics = () => {
  const [gaugeWidth, setGaugeWidth] = useState(0);

  const getWidth = useCallback((val: number) => (val / MAX_STAT_VALUE) * gaugeWidth, [gaugeWidth]);

  const handleGaugeLayout = useCallback((e: LayoutChangeEvent) => {
    setGaugeWidth(e.nativeEvent.layout.width);
  }, []);

  return { gaugeWidth, getWidth, handleGaugeLayout };
};
