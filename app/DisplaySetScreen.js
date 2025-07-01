import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { statNames } from "@/data/data";
import StatSliderCompare from "@/components/statSliderCompare/StatSliderCompare";
import { resultStatsInit } from "@/config/resultStatsInit";
import ElementsSelector from "@/components/elementsSelector/ElementsSelector";

const DisplaySetScreen = () => {
  const scrollRef = useRef(null);
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const setsStatsForSelectedStat = useMemo(() => {
    const result = {}; // { [key: string]: number[] }

    statNames.forEach((statName) => {
      result[statName] = [];
    });

    setsListDisplayed.forEach((setToShow) => {
      const setToShowStatsList = setToShow.stats;

      setToShowStatsList.forEach((statValue, index) => {
        const statName = statNames[index];
        if (statName) {
          result[statName].push(statValue);
        }
      });
    });
    return result;
  }, [setsListDisplayed]);

  const [compareStats, setCompareStats] = useState(resultStatsInit);

  const handleSelectCompareStat = (name) => {
    const newCompareStats = compareStats.map((stat) => {
      return { ...stat, checked: stat.name === name };
    });
    setCompareStats(newCompareStats);
  };

  const hideRemoveSet = setsListDisplayed.length === 1;

  const selectedStatName = compareStats.find((stat) => stat.checked).name;

  const scrollToSetCard = useCallback((index) => {
    if (scrollRef.current && scrollRef.current.scrollToSetCard) {
      scrollRef.current.scrollToSetCard(index);
    }
  }, []); // No dependencies needed if setCardContainerRef is stable

  return (
    <ScreenProvider screenName="display">
      <ScrollView scrollEnabled={isScrollEnable}>
        <DisplaySetScreenPressablesContainer scrollRef={scrollRef} />

        <SetCardContainer ref={scrollRef} setsToShow={setsListDisplayed} hideRemoveSet={hideRemoveSet} />

        <StatSliderCompare
          name={selectedStatName}
          setsStats={setsStatsForSelectedStat[selectedStatName]}
          handleSelectCompareStat={handleSelectCompareStat}
          scrollToSetCard={scrollToSetCard}
        />
      </ScrollView>
    </ScreenProvider>
  );
};

export default React.memo(DisplaySetScreen);
