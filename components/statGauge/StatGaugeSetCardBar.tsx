import { BONUS_COLOR, MALUS_COLOR } from "@/constants/Colors";
import { useGaugeMetrics } from "@/hooks/useGaugeMetrics";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

interface StatGaugeSetCardBarProps {
  obtainedValue: number;
  chosenValue?: number;
  isInSearchScreen?: boolean;
}

const StatGaugeSetCardBar = ({ obtainedValue, chosenValue, isInSearchScreen = false }: StatGaugeSetCardBarProps) => {
  const theme = useThemeStore((state) => state.theme);

  const { getWidth, handleGaugeLayout } = useGaugeMetrics("stat-gauge-set-card");

  const stylesDynamic = useStatGaugeStyles();

  // Memoized calculations
  const gaugeData = useMemo(() => {
    const isBonus = chosenValue !== undefined && obtainedValue > chosenValue;
    const obtainedWidth = getWidth(obtainedValue);
    const chosenWidth = chosenValue !== undefined ? getWidth(chosenValue) : obtainedWidth;
    const purpleWidth = isInSearchScreen && isBonus ? chosenWidth : obtainedWidth;
    const bonusOrMalusWidth = Math.abs(chosenWidth - obtainedWidth);
    const bonusOrMalusColor = isBonus ? BONUS_COLOR : MALUS_COLOR;

    return { isBonus, purpleWidth, bonusOrMalusWidth, bonusOrMalusColor };
  }, [obtainedValue, chosenValue, isInSearchScreen, getWidth]);

  // Créer les traits obliques pour les hachures
  const createHatchPattern = useMemo(() => {
    if (gaugeData.bonusOrMalusWidth <= 0) return [];

    const spacing = 10; // Espacement entre les traits
    const numLines = 20;

    return Array.from({ length: numLines }, (_, i) => {
      const xPosition = i * spacing;
      return <View key={i} style={[styles.hatch, { left: xPosition, backgroundColor: gaugeData.bonusOrMalusColor }]} />;
    });
  }, [gaugeData.bonusOrMalusWidth, gaugeData.bonusOrMalusColor]);

  const bonusOrMalusBar = useMemo(() => {
    return (
      <View
        style={[
          stylesDynamic.thick,
          {
            width: gaugeData.bonusOrMalusWidth,
            overflow: "hidden",
            backgroundColor: gaugeData.isBonus ? theme.primary : "rgba(255, 0, 0, 0.1)", // Fond légèrement coloré
          },
          !gaugeData.isBonus && styles.malus,
        ]}
      >
        {createHatchPattern}
      </View>
    );
  }, [gaugeData.isBonus, gaugeData.bonusOrMalusWidth, gaugeData.bonusOrMalusColor, stylesDynamic.thick]);

  return (
    <View style={stylesDynamic.emptyContainer} onLayout={handleGaugeLayout}>
      {/* Jauge violette (valeur désirée) */}
      <View
        style={[
          stylesDynamic.thick,
          {
            backgroundColor: theme.primary,
            width: gaugeData.purpleWidth,
          },
        ]}
      />

      {/* rouge hachuré (indicatif) ou vert mélé au violet */}
      {bonusOrMalusBar}
    </View>
  );
};

const styles = StyleSheet.create({
  malus: { borderRightWidth: 2, borderColor: MALUS_COLOR },
  hatch: {
    position: "absolute",
    top: -17, // ~ moitié de la bar height, pour centrer verticalement
    width: 2,
    height: 50,
    transform: [{ rotate: "45deg" }],
  },
});

export default React.memo(StatGaugeSetCardBar);
