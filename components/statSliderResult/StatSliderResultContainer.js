import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatSliderResult from "./StatSliderResult";
import { useTheme } from "../styles/theme";

const StatSliderResultContainer = ({
  multipleSetToShowStatsLists,
  isFoundStatsVisible,
  chosenStats,
  displayCase = false,
}) => {
  const th = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      {isFoundStatsVisible.map(({ name, checked }, statIndex) => {
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
                {name}
                {!displayCase
                  ? ` : ${JSON.stringify(
                      multipleSetToShowStatsLists[0][statIndex]
                    )}`
                  : null}
              </Text>
              {multipleSetToShowStatsLists.map((setToShowStats, setIndex) => (
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
                    wantedValue={chosenStats[statIndex]?.value}
                  />
                  {displayCase ? (
                    <Text style={{ flex: 0.2 }}>
                      {setToShowStats[statIndex]}
                    </Text>
                  ) : null}
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
