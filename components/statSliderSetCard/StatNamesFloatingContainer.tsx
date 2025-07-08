import React, { useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { compactStatNames } from "@/data/stats/statsData";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { SET_CARD_HEIGHT, SET_CARD_STAT_SLIDER_GAP } from "../setCard/SetCard";
import { STAT_SLIDER_SET_CARDS_CONTAINER_GAP } from "./StatSliderSetCardsContainer";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";
import { STAT_SLIDER_COMPACT_HEIGHT } from "../statSlider/StatSliderCompact";

export const SET_CARD_CONTAINER_PADDING = 20;
const FIXED_NAME_LABEL_WIDTH = 40;

const StatNamesFloatingContainer: React.FC = () => {
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();

  const { setCardStyle } = useSetCardStyle();

  const { checkedStats, nbSlider, height, topPosition } = useMemo(() => {
    const filteredStats = resultStats?.filter((stat: ResultStat) => stat.checked) ?? [];
    const count = filteredStats.length;

    const calculatedTopPosition = SET_CARD_CONTAINER_PADDING + +SET_CARD_HEIGHT + SET_CARD_STAT_SLIDER_GAP;

    const calculatedHeight =
      2 * setCardStyle.padding +
      count * STAT_SLIDER_COMPACT_HEIGHT +
      (count - 1) * STAT_SLIDER_SET_CARDS_CONTAINER_GAP +
      2 * setCardStyle.borderWidth;

    return {
      checkedStats: filteredStats,
      nbSlider: count,
      height: calculatedHeight,
      topPosition: calculatedTopPosition,
    };
  }, [resultStats]);

  const floatingLabelContainerDynamicStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.surface,
      borderColor: theme.outline_variant,
      height: height,
      top: topPosition,
    }),
    [theme.surface, theme.outline_variant, height, topPosition]
  );

  const nameLabelDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const memoizedStatLabels = useMemo(() => {
    return checkedStats.map((stat: ResultStat) => {
      const compactName = compactStatNames[stat.name];
      return (
        <View key={stat.name} style={styles.nameLabelContainer}>
          <Text style={StyleSheet.flatten([styles.nameLabel, nameLabelDynamicStyle])}>
            {translateToLanguage(compactName, language)}
          </Text>
        </View>
      );
    });
  }, [checkedStats, language, nameLabelDynamicStyle]);

  return (
    <>
      {nbSlider > 0 && (
        <View style={StyleSheet.flatten([styles.container, floatingLabelContainerDynamicStyle])}>
          {memoizedStatLabels}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    borderWidth: 1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 10,
    justifyContent: "center",
  },
  nameLabelContainer: {
    height: STAT_SLIDER_COMPACT_HEIGHT + STAT_SLIDER_SET_CARDS_CONTAINER_GAP,
    justifyContent: "center",
    alignItems: "center",
    width: FIXED_NAME_LABEL_WIDTH,
  },
  nameLabel: {
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default React.memo(StatNamesFloatingContainer);
