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

  // permet de scroller automatiquement quand currentPage change
  const flatListRef = useRef<FlatList>(null);
  const isManuallyScrolling = useRef(false);

  useEffect(() => {
    try {
      flatListRef.current?.scrollToIndex({ index: currentPage, animated: true });
    } catch (error) {
      console.warn("scrollToIndex failed:", error);
      // Attendre un peu puis re-tenter
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: currentPage, animated: true });
      }, 100);
    }
  }, [currentPage, data]);

  console.log("setsIdAndValueWithColor", data);

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / STAT_SLIDER_COMPARE_WIDTH);

    if (isManuallyScrolling.current) {
      // On ignore ce callback car on est en scroll programmé
      isManuallyScrolling.current = false;
    } else {
      // Scroll utilisateur → on MAJ le state
      setCurrentPage(pageIndex);
    }
  };

  return (
    <>
      <View style={{ padding: 15, backgroundColor: theme.surface_container_high }}>
        <FlatList
          ref={flatListRef}
          data={data}
          initialNumToRender={1} // Ne rendre que la première page initialement
          maxToRenderPerBatch={2} // Limiter le nombre de pages rendues par batch
          windowSize={3} // Garder +1 page en mémoire de chaque côté
          removeClippedSubviews={true} // Recycler les vues hors écran (à tester)
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.name}-${index}`} // Ajouter la catégorie pour éviter des conflits
          renderItem={({ item }) => (
            <StatSliderCompare
              key={item.name}
              name={item.name}
              setsIdAndValue={item.setsIdAndValueWithColor}
              scrollToSetCard={scrollToSetCard}
            />
          )}
          onMomentumScrollEnd={handleMomentumScrollEnd}
        />
      </View>

      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
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
