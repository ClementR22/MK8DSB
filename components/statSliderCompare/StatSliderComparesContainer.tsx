import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import HorizontalScrollContainer from "../setCard/HorizontalScrollContainer";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderCompare from "./StatSliderCompare";

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

  const memoizedStatSliderCompares = useMemo(() => {
    const filteredResultStats = resultStats.filter((stat) => stat.checked);

    return filteredResultStats.map((stat: ResultStat) => {
      const statIndex = statNames.indexOf(stat.name);

      const setsIdAndValueWithColor = setsListDisplayed.map((set) => ({
        id: set.id,
        value: set.stats[statIndex],
        color: setsColorsMap.get(set.id) || theme.surface_variant || theme.surface_container_high,
      }));

      return (
        <StatSliderCompare
          key={stat.name}
          name={stat.name}
          setsIdAndValue={setsIdAndValueWithColor}
          scrollToSetCard={scrollToSetCard}
        />
      );
    });
  }, [resultStats, setsListDisplayed, setsColorsMap, scrollToSetCard]);

  return (
    <HorizontalScrollContainer
      outerContainerStyle={styles.outerContainerStyle}
      defaultStyle={styles.defaultStyle}
      middleContainerStyle={styles.middleContainerStyle}
      innerContainerStyle={styles.innerContainerStyle}
      isScrollInside={true}
    >
      {memoizedStatSliderCompares}
    </HorizontalScrollContainer>
  );
};

const styles = StyleSheet.create({
  outerContainerStyle: { margin: 10, marginTop: 0 },
  defaultStyle: { borderRadius: 12 },
  middleContainerStyle: { borderRadius: 12 },
  innerContainerStyle: { padding: 12 },
});

export default React.memo(StatSliderComparesContainer);
