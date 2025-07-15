import React, { useMemo, useCallback, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

import BoxContainer from "@/primitiveComponents/BoxContainer";
import HorizontalScrollContainer from "../setCard/HorizontalScrollContainer";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderCompare from "./StatSliderCompare";
import { SET_CARD_CONTAINER_PADDING } from "@/utils/designTokens";

interface StatSliderComparesContainerProps {
  setsColorsMap: Map<string, string>;

  scrollToSetCard: (id: string) => void;
}

const StatSliderComparesContainer: React.FC<StatSliderComparesContainerProps> = ({
  setsColorsMap,
  scrollToSetCard,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);
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
      outerContainerStyle={{ margin: 10, borderRadius: 12 }}
      innerContainerStyle={{ padding: 14 }}
      isScrollInside={true}
    >
      {memoizedStatSliderCompares}
    </HorizontalScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10, // Espacement entre le tooltip et le sélecteur
  },
  innerContainer: {
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 12,
  },
  textContainer: {
    marginBottom: 3, // Espacement entre le titre et les barres de stat
    alignItems: "center", // Centrer le texte
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  statBarsContainer: {
    width: "100%",
    gap: 0,
  },
});

export default React.memo(StatSliderComparesContainer);
