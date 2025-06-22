import { translateToLanguage } from "@/translations/translations";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderCompareBar from "./StatSliderCompareBar";
import { useThemeStore } from "@/stores/useThemeStore";
import TooltipWrapper from "../TooltipWrapper";
import { useLanguageStore } from "@/stores/useLanguageStore";
import BoxContainer from "@/primitiveComponents/BoxContainer";

interface StatSliderCompareProps {
  name: string;
  setsStats: number[];
}

const StatSliderCompare = ({ name, setsStats }: StatSliderCompareProps) => {
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

  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);

  return (
    <TooltipWrapper tooltipText="StatsOfTheSet">
      <BoxContainer alignItems="flex-start" gap={7}>
        <View style={styles.textContainer}>
          <Text style={StyleSheet.flatten([styles.text, textDynamicStyle])}>{translatedName}</Text>
        </View>

        <View style={styles.statBarsContainer}>
          {setsStats.map((value, index) => (
            <StatSliderCompareBar key={index} value={value} />
          ))}
        </View>
      </BoxContainer>
    </TooltipWrapper>
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
