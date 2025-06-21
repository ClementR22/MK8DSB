import { translate } from "@/translations/translations";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";
import useGeneralStore from "@/stores/useGeneralStore";
import useSetsStore from "@/stores/useSetsStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import TooltipWrapper from "../TooltipWrapper";
import { useThemeStore } from "@/stores/useThemeStore";

interface StatSliderContentProps {
  name: string;
  value: number;
  statFilterNumber: number;
  setStatFilterNumber: (num: number) => void;
}

const MAX_VALUE = 6;

const StatSliderContent = ({ name, value, statFilterNumber, setStatFilterNumber }: StatSliderContentProps) => {
  const theme = useThemeStore((state) => state.theme);

  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);

  const [tempValue, setTempValue] = useState(value);

  const onValueChange = useCallback(([v]: [number]) => setTempValue(v), []);
  const onSlidingStart = useCallback(() => setIsScrollEnable(false), [setIsScrollEnable]);
  const onSlidingComplete = useCallback(
    ([v]: [number]) => {
      updateStatValue(name, v);
      setIsScrollEnable(true);
    },
    [updateStatValue, name, setIsScrollEnable]
  );

  useEffect(() => {
    if (value !== tempValue) {
      setTempValue(value);
    }
  }, [value]);

  const memoizedBorderColor = useMemo(
    () => getStatSliderBorderColor(statFilterNumber, theme),
    [statFilterNumber, theme]
  );

  const calculatedMaxTrackBorderWidth = useMemo(() => (tempValue / MAX_VALUE) * 230 + 10, [tempValue]);

  const innerContainerDynamicStyles = useMemo(
    () => ({
      backgroundColor: theme.surface,
      borderColor: memoizedBorderColor,
    }),
    [theme.surface, memoizedBorderColor]
  );

  const textColorStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const minimumTrackDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.primary,
      borderColor: theme.surface,
    }),
    [theme.primary, theme.surface]
  );

  const maximumTrackDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.secondary_container,
      borderColor: theme.surface,
      borderLeftWidth: calculatedMaxTrackBorderWidth,
    }),
    [theme.secondary_container, theme.surface, calculatedMaxTrackBorderWidth]
  );

  const thumbDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.primary,
    }),
    [theme.primary]
  );

  return (
    <TooltipWrapper
      tooltipText="DefineAValue"
      style={styles.outerContainer}
      innerContainerStyle={StyleSheet.flatten([styles.innerContainer, innerContainerDynamicStyles])}
    >
      <View style={styles.containerLeft}>
        <View style={styles.containerTop}>
          <View style={styles.textWrapper}>
            <Text
              style={StyleSheet.flatten([styles.text, styles.nameText, textColorStyle])}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {translate(name)}
            </Text>
            <Text style={StyleSheet.flatten([styles.text, styles.separatorText, textColorStyle])}>
              {translate(":")}
            </Text>
          </View>

          <View style={styles.valueWrapper}>
            <Text style={[styles.text, textColorStyle]}>{tempValue}</Text>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.sliderContainer}>
            <Slider
              value={tempValue}
              onValueChange={onValueChange}
              onSlidingStart={onSlidingStart}
              onSlidingComplete={onSlidingComplete}
              minimumValue={0}
              maximumValue={MAX_VALUE}
              step={0.25}
              trackStyle={styles.track}
              thumbTouchSize={{ width: 10, height: 10 }}
              thumbStyle={StyleSheet.flatten([styles.thumb, thumbDynamicStyle])}
              minimumTrackStyle={StyleSheet.flatten([styles.minimumTrack, minimumTrackDynamicStyle])}
              maximumTrackStyle={StyleSheet.flatten([styles.maximumTrack, maximumTrackDynamicStyle])}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerRight}>
        <ButtonMultiStateToggle
          number={statFilterNumber}
          setNumber={setStatFilterNumber}
          filterCase={true}
          tooltipText="ChangeCondition"
        />
      </View>
    </TooltipWrapper>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 0,
    width: "100%",
  },
  innerContainer: {
    flexDirection: "row",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 2,
    borderRadius: 17,
  },
  containerLeft: {
    flex: 1,
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
  nameText: {
    marginLeft: 10,
    overflow: "hidden",
  },
  separatorText: {
    marginRight: 2,
  },
  valueWrapper: {
    width: 50,
    alignItems: "flex-start",
  },
  containerBottom: {
    width: "100%",
    paddingHorizontal: 10,
  },
  sliderContainer: {
    height: 50,
    alignItems: "stretch",
    justifyContent: "center",
  },
  track: {
    height: 16,
    borderRadius: 100,
  },
  thumb: {
    borderRadius: 100,
    width: 4,
    height: 44,
  },
  minimumTrack: {
    borderRightWidth: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  maximumTrack: {
    borderLeftWidth: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  containerRight: {
    paddingTop: 4,
  },
});

export default React.memo(StatSliderContent);
