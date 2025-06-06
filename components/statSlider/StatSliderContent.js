import { translate } from "@/translations/translations";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";

const StatSliderContent = ({ name, value, number, setNumber, theme, onSlidingComplete }) => {
  const [tempValue, setTempValue] = useState(value);
  const onValueChange = ([v]) => setTempValue(v);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const borderColor = useMemo(() => {
    switch (number) {
      case 0:
        return theme.outline_variant;
      case 1:
        return theme.primary;
      case 2:
        return "black";
      default:
        return theme.outline_variant;
    }
  }, [number, theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          paddingHorizontal: 7,
          paddingVertical: 3,
          backgroundColor: theme.surface,
          borderWidth: 2,
          borderRadius: 12,
          borderColor,
          marginBottom: 0,
          width: "100%",
        },
        containerLeft: { flex: 1 },
        containerTop: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 3,
        },
        textContainer: {
          flexDirection: "row",
          flex: 1,
        },
        textLeft: {
          color: theme.on_surface,
          fontSize: 22,
          marginLeft: 6,
          flexShrink: 1,
          maxWidth: "70%",
          overflow: "hidden",
        },
        textRight: {
          color: theme.on_surface,
          fontSize: 22,
          flexShrink: 0,
        },
        containerBottom: {
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 3,
        },
        sliderContainer: {
          height: 20,
          alignItems: "stretch",
          justifyContent: "center",
        },
        track: {
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.secondary_container,
        },
        containerRight: { paddingTop: 4 },
      }),
    [theme, borderColor]
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <View style={styles.containerTop}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.textLeft}>
              {translate(name)}
            </Text>
            <Text style={styles.textRight}>
              {translate(":")}
              {tempValue}
            </Text>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.sliderContainer}>
            <Slider
              value={tempValue}
              onValueChange={onValueChange}
              onSlidingComplete={onSlidingComplete}
              minimumValue={0}
              maximumValue={6}
              step={0.25}
              trackStyle={styles.track}
              thumbTouchSize={{ width: 10, height: 10 }}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerRight}>
        <ButtonMultiStateToggle number={number} setNumber={setNumber} filterCase={true} tooltipText="ChangeCondition" />
      </View>
    </View>
  );
};

export default StatSliderContent;
