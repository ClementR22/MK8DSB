import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatGaugeCompare from "./StatGaugeCompare";
import { StatName } from "@/data/stats/statsTypes";
import { BORDER_RADIUS_BIG, MARGIN_CONTAINER_LOWEST, PADDING_SET_CARDS_CONTAINER } from "@/utils/designTokens";

interface StatGaugeComparesContainerProps {
  setsColorsMap: Map<string, string>;
  scrollToSetCard: (id: string) => void;
}

const StatGaugeComparesContainer: React.FC<StatGaugeComparesContainerProps> = ({ setsColorsMap, scrollToSetCard }) => {
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);

  const data = useMemo(() => {
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

    return data;
  }, [resultStats, setsListDisplayed, setsColorsMap, theme.surface_variant]);

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      padding: PADDING_SET_CARDS_CONTAINER,
      backgroundColor: theme.surface_container,
      gap: 7,
      borderRadius: BORDER_RADIUS_BIG,
      marginHorizontal: MARGIN_CONTAINER_LOWEST,
    };
  }, [theme.surface_container]);

  return (
    <View style={containerStyle}>
      {data.map(({ name, setsIdAndValueWithColor }) => {
        return (
          <StatGaugeCompare
            key={name}
            name={name}
            setsIdAndValue={setsIdAndValueWithColor}
            scrollToSetCard={scrollToSetCard}
          />
        );
      })}
    </View>
  );
};

export default React.memo(StatGaugeComparesContainer);
