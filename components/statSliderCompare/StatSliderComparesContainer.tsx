import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderCompare, { STAT_SLIDER_COMPARE_WIDTH } from "./StatSliderCompare";
import PaginatedWrapper from "../paginatedWrapper/PaginatedWrapper";
import { ButtonName } from "../paginatedWrapper/PagesNavigator";
import { StatName } from "@/data/stats/statsTypes";

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

  const { data, numberOfPages, statsChecked } = useMemo(() => {
    const statsChecked = resultStats.filter((stat) => stat.checked).map((stat) => stat.name);

    const data = statsChecked.map((stat: StatName) => {
      const statIndex = statNames.indexOf(stat);
      const setsData = setsListDisplayed.map((set) => ({
        id: set.id,
        value: set.stats[statIndex],
        color: setsColorsMap.get(set.id) || theme.surface_variant,
      }));

      return {
        name: stat,
        setsIdAndValueWithColor: setsData,
      };
    });

    return {
      data,
      numberOfPages: statsChecked.length,
      statsChecked: statsChecked,
    };
  }, [resultStats, setsListDisplayed, setsColorsMap, theme.surface_variant]);

  const containerStyleDynamic: ViewStyle = useMemo(() => {
    return {
      padding: 15,
      paddingBottom: 0,
      backgroundColor: theme.surface_container_high,
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
      dotsNamesList={statsChecked}
      moreDots={[]}
      numberOfPages={numberOfPages}
      containerStyle={containerStyleDynamic}
    />
  );
};

export default React.memo(StatSliderComparesContainer);
