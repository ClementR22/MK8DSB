import React, { useMemo } from "react";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { compactStatNames } from "@/data/stats/statsData";
import { StyleSheet, View } from "react-native";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";

interface StatSliderSetCardsContainerProps {
  setToShowStats: number[];
}

const StatSliderSetCardsContainer: React.FC<StatSliderSetCardsContainerProps> = ({ setToShowStats }) => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const { resultStats } = useResultStats();

  const chosenStatsFromStore = useSetsStore((state) => state.chosenStats);

  const { setCardStyle } = useSetCardStyle();

  const memoizedSliders = useMemo(() => {
    const filteredResultStats = resultStats.filter((stat) => stat.checked);

    if (filteredResultStats.length === 0) {
      return null;
    }

    return (
      <View style={[styles.container, setCardStyle]}>
        {filteredResultStats.map((stat: ResultStat) => {
          const originalIndex = resultStats.findIndex((item) => item.name === stat.name);

          const compactName = compactStatNames[stat.name];
          const statValue = setToShowStats[originalIndex];

          let chosenValue: number | undefined = undefined;
          if (isInSearchScreen && chosenStatsFromStore[originalIndex]?.checked) {
            chosenValue = chosenStatsFromStore[originalIndex].value;
          }

          return (
            <StatSliderCompact
              key={stat.name}
              name={compactName}
              value={statValue}
              isInSetCard={true}
              chosenValue={chosenValue}
            />
          );
        })}
      </View>
    );
  }, [resultStats, setToShowStats, isInSearchScreen, chosenStatsFromStore, setCardStyle]);

  return <>{memoizedSliders}</>;
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
});

export default React.memo(StatSliderSetCardsContainer);
