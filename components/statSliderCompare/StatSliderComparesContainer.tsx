import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import StatSliderCompare from "./StatSliderCompare";

interface StatSliderComparesContainerProps {
  setsToShowMultipleStatsLists: number[][];
}

const StatSliderComparesContainer: React.FC<StatSliderComparesContainerProps> = ({ setsToShowMultipleStatsLists }) => {
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

  return <View style={styles.container}>{memoizedStatCompares}</View>;
};

const styles = StyleSheet.create({
  container: { width: "100%", flexGrow: 1, gap: 10 },
});

export default React.memo(StatSliderComparesContainer);
