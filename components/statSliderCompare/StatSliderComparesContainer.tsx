import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import StatSliderCompare from "./StatSliderCompare";
import { useThemeStore } from "@/stores/useThemeStore";

interface StatSliderComparesContainerProps {
  setsToShowMultipleStatsLists: number[][];
}

const StatSliderComparesContainer: React.FC<StatSliderComparesContainerProps> = ({ setsToShowMultipleStatsLists }) => {
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();

  const memoizedStatCompares = useMemo(() => {
    return resultStats
      .filter(({ checked }: ResultStat) => checked)
      .map(({ name }: ResultStat, statIndex: number) => {
        const stat_i_multipleSetStats: number[] = setsToShowMultipleStatsLists.map(
          (statList: number[]) => statList[statIndex]
        );

        return <StatSliderCompare key={name} name={name} stat_i_multipleSetStats={stat_i_multipleSetStats} />;
      });
  }, [resultStats, setsToShowMultipleStatsLists]);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface_container_high }]}>{memoizedStatCompares}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 10,
    margin: 16,
    padding: 10, // total padding of 20 with StatSliderCompare padding
    borderRadius: 24,
  },
});

export default React.memo(StatSliderComparesContainer);
