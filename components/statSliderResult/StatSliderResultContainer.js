import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatSliderResult from "./StatSliderResult";
import { useTheme } from "../../utils/ThemeContext";
import { translate } from "../../i18n/translations";

const StatSliderResultContainer = ({
  setsToShowMultipleStatsLists,
  isFoundStatsVisible,
  chosenStats,
  situation,
}) => {
  const th = useTheme();

  console.log("dans StatSliderResultContainer, situation=", situation);

  console.log(setsToShowMultipleStatsLists, isFoundStatsVisible, chosenStats);

  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      {isFoundStatsVisible.map(({ name, checked }, statIndex) => {
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
                {situation == "/SearchSetScreen" &&
                  ` : ${JSON.stringify(
                    setsToShowMultipleStatsLists[0][statIndex]
                  )}`}
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
                    isWanted={chosenStats[statIndex]?.checked}
                    wantedValue={chosenStats[statIndex]?.value}
                  />
                  {situation != "/SearchSetScreen" && (
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
