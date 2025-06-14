import React from "react";
import { StyleSheet, View } from "react-native";
import { translate } from "@/translations/translations";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderResult from "./StatSliderResult";

const StatSliderResultsContainer = ({ setsToShowMultipleStatsLists }) => {
  const screenName = useScreen();
  const { resultStats } = useResultStats();
  const isInSearchScreen = screenName === "search";

  let chosenStats = null; // Initialisé à null par défaut

  if (isInSearchScreen) {
    chosenStats = useSetsStore((state) => state.chosenStats);
  }

  const styles = StyleSheet.create({
    container: { width: "100%", flexGrow: 1, gap: 10 },
  });

  return (
    <View style={styles.container}>
      {resultStats.map(({ name, checked }, statIndex) => {
        const stat_i_multipleSetStats = setsToShowMultipleStatsLists.map((statList) => statList[statIndex]);

        if (checked) {
          return (
            <StatSliderResult
              key={statIndex}
              name={name}
              stat_i_multipleSetStats={stat_i_multipleSetStats}
              chosenValue={isInSearchScreen && chosenStats[statIndex].value}
            />
          );
        }
        return null;
      })}
    </View>
  );
};

export default StatSliderResultsContainer;
