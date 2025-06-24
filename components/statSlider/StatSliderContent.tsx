import { translateToLanguage } from "@/translations/translations";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";
import useGeneralStore from "@/stores/useGeneralStore";
import useSetsStore from "@/stores/useSetsStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import TooltipWrapper from "../TooltipWrapper";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface StatSliderContentProps {
  name: string;
  value: number;
  statFilterNumber: number;
  setStatFilterNumber: (num: number) => void;
}

const MAX_VALUE = 6;

const StatSliderContent = ({ name, value, statFilterNumber, setStatFilterNumber }: StatSliderContentProps) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);

  const [tempValue, setTempValue] = useState(value);

  const onValueChange = useCallback(([v]: [number]) => setTempValue(v), []);
  const onSlidingStart = useCallback(() => setIsScrollEnable(false), [setIsScrollEnable]);
  const onSlidingComplete = useCallback(
    ([v]: [number]) => {
      if (v !== value) {
        updateStatValue(name, v);
      }
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

  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);
  const translatedSeparator = useMemo(() => translateToLanguage(":", language), [language]);

  return (
    <TooltipWrapper
      tooltipText="DefineAValue"
      style={StyleSheet.flatten([styles.container, innerContainerDynamicStyles])}
      innerContainerStyle={styles.innerContainer}
    >
      <View style={styles.containerLeft}>
        <View style={styles.textWrapper}>
          <Text style={StyleSheet.flatten([styles.text, textColorStyle])} numberOfLines={1} ellipsizeMode="tail">
            {translatedName}
          </Text>
          <Text style={StyleSheet.flatten([styles.text, styles.separatorText, textColorStyle])}>
            {translatedSeparator}
          </Text>
        </View>

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
            thumbTouchSize={styles.thumbTouchSize}
            thumbStyle={StyleSheet.flatten([styles.thumb, thumbDynamicStyle])}
            minimumTrackStyle={StyleSheet.flatten([styles.minimumTrack, minimumTrackDynamicStyle])}
            maximumTrackStyle={StyleSheet.flatten([styles.maximumTrack, maximumTrackDynamicStyle])}
          />
        </View>
      </View>

      <View style={styles.containerRight}>
        <View style={styles.valueWrapper}>
          <Text style={[styles.text, textColorStyle]}>{tempValue}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <ButtonMultiStateToggle
            number={statFilterNumber}
            setNumber={setStatFilterNumber}
            filterCase={true}
            tooltipText="ChangeCondition"
          />
        </View>
      </View>
    </TooltipWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 17,
  },
  innerContainer: {
    flexDirection: "row",
    paddingTop: 3,
    paddingHorizontal: 13,
    gap: 13,
  },
  containerLeft: { flex: 1, justifyContent: "flex-start" },
  containerRight: { alignItems: "center", justifyContent: "flex-start", width: 46 },
  textWrapper: {
    flexDirection: "row",
    marginLeft: 3,
  },
  sliderContainer: {
    flex: 1,
    marginBottom: 4,
  },
  valueWrapper: {
    width: 40,
    alignItems: "flex-start",
  },
  buttonWrapper: { position: "absolute", bottom: 8 },
  track: {
    height: 16,
    borderRadius: 100,
  },
  thumb: {
    borderRadius: 100,
    width: 4,
    height: 36,
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
  thumbTouchSize: { width: 10, height: 10 },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  separatorText: {
    marginRight: 2,
  },
});

export default React.memo(StatSliderContent);
