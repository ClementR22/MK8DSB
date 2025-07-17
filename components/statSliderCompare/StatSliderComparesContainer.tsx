import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import HorizontalScrollContainer from "../setCard/HorizontalScrollContainer";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderCompare, { STAT_SLIDER_COMPARE_WIDTH } from "./StatSliderCompare";
import PagesNavigator from "../elementCompactSelector/PagesNavigator";
import { vw } from "../styles/theme";
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

  const { filteredResultStats, totalPages } = useMemo(() => {
    const filteredResultStats = resultStats.filter((stat) => stat.checked);
    const totalPages = filteredResultStats.length;
    return { filteredResultStats, totalPages };
  }, [resultStats]);

  const data = useMemo(() => {
    const data = filteredResultStats.map((stat: ResultStat) => {
      const statIndex = statNames.indexOf(stat.name);

      const setsIdAndValueWithColor = setsListDisplayed.map((set) => ({
        id: set.id,
        value: set.stats[statIndex],
        color: setsColorsMap.get(set.id) || theme.surface_variant || theme.surface_container_high,
      }));

      return { name: stat.name, setsIdAndValueWithColor: setsIdAndValueWithColor };
    });

    return data;
  }, [filteredResultStats, setsListDisplayed, setsColorsMap]);

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <View style={{ padding: 15, backgroundColor: theme.surface_container_high }}>
        <PaginatedWrapper
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
          totalPages={totalPages}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  outerContainerStyle: { margin: 10, marginTop: 0 },
  defaultStyle: { borderRadius: 12 },
  middleContainerStyle: { borderRadius: 12 },
  innerContainerStyle: { padding: 12 },
});

export default React.memo(StatSliderComparesContainer);
