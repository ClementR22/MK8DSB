import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderCompare, { STAT_SLIDER_COMPARE_WIDTH } from "./StatSliderCompare";
import PaginatedWrapper from "../PaginatedWrapper";

interface StatSliderComparesContainerProps {
  setsColorsMap: Map<string, string>;
  scrollToSetCard: (id: string) => void;
}

const StatSliderComparesContainer: React.FC<StatSliderComparesContainerProps> = ({
  setsColorsMap,
  scrollToSetCard,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);

  const { data, numberOfPages, filteredResultStats } = useMemo(() => {
    const filteredResultStats = resultStats.filter((stat) => stat.checked);

    const data = filteredResultStats.map((stat: ResultStat) => {
      const statIndex = statNames.indexOf(stat.name);
      const setsData = setsListDisplayed.map((set) => ({
        id: set.id,
        value: set.stats[statIndex],
        color: setsColorsMap.get(set.id) || theme.surface_variant,
      }));

      return {
        name: stat.name,
        setsIdAndValueWithColor: setsData,
      };
    });

    return {
      data,
      numberOfPages: filteredResultStats.length,
      filteredResultStats: filteredResultStats,
    };
  }, [resultStats, setsListDisplayed, setsColorsMap, theme.surface_variant]);

  const containerStyleDynamic: ViewStyle = useMemo(() => {
    return {
      padding: 15,
      backgroundColor: theme.surface_container_high,
      paddingBottom: numberOfPages >= 2 ? 0 : undefined,
    };
  }, [numberOfPages, theme.surface_container_high]);

  return (
    <PaginatedWrapper
      pageWidth={STAT_SLIDER_COMPARE_WIDTH}
      data={data}
      renderItem={({ item }) => (
        <StatSliderCompare
          key={item.name}
          name={item.name}
          setsIdAndValue={item.setsIdAndValueWithColor}
          scrollToSetCard={scrollToSetCard}
        />
      )}
      dotsList={filteredResultStats}
      numberOfPages={numberOfPages}
      containerStyle={containerStyleDynamic}
    />
  );
};

export default React.memo(StatSliderComparesContainer);
