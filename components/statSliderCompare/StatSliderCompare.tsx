import React, { useMemo, useCallback, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";

import BoxContainer from "@/primitiveComponents/BoxContainer";
import TooltipWrapper from "../TooltipWrapper";
import StatSliderCompareSelector from "./StatSliderCompareSelector";
import StatSliderCompareBar from "./StatSliderCompareBar";
import { CompareName } from "@/data/stats/statsTypes";

export interface SetIdAndStatValue {
  id: string;
  value: number;
  color: string;
}

interface StatSliderCompareProps {
  setsIdAndValue: SetIdAndStatValue[];
  selectedCompareName: CompareName;
  setSelectedCompareName: Dispatch<SetStateAction<CompareName>>;
  scrollToSetCard: (id: string) => void;
}

const StatSliderCompare: React.FC<StatSliderCompareProps> = ({
  setsIdAndValue,
  selectedCompareName,
  setSelectedCompareName,
  scrollToSetCard,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const translatedName = useMemo(
    () => translateToLanguage(selectedCompareName, language),
    [selectedCompareName, language]
  );

  const textDynamicStyle = useMemo(() => {
    return { color: theme.on_surface };
  }, [theme.on_surface]);

  const containerStyles = useMemo(() => {
    return [styles.container, { backgroundColor: theme.surface_container_high }];
  }, [theme.surface_container_high]);

  const innerContainerStyles = useMemo(() => {
    return [styles.innerContainer, { backgroundColor: theme.surface }];
  }, [theme.surface]);

  const renderStatBar = useCallback(
    ({ id, value, color }) => {
      return (
        <StatSliderCompareBar key={id} value={value} color={color} scrollToThisSetCard={() => scrollToSetCard(id)} />
      );
    },
    [scrollToSetCard]
  );

  const memoizedStatBars = useMemo(() => setsIdAndValue.map(renderStatBar), [setsIdAndValue, renderStatBar]);

  return (
    <BoxContainer marginTop={0} margin={10} padding={15}>
      <TooltipWrapper tooltipText="StatsOfTheSet" style={containerStyles} innerContainerStyle={innerContainerStyles}>
        <View style={styles.textContainer}>
          <Text style={StyleSheet.flatten([styles.text, textDynamicStyle])}>{translatedName}</Text>
        </View>

        <View style={styles.statBarsContainer}>{memoizedStatBars}</View>
      </TooltipWrapper>

      <StatSliderCompareSelector
        selectedCompareName={selectedCompareName}
        setSelectedCompareName={setSelectedCompareName}
      />
    </BoxContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10, // Espacement entre le tooltip et le sélecteur
  },
  innerContainer: {
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 12,
  },
  textContainer: {
    marginBottom: 10, // Espacement entre le titre et les barres de stat
    alignItems: "center", // Centrer le texte
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  statBarsContainer: {
    width: "100%",
    gap: 0,
  },
});

export default React.memo(StatSliderCompare);
