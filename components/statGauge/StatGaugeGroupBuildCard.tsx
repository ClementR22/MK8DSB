import React, { useMemo } from "react";
import { useScreen } from "@/contexts/ScreenContext";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { StyleSheet, View, ViewStyle } from "react-native";
import StatGaugeBarBuildCard from "./StatGaugeBarBuildCard";
import useStatsStore from "@/stores/useStatsStore";
import StatGaugeContainer from "./StatGaugeContainer";
import { GAP_STAT_GAUGE_GROUP } from "@/utils/designTokens";

interface StatGaugeGroupBuildCardProps {
  stats: number[];
  containerStyle: ViewStyle;
}

const StatGaugeGroupBuildCard: React.FC<StatGaugeGroupBuildCardProps> = ({ stats, containerStyle }) => {
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
          chosenValue={chosenValue}
          isInBuildCard={true}
          statFilterNumber={0}
        >
          <StatGaugeBarBuildCard
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

  return <View style={[containerStyle, styles.container]}>{sliderContent}</View>;
};

const styles = StyleSheet.create({
  container: {
    gap: GAP_STAT_GAUGE_GROUP,
    padding: 0,
    paddingVertical: 7,
    paddingLeft: 4,
  },
});

export default React.memo(StatGaugeGroupBuildCard);
