import React, { memo, useCallback, useMemo } from "react";
import { Animated, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { maxValues } from "@/data/classStats";
import { Category } from "@/data/elements/elementsTypes";
import {
  BORDER_RADIUS_18,
  CARD_SPACING,
  LEFT_PANNEL_WIDTH_COLLAPSED,
  LIST_ITEM_SPACING,
  PADDING_HORIZONTAL,
} from "@/utils/designTokens";
import { useThemeStore } from "@/stores/useThemeStore";

type ElementStat = {
  name: string;
  value: number;
};

interface ElementCardProps {
  name: string;
  stats: ElementStat[];
  category: Category;
  animatedOverlayOpacity: Animated.Value;
  handleBackgroundPress: () => void;
}

const ElementCard: React.FC<ElementCardProps> = memo(
  ({ name, stats, category, animatedOverlayOpacity, handleBackgroundPress }) => {
    const theme = useThemeStore((state) => state.theme);

    const maxValue = useMemo(() => maxValues[category], [category]);
    const isRelativeValue = useMemo(() => category !== "character", [category]);

    const stylesDynamic = useMemo(
      () => ({
        containerDynamicStyle: {
          borderColor: theme.surface_container,
          backgroundColor: theme.surface,
        },
        textDynamicStyle: { color: theme.on_surface },
        overlayStyle: {
          backgroundColor: theme.surface_container,
        },
      }),
      [theme]
    );

    const renderStat = useCallback(
      ({ name, value }: ElementStat) => (
        <StatSliderCompact key={name} name={name} value={value} maxValue={maxValue} isRelativeValue={isRelativeValue} />
      ),
      [maxValue, isRelativeValue]
    );

    return (
      <>
        <View style={[styles.container, stylesDynamic.containerDynamicStyle]}>
          <View style={styles.textWrapper}>
            <Text style={[styles.text, stylesDynamic.textDynamicStyle]}>{name}</Text>
          </View>
          <FlatList
            data={stats}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => renderStat(item)}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
        <Animated.View style={[styles.overlay, { opacity: animatedOverlayOpacity }]}>
          <Pressable style={styles.flex} onPress={handleBackgroundPress} />
        </Animated.View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginLeft: LEFT_PANNEL_WIDTH_COLLAPSED + CARD_SPACING,
    marginRight: CARD_SPACING,
    borderRadius: BORDER_RADIUS_18,
    borderWidth: 5,
  },
  textWrapper: {
    padding: PADDING_HORIZONTAL,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE", // Light separator line
  },
  text: {
    fontSize: 24, // Larger, more prominent name
    fontWeight: "bold",
    // color: theme.on_surface, // Color applied in JSX
  },
  flatListContent: {
    paddingVertical: LIST_ITEM_SPACING, // Padding for lists
    paddingHorizontal: LIST_ITEM_SPACING, // Consistent padding
    gap: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  flex: { flex: 1 },
});

ElementCard.displayName = "ElementCard";

export default ElementCard;
