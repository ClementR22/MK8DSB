import React, { useMemo } from "react";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { statNamesCompact } from "@/data/stats/statsData";
import { StyleSheet, View } from "react-native";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";
import StatGaugeContainer from "./StatGaugeContainer";
import StatGaugeSetCardBar from "./StatGaugeSetCardBar";

interface StatGaugeSetCardsContainerProps {
  setToShowStats: number[];
}

const StatGaugeSetCardsContainer: React.FC<StatGaugeSetCardsContainerProps> = ({ setToShowStats }) => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const { resultStats } = useResultStats();

  const chosenStats = useSetsStore((state) => state.chosenStats);

  const { setCardStyle } = useSetCardStyle(); // la prop SET_CARD_WIDTH n'est pas nécessaire ici

  const memoizedSliders = useMemo(() => {
    const filteredResultStats = resultStats.filter((stat) => stat.checked);

    if (filteredResultStats.length === 0) {
      return null;
    }

    return (
      <View style={[styles.container, setCardStyle]}>
        {filteredResultStats.map((stat: ResultStat) => {
          const originalIndex = resultStats.findIndex((item) => item.name === stat.name);

          const compactName = statNamesCompact[stat.name];
          const statValue = setToShowStats[originalIndex];

          let chosenValue: number | undefined = undefined;
          if (isInSearchScreen && chosenStats[originalIndex]?.checked) {
            chosenValue = chosenStats[originalIndex].value;
          }

          return (
            <StatGaugeContainer
              key={stat.name}
              name={compactName}
              value={statValue}
              isInSetCard={true}
              chosenValue={chosenValue}
            >
              <StatGaugeSetCardBar
                obtainedValue={statValue}
                chosenValue={chosenValue}
                isInSearchScreen={isInSearchScreen}
              />
            </StatGaugeContainer>
          );
        })}
      </View>
    );
  }, [resultStats, setToShowStats, isInSearchScreen, setCardStyle]);

  return <>{memoizedSliders}</>;
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default React.memo(StatGaugeSetCardsContainer);
