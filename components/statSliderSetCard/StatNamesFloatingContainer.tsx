import React, { useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { compactStatNames } from "@/data/data";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";

const PADDING = 10;
const TAILLE_STAT_SLIDER_RESULT = 34;
const GAP = 10;
const BORDER_WIDTH = 2;
const TAILLE_SET_CARD = 360;
const PADDING_AVANT_SET_CARD = 20;
const GAP_TOP_STAT_SLIDER_RESULT_CONTAINER = 8;
const FIXED_NAME_LABEL_WIDTH = 50;

const StatNamesFloatingContainer: React.FC = () => {
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();

  const { checkedStats, nbSlider, height, topPosition } = useMemo(() => {
    const filteredStats = resultStats?.filter((stat: ResultStat) => stat.checked) ?? [];
    const count = filteredStats.length;

    const calculatedHeight =
      2 * PADDING + TAILLE_STAT_SLIDER_RESULT * count + (count > 0 ? (count - 1) * GAP : 0) + 2 * BORDER_WIDTH;

    const calculatedTopPosition = TAILLE_SET_CARD + PADDING_AVANT_SET_CARD + GAP_TOP_STAT_SLIDER_RESULT_CONTAINER - 2;

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
        <View key={stat.name} style={styles.nameLabelContainerBase}>
          <Text style={StyleSheet.flatten([styles.nameLabelBase, nameLabelDynamicStyle])}>
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
    borderWidth: BORDER_WIDTH,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 8,
    zIndex: 10,
    gap: GAP,
  },
  nameLabelContainerBase: {
    height: TAILLE_STAT_SLIDER_RESULT,
    justifyContent: "center",
    alignItems: "center",
    width: FIXED_NAME_LABEL_WIDTH,
  },
  nameLabelBase: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default React.memo(StatNamesFloatingContainer);
