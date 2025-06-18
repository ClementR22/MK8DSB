import React from "react";
import { StyleSheet, View } from "react-native";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderCompare from "./StatSliderCompare";

const StatSliderComparesContainer = ({ setsToShowMultipleStatsLists }) => {
  const { resultStats } = useResultStats();

  const styles = StyleSheet.create({
    container: { width: "100%", flexGrow: 1, gap: 10 },
  });

  return (
    <View style={styles.container}>
      {resultStats.map(({ name, checked }, statIndex) => {
        const stat_i_multipleSetStats = setsToShowMultipleStatsLists.map((statList) => statList[statIndex]);

        if (checked) {
          return <StatSliderCompare key={statIndex} name={name} stat_i_multipleSetStats={stat_i_multipleSetStats} />;
        }
        return null;
      })}
    </View>
  );
};

export default StatSliderComparesContainer;
