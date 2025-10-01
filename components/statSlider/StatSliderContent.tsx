import { translateToLanguage } from "@/translations/translations";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";
import useGeneralStore from "@/stores/useGeneralStore";
import useSetsStore from "@/stores/useSetsStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { StatName } from "@/data/stats/statsTypes";
import { BORDER_RADIUS_INF, BORDER_RADIUS_STAT_GAUGE_CONTAINER, BUTTON_SIZE } from "@/utils/designTokens";

interface StatSliderContentProps {
  name: StatName;
  value: number;
  statFilterNumber: number;
  setStatFilterNumber: (num: number) => void;
  disabled?: boolean;
}

const MAX_VALUE = 6;

const StatSliderContent = ({
  name,
  value,
  statFilterNumber,
  setStatFilterNumber,
  disabled = false,
}: StatSliderContentProps) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);
  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);
  const removeStat = useSetsStore((state) => state.removeStat);
  const [tempValue, setTempValue] = useState(value);

  // Mémoïsation stricte des handlers
  const onValueChange = useCallback(([v]: [number]) => setTempValue(v), []);
  const onSlidingStart = useCallback(() => {
    setIsScrollEnable(false);
  }, [setIsScrollEnable]);
  const onSlidingComplete = useCallback(
    ([v]: [number]) => {
      if (!disabled) {
        if (v !== value) {
          updateStatValue(name, v);
        }
      }
      setIsScrollEnable(true);
    },
    [updateStatValue, name, setIsScrollEnable, value]
  );

  useEffect(() => {
    if (value !== tempValue) {
      setTempValue(value);
    }
  }, [value]);

  // Mémoïsation stricte des styles
  const borderColorDynamicStyle = useMemo(
    () => getStatSliderBorderColor(statFilterNumber, theme),
    [statFilterNumber, theme]
  );
  const containerDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface,
      borderColor: borderColorDynamicStyle,
    }),
    [theme.surface, borderColorDynamicStyle]
  );
  const textColorStyle = useMemo(() => ({ color: theme.on_surface }), [theme.on_surface]);
  const minimumTrackDynamicStyle = useMemo(() => ({ backgroundColor: theme.primary }), [theme.primary]);
  const maximumTrackDynamicStyle = useMemo(
    () => ({ backgroundColor: theme.surface_container_highest }),
    [theme.surface_container_highest]
  );

  // Mémoïsation du label traduit
  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);
  const translatedSeparator = useMemo(() => translateToLanguage(":", language), [language]);

  // Styles dynamiques pour le thumb du slider
  const thumbWrapperDynamicStyle = useMemo(() => ({ backgroundColor: theme.surface }), [theme.surface, theme.primary]);
  const thumbDynamicStyle = useMemo(() => ({ backgroundColor: theme.primary }), [theme.primary]);

  const renderCustomThumb = useCallback(
    () => (
      <View style={[styles.thumbWrapper, thumbWrapperDynamicStyle]}>
        <View style={[styles.thumb, thumbDynamicStyle]} />
      </View>
    ),
    [thumbWrapperDynamicStyle, thumbDynamicStyle]
  );

  const handleRemove = useCallback(() => {
    removeStat(name);
  }, [removeStat, name]);

  return (
    <Pressable style={StyleSheet.flatten([styles.container, containerDynamicStyle])} onLongPress={handleRemove}>
      <View style={styles.containerLeft}>
        <View style={styles.textWrapper}>
          <Text style={StyleSheet.flatten([styles.text, textColorStyle])} numberOfLines={1} ellipsizeMode="tail">
            {translatedName}
          </Text>
          <Text style={StyleSheet.flatten([styles.text, styles.separatorText, textColorStyle])}>
            {translatedSeparator}
          </Text>
        </View>

        <Slider
          containerStyle={styles.sliderContainer}
          value={tempValue}
          onValueChange={onValueChange}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={0.25}
          trackStyle={styles.track}
          renderThumbComponent={renderCustomThumb}
          minimumTrackStyle={StyleSheet.flatten(minimumTrackDynamicStyle)}
          maximumTrackStyle={StyleSheet.flatten(maximumTrackDynamicStyle)}
        />
      </View>
      <View style={styles.containerRight}>
        <View style={styles.valueWrapper}>
          <Text style={[styles.text, textColorStyle]}>{tempValue}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <ButtonMultiStateToggle
            number={statFilterNumber}
            setNumber={setStatFilterNumber}
            tooltipText="ChangeCondition"
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderRadius: BORDER_RADIUS_STAT_GAUGE_CONTAINER,
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
    marginBottom: 4,
  },
  valueWrapper: {
    width: BUTTON_SIZE,
    alignItems: "flex-start",
  },
  buttonWrapper: { position: "absolute", bottom: 8 },
  track: {
    height: 16,
    borderRadius: BORDER_RADIUS_INF,
  },
  thumbWrapper: {
    width: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  thumb: {
    width: 4,
    height: 36,
    borderRadius: BORDER_RADIUS_INF,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  separatorText: {
    marginRight: 2,
  },
});

export default React.memo(StatSliderContent);
