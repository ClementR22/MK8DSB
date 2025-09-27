import { BONUS_COLOR, MALUS_COLOR } from "@/constants/Colors";
import { useGaugeMetrics } from "@/hooks/useGaugeMetrics";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF } from "@/utils/designTokens";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

interface StatGaugeSetCardBarProps {
  obtainedValue: number;
  chosenValue?: number;
  isInSearchScreen?: boolean;
}

const StatGaugeSetCardBar = ({ obtainedValue, chosenValue, isInSearchScreen = false }: StatGaugeSetCardBarProps) => {
  const theme = useThemeStore((state) => state.theme);
  const { getWidth, handleGaugeLayout } = useGaugeMetrics();
  const stylesDynamic = useStatGaugeStyles();

  console.log({ obtainedValue, chosenValue });

  // Memoized calculations
  const gaugeData = useMemo(() => {
    const isBonus = chosenValue !== undefined && obtainedValue > chosenValue;
    const obtainedWidth = getWidth(obtainedValue);
    const chosenWidth = chosenValue !== undefined ? getWidth(chosenValue) : obtainedWidth;
    const purpleWidth = isInSearchScreen && isBonus ? chosenWidth : obtainedWidth;
    const bonusOrMalusWidth = Math.abs(chosenWidth - obtainedWidth);
    return { isBonus, purpleWidth, bonusOrMalusWidth };
  }, [obtainedValue, chosenValue, isInSearchScreen, getWidth]);

  // Créer les traits obliques pour les hachures
  const createHatchPattern = useMemo(() => {
    const barHeight = 34; // Hauteur estimée
    const spacing = 12; // Espacement entre les traits
    const lineWidth = 1; // Épaisseur des traits
    const totalWidth = gaugeData.bonusOrMalusWidth;

    if (totalWidth <= 0) return [];

    // Calculer le nombre de traits nécessaires
    const diagonalLength = Math.sqrt(2) * barHeight; // Longueur diagonale
    const numLines = Math.ceil((totalWidth + diagonalLength) / spacing);

    return Array.from({ length: numLines }, (_, i) => {
      const xPosition = i * spacing;
      return (
        <View
          key={i}
          style={{
            position: "absolute",
            left: xPosition,
            top: -barHeight / 2, // Centrer verticalement
            width: lineWidth,
            height: diagonalLength,
            backgroundColor: MALUS_COLOR,
            transform: [{ rotate: "45deg" }],
          }}
        />
      );
    });
  }, [gaugeData.bonusOrMalusWidth]);

  const MalusBar = useMemo(
    () => (
      <View
        style={[
          stylesDynamic.thick,
          {
            width: gaugeData.bonusOrMalusWidth,
            overflow: "hidden",
            position: "relative",
            backgroundColor: "rgba(255, 0, 0, 0.1)", // Fond légèrement coloré
            borderRightWidth: 1,
            borderColor: MALUS_COLOR,
          },
        ]}
      >
        {createHatchPattern}
      </View>
    ),
    [createHatchPattern, gaugeData.bonusOrMalusWidth, stylesDynamic.thick]
  );

  const BonusBar = useMemo(
    () => (
      <View
        style={[
          stylesDynamic.thick,
          {
            width: gaugeData.bonusOrMalusWidth,
            borderColor: BONUS_COLOR,
            borderTopWidth: 4,
            borderBottomWidth: 4,
            backgroundColor: theme.primary,
          },
        ]}
      />
    ),
    [gaugeData.bonusOrMalusWidth, stylesDynamic.thick, theme.primary]
  );

  return (
    <View style={stylesDynamic.emptyContainer} onLayout={handleGaugeLayout}>
      {/* Jauge violette (valeur désirée) */}
      <View
        style={[
          stylesDynamic.thick,
          {
            backgroundColor: theme.primary,
            width: gaugeData.purpleWidth,
            justifyContent: "center",
            overflow: "hidden",
          },
        ]}
      />

      {/* rouge hachuré (indicatif) ou vert mélé au violet */}
      {gaugeData.isBonus ? BonusBar : MalusBar}
    </View>
  );
};

export default React.memo(StatGaugeSetCardBar);
