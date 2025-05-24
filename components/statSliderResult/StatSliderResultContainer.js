import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderResult from "./StatSliderResult";
import { translate } from "@/translations/translations";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { useScreen } from "../../contexts/ScreenContext";

const StatSliderResultContainer = ({ setsToShowMultipleStatsLists }) => {
  const screenName = useScreen();
  const { statsVisibleList, chosenStatsInScreen } = useStatsVisibleList();

  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      {statsVisibleList.map(({ name, checked }, statIndex) => {
        const nameTranslated = translate(name); // avant le if pour respecter l'ordre d'appel des hooks
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
                {screenName == "search" && ` : ${JSON.stringify(setsToShowMultipleStatsLists[0][statIndex])}`}
              </Text>
              {setsToShowMultipleStatsLists.map((setToShowStats, setIndex) => (
                <View
                  key={setIndex}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "yellow",
                  }}
                >
                  <StatSliderResult
                    value={setToShowStats[statIndex]}
                    chosenValue={chosenStatsInScreen?.[statIndex]?.value}
                  />
                  {screenName != "search" && <Text style={{ flex: 0.2 }}>{setToShowStats[statIndex]}</Text>}
                </View>
              ))}
            </View>
          );
        }
      })}
    </View>
  );
};

export default StatSliderResultContainer;

const styles = StyleSheet.create({
  sliderContainer: {
    //width: "100%",
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
