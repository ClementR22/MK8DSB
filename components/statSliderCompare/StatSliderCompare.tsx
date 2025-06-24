import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderCompareBar from "./StatSliderCompareBar";
import { useThemeStore } from "@/stores/useThemeStore";
import TooltipWrapper from "../TooltipWrapper";
import { useLanguageStore } from "@/stores/useLanguageStore";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import StatSliderCompareSelector from "./StatSliderCompareSelector";
import { ResultStats } from "@/contexts/ResultStatsContext";
import { translateToLanguage } from "@/translations/translations";

interface StatSliderCompareProps {
  name: string;
  setsStats: number[];
  compareStats?: ResultStats;
  handleSelectCompareStat?: (name: string) => void;
}

const StatSliderCompare = ({ name, setsStats, compareStats, handleSelectCompareStat }: StatSliderCompareProps) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const textDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);

  const tooltipWrapperStyles = useMemo(
    () => ({
      width: "100%",
    }),
    []
  );

  const tooltipInnerContainerStyles = useMemo(
    () => ({
      alignItems: "flex-start",
      backgroundColor: theme.surface,
      padding: 10,
      borderRadius: 12,
    }),
    [theme.surface]
  );

  const memoizedStatBars = useMemo(() => {
    return setsStats.map((value, index) => <StatSliderCompareBar key={index} value={value} />);
  }, [setsStats]);

  return (
    <BoxContainer marginTop={0} margin={10} padding={15}>
      <TooltipWrapper
        tooltipText="StatsOfTheSet"
        style={tooltipWrapperStyles}
        innerContainerStyle={tooltipInnerContainerStyles}
      >
        <View style={styles.textContainer}>
          <Text style={StyleSheet.flatten([styles.text, textDynamicStyle])}>{translatedName}</Text>
        </View>

        <View style={styles.statBarsContainer}>{memoizedStatBars}</View>
      </TooltipWrapper>

      {compareStats && (
        <StatSliderCompareSelector compareStats={compareStats} handleSelectCompareStat={handleSelectCompareStat} />
      )}
    </BoxContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 10,
    margin: 16,
    padding: 10,
    borderRadius: 24,
  },
  sliderContainer: {
    padding: 10,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  statBarsContainer: { width: "100%", gap: 0 },
});

export default React.memo(StatSliderCompare);
