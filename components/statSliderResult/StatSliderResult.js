import { translate } from "@/translations/translations";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderResultBar from "./StatSliderResultBar";
import { useThemeStore } from "@/stores/useThemeStore";
import TooltipWrapper from "../TooltipWrapper";

const StatSliderResult = ({ name, stat_i_multipleSetStats, chosenValue }) => {
  const theme = useThemeStore((state) => state.theme);

  const styles = StyleSheet.create({
    container: { width: "100%", flexGrow: 1, gap: 10 },
    sliderContainer: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme.surface_container_high, //theme.surface_container
    },
    textContainer: { flexDirection: "row", alignItems: "center", flexWrap: "nowrap" },
    text: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: theme.on_surface,
    },
  });

  const translated2Points = translate(":");

  return (
    <TooltipWrapper tooltipText="StatsOfTheSet" style={styles.sliderContainer}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">
          {translate(name)}
        </Text>
        <Text style={[styles.text, { flexShrink: 0 }]}>
          {translated2Points}
          {JSON.stringify(stat_i_multipleSetStats[0])}
        </Text>
      </View>

      {stat_i_multipleSetStats.map((setStat, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "stretch",
            }}
          >
            <StatSliderResultBar value={setStat} chosenValue={chosenValue} />
          </View>
        );
      })}
    </TooltipWrapper>
  );
};

export default StatSliderResult;
