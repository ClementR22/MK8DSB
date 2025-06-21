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

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexGrow: 1,
      gap: 10,
    },
    sliderContainerBase: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme.surface_container_high,
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
    },
    textBase: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    barWrapper: {
      flexDirection: "row",
      alignItems: "stretch",
    },
  });

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
      style={styles.sliderContainerBase}
    >
      <View style={styles.textContainer}>
        <Text
          style={StyleSheet.flatten([styles.textBase, textDynamicStyle, { flexShrink: 1 }])}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {translatedName}
        </Text>
        <Text style={StyleSheet.flatten([styles.textBase, textDynamicStyle, { flexShrink: 0 }])}>
          {translated2Points}
          {stat_i_multipleSetStats.length > 0 ? JSON.stringify(stat_i_multipleSetStats[0]) : ""}
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
export default React.memo(StatSliderCompare);
