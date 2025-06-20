import React, { useMemo } from "react";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { compactStatNames } from "@/data/data";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { useThemeStore } from "@/stores/useThemeStore";

interface StatSliderSetCardsContainerProps {
  setToShowStats: number[];
}

interface ChosenStatItem {
  checked: boolean;
  value: number;
}

const StatSliderSetCardsContainer: React.FC<StatSliderSetCardsContainerProps> = ({ setToShowStats }) => {
  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const { resultStats } = useResultStats();

  const chosenStatsFromStore = useSetsStore((state) => state.chosenStats) as ChosenStatItem[];

  const memoizedSliders = useMemo(() => {
    const filteredResultStats = resultStats.filter((stat) => stat.checked);

    if (filteredResultStats.length === 0) {
      return null;
    }

    return (
      <BoxContainer contentBackgroundColor={theme.surface} margin={0} marginTop={8} widthContainer={220}>
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
      </BoxContainer>
    );
  }, [resultStats, setToShowStats, isInSearchScreen, chosenStatsFromStore, theme.surface]);

  return <>{memoizedSliders}</>;
};

export default React.memo(StatSliderSetCardsContainer);
