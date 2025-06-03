import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderResult from "./StatSliderResult";
import { translate } from "@/translations/translations";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore"; // Gardez l'import

const StatSliderResultContainer = ({ setsToShowMultipleStatsLists }) => {
  const screenName = useScreen();
  const { statsVisibleList } = useStatsVisibleList();
  const isInSearchScreen = screenName === "search";

  let chosenStats = null; // Initialisé à null par défaut

  if (isInSearchScreen) {
    chosenStats = useSetsStore((state) => state.chosenStats);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      {statsVisibleList.map(({ name, checked }, statIndex) => {
        const nameTranslated = translate(name);
        if (checked) {
          return (
            <View
              key={statIndex}
              style={[
                styles.sliderContainer,
                { backgroundColor: "red" }, //theme.surface_container },
              ]}
            >
              <Text style={styles.text}>
                {nameTranslated}
                {isInSearchScreen && ` : ${JSON.stringify(setsToShowMultipleStatsLists[0]?.[statIndex])}`}
              </Text>
              {setsToShowMultipleStatsLists.map((setToShowStats, setIndex) => {
                const chosenValue = isInSearchScreen ? chosenStats[statIndex].value : null;

                return (
                  <View
                    key={setIndex}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "yellow",
                    }}
                  >
                    <StatSliderResult value={setToShowStats[statIndex]} chosenValue={chosenValue} />
                    {!isInSearchScreen && <Text style={{ flex: 0.2 }}>{setToShowStats[statIndex]}</Text>}
                  </View>
                );
              })}
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};

export default StatSliderResultContainer;

const styles = StyleSheet.create({
  sliderContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
