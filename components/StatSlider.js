import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import StatFilterSelector from "./StatFilterSelector";

const screenWidth = Dimensions.get("window").width;

const StatSlider = ({
  name,
  sliderValue,
  setSliderValue,
  statFilterNumber,
  setStatFilterNumber,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.text}>
          {name} : {sliderValue}
        </Text>
        <View>
          <StatFilterSelector
            statFilterNumber={statFilterNumber}
            setStatFilterNumber={setStatFilterNumber}
          />
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          value={sliderValue}
          onValueChange={([value]) => setSliderValue(value)}
          minimumValue={0}
          maximumValue={6}
          step={0.25}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
          thumbTouchSize={{ width: 10, height: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: "#f0f8ff",
    borderWidth: 5,
    borderRadius: 4,
    marginBottom: 6,
  },
  containerTop: {
    width: "100",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginLeft: 0,
  },
  sliderContainer: {
    width: screenWidth * 0.87,
    height: 20,
    alignItems: "stretch",
    justifyContent: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
});

export default StatSlider;
