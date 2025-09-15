import { BONUS_COLOR, MALUS_COLOR } from "@/constants/Colors";
import { useGaugeMetrics } from "@/hooks/useGaugeMetrics";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";
import { useThemeStore } from "@/stores/useThemeStore";
import React from "react";
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

  const obtainedWidth = getWidth(obtainedValue);
  const chosenWidth = getWidth(chosenValue) || obtainedWidth; // si chosenValue n'est pas defini, on recopie obtainedWidth

  return (
    <View style={stylesDynamic.emptyContainer} onLayout={handleGaugeLayout}>
      {/* Fond vert visible si obtenu > desiré */}
      {isInSearchScreen && (
        <View
          style={[
            stylesDynamic.thick,
            {
              width: obtainedWidth,
              backgroundColor: BONUS_COLOR,
            },
          ]}
        />
      )}

      {/* Jauge violette (valeur désirée) */}
      <View
        style={[
          stylesDynamic.thick,
          {
            backgroundColor: theme.primary,
            width: isInSearchScreen ? chosenWidth : obtainedWidth,
            justifyContent: "center",
            overflow: "hidden",
          },
        ]}
      />

      {/* Jauge rouge en cas de déficit */}
      {isInSearchScreen && (
        <View
          style={[
            styles.thin,
            {
              width: chosenWidth,
              backgroundColor: MALUS_COLOR,
            },
          ]}
        />
      )}

      {/* Jauge noire (valeur obtenue) + Bâtonnet vertical */}
      {isInSearchScreen && (
        <View
          style={[
            stylesDynamic.thick,
            styles.obtainedJaugeWrapper,
            {
              width: obtainedWidth,
            },
          ]}
        >
          {/* Jauge noire (valeur obtenue) */}
          <View style={[styles.thin, { width: obtainedWidth, backgroundColor: "black" }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  thin: { position: "absolute", height: "50%" },
  obtainedJaugeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 4,
  },
});

export default React.memo(StatGaugeSetCardBar);
