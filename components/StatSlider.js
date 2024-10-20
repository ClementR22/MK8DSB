import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import StatFilterSelector from "./StatFilterSelector";

// const screenWidth = Dimensions.get("window").width;

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
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FEF7FF",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#CAC4D0",
    marginBottom: 6,
    width: "80vw"
  },
  containerTop: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginLeft: 0,
  },
  sliderContainer: {
    // Note : can use vh and vw as view height and view width for screen size
    // width: "84vw",

    height: 20,
    alignItems: "stretch",
    justifyContent: "center",
  },
  thumb: {
    width: 4,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#6750A4",
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E8DEF8",
  },
});

export default StatSlider;
