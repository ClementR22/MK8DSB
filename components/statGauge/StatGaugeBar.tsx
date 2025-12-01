import { useGameData } from "@/hooks/useGameData";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";
import useThemeStore from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF } from "@/utils/designTokens";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import React, { memo, useMemo } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

interface StatGaugeBarProps {
  value: number;
  color?: string;
  statFilterNumber?: number;
}

const StatGaugeBar: React.FC<StatGaugeBarProps> = ({ value, color, statFilterNumber }) => {
  const { MAX_STAT_VALUE_BUILD } = useGameData();

  const theme = useThemeStore((state) => state.theme);

  // Largeur du segment intérieur, clampée et calculée une seule fois par changement de value
  const clampedValue = Math.min(Math.max(value, 0), MAX_STAT_VALUE_BUILD);
  const innerFillWidth = `${(clampedValue / MAX_STAT_VALUE_BUILD) * 100}%` as DimensionValue;

  const isInDesiredContainer = statFilterNumber != undefined;

  const stylesDynamic = useStatGaugeStyles(isInDesiredContainer ? 17 : 13);

  const { emptyContainer, thick } = useMemo(() => {
    const emptyContainer = [
      stylesDynamic.emptyContainer,
      isInDesiredContainer && { borderWidth: 2, borderColor: getStatSliderBorderColor(statFilterNumber, theme) },
    ];
    const thick = stylesDynamic.thick;

    return { emptyContainer, thick };
  }, [statFilterNumber, stylesDynamic, getStatSliderBorderColor]);

  return (
    <View style={emptyContainer}>
      <View style={StyleSheet.flatten([thick, { width: innerFillWidth, backgroundColor: color ?? theme.primary }])} />
    </View>
  );
};

export default memo(StatGaugeBar);
