import React from "react";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { StyleSheet, View } from "react-native";
import { useResultStats } from "@/contexts/ResultStatsContext";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { compactStatNames } from "@/data/data";

const StatSliderSetCardsContainer = ({ setToShowStats }) => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const { resultStats } = useResultStats();

  let chosenStats = null; // Initialisé à null par défaut

  if (isInSearchScreen) {
    chosenStats = useSetsStore((state) => state.chosenStats);
  }

  const styles = StyleSheet.create({
    container: { width: "100%", flexGrow: 1, gap: 10 },
  });

  return (
    <View style={styles.container}>
      {resultStats.map(({ name, checked }, index) => {
        if (checked) {
          return (
            <StatSliderCompact
              key={index}
              name={compactStatNames[name]}
              value={setToShowStats[index]}
              isInSetCard={true}
              // chosenValue={isInSearchScreen && chosenStats[index].value}
            />
          );
        }
        return null;
      })}
    </View>
  );
};

export default StatSliderSetCardsContainer;
