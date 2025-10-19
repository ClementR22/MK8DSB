import React, { useMemo } from "react";
import { useScreen } from "@/contexts/ScreenContext";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { StyleSheet, View, ViewStyle } from "react-native";
import StatGaugeContainer from "./StatGaugeContainer";
import StatGaugeSetCardBar from "./StatGaugeSetCardBar";
import useStatsStore from "@/stores/useStatsStore";

interface StatGaugeSetCardsContainerProps {
  stats: number[];
  containerStyle: ViewStyle;
}

const StatGaugeSetCardsContainer: React.FC<StatGaugeSetCardsContainerProps> = ({ stats, containerStyle }) => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const { resultStats } = useResultStats();

  const chosenStats = useStatsStore((state) => state.chosenStats);

  const sliderContent = useMemo(() => {
    const filteredResultStats = resultStats.filter((stat) => stat.checked);

    if (filteredResultStats.length === 0) {
      return null;
    }

    return filteredResultStats.map((stat: ResultStat) => {
      const originalIndex = resultStats.findIndex((item) => item.name === stat.name);
      const statValue = stats[originalIndex];

      let chosenValue: number | undefined = undefined;
      if (isInSearchScreen && chosenStats[originalIndex]?.checked) {
        chosenValue = chosenStats[originalIndex].value;
      }

      return (
        <StatGaugeContainer
          key={stat.name}
          name={stat.name}
          value={statValue}
          isInSetCard={true}
          chosenValue={chosenValue}
          bonusEnabled={isInSearchScreen}
        >
          <StatGaugeSetCardBar
            obtainedValue={statValue}
            chosenValue={chosenValue}
            isInSearchScreen={isInSearchScreen}
          />
        </StatGaugeContainer>
      );
    });
  }, [resultStats, stats, isInSearchScreen, chosenStats]);

  if (!sliderContent) {
    return null;
  }

  return <View style={[styles.container, containerStyle]}>{sliderContent}</View>;
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default React.memo(StatGaugeSetCardsContainer);
