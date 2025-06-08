import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderResult from "./StatSliderResult";
import { translate } from "@/translations/translations";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore"; // Gardez l'import

const StatSliderResultContainer = ({ setsToShowMultipleStatsLists }) => {
  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();
  const { statsVisibleList } = useStatsVisibleList();
  const isInSearchScreen = screenName === "search";

  let chosenStats = null; // Initialisé à null par défaut

  if (isInSearchScreen) {
    chosenStats = useSetsStore((state) => state.chosenStats);
  }

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
      color: theme.on_surface,
    },
  });

  return (
    <View style={{ width: "100%", flexGrow: 1 }}>
      {statsVisibleList.map(({ name, checked }, statIndex) => {
        const nameTranslated = translate(name);
        if (checked) {
          return (
            <View
              key={statIndex}
              style={[
                styles.sliderContainer,
                { backgroundColor: theme.surface_container_high, marginHorizontal: 16 }, //theme.surface_container },
              ]}
            >
              <Text style={styles.text}>
                {nameTranslated}
                {translate(":")}
                {JSON.stringify(setsToShowMultipleStatsLists[0]?.[statIndex])}
              </Text>
              {setsToShowMultipleStatsLists.map((setToShowStats, setIndex) => {
                const chosenValue = isInSearchScreen ? chosenStats[statIndex].value : null;

                return (
                  <View
                    key={setIndex}
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                    }}
                  >
                    <StatSliderResult value={setToShowStats[statIndex]} chosenValue={chosenValue} />
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
