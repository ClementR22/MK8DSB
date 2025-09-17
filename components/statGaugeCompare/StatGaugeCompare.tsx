import React, { useMemo, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";

import StatGaugeCompareBar from "./StatGaugeCompareBar";
import { StatName } from "@/data/stats/statsTypes";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";
export interface SetIdAndStatValue {
  id: string;
  value: number;
  color: string;
}

interface StatGaugeCompareProps {
  name: StatName;
  setsIdAndValue: SetIdAndStatValue[];
  scrollToSetCard: (id: string) => void;
}

const StatGaugeCompare: React.FC<StatGaugeCompareProps> = ({ setsIdAndValue, name, scrollToSetCard }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);

  const textColor = useMemo(() => {
    return { color: theme.on_surface };
  }, [theme.on_surface]);

  const renderStatBar = useCallback(
    ({ id, value, color }) => {
      return (
        <StatGaugeCompareBar key={id} value={value} color={color} scrollToThisSetCard={() => scrollToSetCard(id)} />
      );
    },
    [scrollToSetCard]
  );

  const memoizedStatBars = useMemo(() => setsIdAndValue.map(renderStatBar), [setsIdAndValue, renderStatBar]);
  const { setCardStyle } = useSetCardStyle("100%");

  return (
    <View style={setCardStyle}>
      <View style={styles.textWrapper}>
        <Text style={StyleSheet.flatten([styles.text, textColor])}>{translatedName}</Text>
      </View>

      <View style={styles.statBarsContainer}>{memoizedStatBars}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    marginBottom: 3, // Espacement entre le titre et les barres de stat
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statBarsContainer: {
    width: "100%",
    gap: 0,
  },
});

export default React.memo(StatGaugeCompare);
