import { translateToLanguage } from "@/translations/translations";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderCompareBar from "./StatSliderCompareBar";
import { useThemeStore } from "@/stores/useThemeStore";
import TooltipWrapper from "../TooltipWrapper";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface StatSliderCompareProps {
  name: string;
  stat_i_multipleSetStats: number[];
}

const StatSliderCompare = ({ name, stat_i_multipleSetStats }: StatSliderCompareProps) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const sliderContainerDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface_container_high,
    }),
    [theme.surface_container_high]
  );

  const textDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const translated2Points = useMemo(() => translateToLanguage(":", language), [language]);

  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);

  return (
    <TooltipWrapper
      tooltipText="StatsOfTheSet"
      style={StyleSheet.flatten([styles.sliderContainer, sliderContainerDynamicStyle])}
    >
      <View style={styles.textContainer}>
        <Text
          style={StyleSheet.flatten([styles.text, textDynamicStyle, { flexShrink: 1 }])}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {translatedName}
        </Text>
        <Text style={StyleSheet.flatten([styles.text, textDynamicStyle, { flexShrink: 0 }])}>
          {translated2Points}
          {stat_i_multipleSetStats.length > 0 ? stat_i_multipleSetStats[0] : ""}
        </Text>
      </View>

      {stat_i_multipleSetStats.map((value, index) => (
        <View key={index} style={styles.barWrapper}>
          <StatSliderCompareBar value={value} />
        </View>
      ))}
    </TooltipWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexGrow: 1,
    gap: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "stretch",
  },
});

export default React.memo(StatSliderCompare);
