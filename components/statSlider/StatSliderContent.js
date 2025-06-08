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
        text: {
          color: theme.on_surface,
          fontSize: 22,
          marginLeft: 6,
          flexShrink: 1,
          maxWidth: "90%",
          overflow: "hidden",
          fontWeight: 600,
        },
        containerBottom: {
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 3,
        },
        sliderContainer: {
          height: 50,
          alignItems: "stretch",
          justifyContent: "center",
        },
        track: {
          height: 16,
          borderRadius: 100,
          backgroundColor: "blue", //theme.secondary_container,
          color: theme.on_surface,
        },
        thumb: {
          backgroundColor: theme.primary,
          borderRadius: 100,
          width: 4,
          height: 44,
        },
        minimumTrack: {
          backgroundColor: theme.primary,
          borderColor: theme.surface,
          borderRightWidth: 8,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        maximumTrack: {
          backgroundColor: theme.secondary_container,
          borderColor: theme.surface,
          borderLeftWidth: 8,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        containerRight: {
          paddingTop: 4,
        },
      }),
    [theme, borderColor],
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <View style={styles.containerTop}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.text}>
              {translate(name)}
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
              thumbStyle={styles.thumb}
              minimumTrackStyle={styles.minimumTrack}
              maximumTrackStyle={[styles.maximumTrack, {
                borderLeftWidth: (tempValue / 6) * 230 + 10,
              }]}
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
