import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatSliderResult from "./StatSliderResult";
import { translate } from "../../i18n/translations";
import { getIsStatsVisible } from "../../utils/getIsStatsVisible";

const StatSliderResultContainer = ({
  setsToShowMultipleStatsLists,
  chosenStats,
  situation,
}) => {
  const isStatsVisible = getIsStatsVisible(situation);

  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      {isStatsVisible.map(({ name, checked }, statIndex) => {
        const translated_name = translate(name);
        if (checked) {
          return (
            <View
              key={statIndex}
              style={[
                styles.sliderContainer,
                { backgroundColor: "red" }, //th.surface_container },
              ]}
            >
              <Text style={styles.text}>
                {translated_name}
                {situation != "search" ||
                  (situation == "save" &&
                    ` : ${JSON.stringify(
                      setsToShowMultipleStatsLists[0][statIndex]
                    )}`)}
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
                    key={setIndex}
                    value={setToShowStats[statIndex]}
                    chosenValue={chosenStats?.[statIndex]?.value}
                  />
                  {situation != "search" && (
                    <Text style={{ flex: 0.2 }}>
                      {setToShowStats[statIndex]}
                    </Text>
                  )}
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
