import { translateToLanguage } from "@/translations/translations";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";
import useGeneralStore from "@/stores/useGeneralStore";
import useStatsStore from "@/stores/useStatsStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { StatName } from "@/data/stats/statsTypes";
import { BORDER_RADIUS_INF, BORDER_RADIUS_STAT_GAUGE_CONTAINER, BUTTON_SIZE } from "@/utils/designTokens";
import { box_shadow_z1 } from "../styles/shadow";
import Text from "@/primitiveComponents/Text";

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
  const updateStatValue = useStatsStore((state) => state.updateStatValue);
  const removeStat = useStatsStore((state) => state.removeStat);
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

  // Styles dynamiques pour le thumb du slider
  const renderCustomThumb = useCallback(
    () => (
      <View style={[styles.thumbWrapper, { backgroundColor: theme.surface }]}>
        <View style={[styles.thumb, { backgroundColor: theme.primary }]} />
      </View>
    ),
    [styles, theme]
  );

  const handleRemove = useCallback(() => {
    removeStat(name);
  }, [removeStat, name]);

  return (
    <Pressable
      style={StyleSheet.flatten([
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: getStatSliderBorderColor(statFilterNumber, theme),
        },
      ])}
      onLongPress={handleRemove}
    >
      <View style={styles.containerLeft}>
        <View style={styles.textWrapper}>
          <Text role="title" size="medium" numberOfLines={1} ellipsizeMode="tail">
            {translateToLanguage(name, language)}
          </Text>
          <Text role="title" size="medium" style={styles.separatorText}>
            {translateToLanguage(":", language)}
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
          minimumTrackStyle={{ backgroundColor: theme.primary }}
          maximumTrackStyle={{ backgroundColor: theme.surface_container_highest }}
        />
      </View>
      <View style={styles.containerRight}>
        <View style={styles.valueWrapper}>
          <Text role="title" size="medium">
            {tempValue}
          </Text>
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
    boxShadow: box_shadow_z1,
  },
  containerLeft: { flex: 1, justifyContent: "flex-start" },
  containerRight: { alignItems: "center", justifyContent: "flex-start", width: 46 },
  textWrapper: {
    flexDirection: "row",
    marginLeft: 3,
    paddingTop: 2,
  },
  sliderContainer: {
    marginBottom: 4,
  },
  valueWrapper: {
    width: BUTTON_SIZE,
    alignItems: "flex-start",
    paddingTop: 2,
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
  separatorText: {
    marginRight: 2,
  },
});

export default React.memo(StatSliderContent);
