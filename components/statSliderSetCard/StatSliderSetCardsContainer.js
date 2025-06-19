import React from "react";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { StyleSheet, View } from "react-native";
import { useResultStats } from "@/contexts/ResultStatsContext";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { compactStatNames } from "@/data/data";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { useThemeStore } from "@/stores/useThemeStore";

const StatSliderSetCardsContainer = ({ setToShowStats }) => {
  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const { resultStats } = useResultStats();

  let chosenStats = null; // Initialisé à null par défaut
  if (isInSearchScreen) {
    chosenStats = useSetsStore((state) => state.chosenStats);
  }

  const noResultStats = resultStats.length === 0;
  return (
    <>
      {!noResultStats && (
        <BoxContainer contentBackgroundColor={theme.surface} margin={0} marginTop={8} widthContainer={220}>
          {resultStats.map(({ name, checked }, index) => {
            if (checked) {
              return (
                <StatSliderCompact
                  key={index}
                  name={compactStatNames[name]}
                  value={setToShowStats[index]}
                  isInSetCard={true}
                  chosenValue={isInSearchScreen && chosenStats[index].value}
                />
              );
            }
            return null;
          })}
        </BoxContainer>
      )}
    </>
  );
};

export default StatSliderSetCardsContainer;
