import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatSliderResult from "./StatSliderResult";
import { useTheme } from "./styles/theme";

const StatSliderResultContainer = ({
  setToShowStats,
  isFoundStatsVisible,
  chosenStats,
}) => {
  const th = useTheme();

  return (
    <View style={{ flex: 1 }}>
      {isFoundStatsVisible.map(({ name, checked }, index) => {
        if (checked) {
          return (
            <View
              key={index}
              style={[
                styles.sliderContainer,
                { backgroundColor: th.surface_container },
              ]}
            >
              <Text style={styles.text}>
                {name} : {JSON.stringify(setToShowStats[index])}
              </Text>
              <StatSliderResult
                value={setToShowStats[index]}
                wantedValue={chosenStats[index]?.value} // Vérification sécurisée
              />
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
    width: "100%",
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
