import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface StatSliderCompareBarProps {
  value: number;
  color?: string;
  scrollToThisSetCard: () => void;
}

const MAX_STAT_VALUE = 6;

const StatSliderCompareBar = ({ value, color, scrollToThisSetCard }: StatSliderCompareBarProps) => {
  const theme = useThemeStore((state) => state.theme);

  // Style du fond de la piste, dépendant du thème
  const sliderTrackDynamicBg = useMemo(
    () => ({ backgroundColor: theme.surface_container_low }),
    [theme.surface_container_low]
  );

  // Couleur principale du segment, dépend du color passé ou du thème
  const primarySegmentColor = useMemo(() => ({ backgroundColor: color ?? theme.primary }), [theme.primary, color]);

  // Largeur du segment intérieur, clampée et calculée une seule fois par changement de value
  const innerFillWidth = useMemo(() => {
    const clampedValue = Math.min(Math.max(value, 0), MAX_STAT_VALUE);
    return `${(clampedValue / MAX_STAT_VALUE) * 100}%`;
  }, [value]);

  // Style du texte dépendant du thème
  const textDynamicStyle = useMemo(() => ({ color: theme.on_surface }), [theme.on_surface]);

  // On mémoïse le handler pour éviter de recréer la fonction à chaque render
  const handlePress = React.useCallback(() => {
    scrollToThisSetCard();
  }, [scrollToThisSetCard]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={StyleSheet.flatten([styles.sliderTrack, sliderTrackDynamicBg])}>
        <View
          style={StyleSheet.flatten([
            styles.trackSegment,
            { width: innerFillWidth as `${number}%` | number },
            primarySegmentColor,
          ])}
        />
      </View>
      <Text style={StyleSheet.flatten([styles.text, textDynamicStyle])}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", flexDirection: "row", alignItems: "center", gap: 10 },
  sliderTrack: {
    flex: 1,
    height: 13,
    borderRadius: 100,
    overflow: "hidden",
  },
  trackSegment: {
    height: "100%",
  },
  text: {
    width: 40,
    fontSize: 20,
    fontWeight: "600",
  },
});

export default React.memo(StatSliderCompareBar);
