import React, { useEffect, useRef, useMemo, useCallback } from "react"; // Ajout de useMemo et useCallback
import { ScrollView } from "react-native";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { statNames } from "@/data/data";
import StatSliderCompare from "@/components/statSliderCompare/StatSliderCompare";

const DisplaySetScreen = () => {
  const scrollRef = useRef(null);
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const memoizedSetsStatsByStatName = useMemo(() => {
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

  console.log("memoizedSetsStatsByStatName", memoizedSetsStatsByStatName);

  const hideRemoveSet = setsListDisplayed.length === 1;

  const name = "speedGround";

  return (
    <ScreenProvider screenName="display">
      <ScrollView scrollEnabled={isScrollEnable} ref={scrollRef}>
        <DisplaySetScreenPressablesContainer scrollRef={scrollRef} />

        <SetCardContainer ref={scrollRef} setsToShow={setsListDisplayed} hideRemoveSet={hideRemoveSet} />

        <StatSliderCompare name={name} setsStats={memoizedSetsStatsByStatName[name]} />
      </ScrollView>
    </ScreenProvider>
  );
};

export default React.memo(DisplaySetScreen);
