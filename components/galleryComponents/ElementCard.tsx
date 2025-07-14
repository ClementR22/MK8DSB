import React, { memo, useEffect, useMemo, useRef } from "react";
import { Animated, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { maxValues } from "@/data/classStats";
import { Category } from "@/data/elements/elementsTypes";
import {
  BORDER_RADIUS_18,
  CARD_SPACING,
  LEFT_COLUMN_WIDTH_COLLAPSED,
  LIST_ITEM_SPACING,
  PADDING_HORIZONTAL,
} from "@/utils/designTokens";

type ElementStat = {
  name: string;
  value: number;
};

interface ElementCardProps {
  name: string;
  stats: ElementStat[];
  category: Category;
  isLeftColumnExpanded: boolean;
  handleBackgroundPress: () => void;
  style: any;
}

const ElementCard: React.FC<ElementCardProps> = memo(
  ({ name, stats, category, isLeftColumnExpanded, handleBackgroundPress, style }) => {
    const maxValue = useMemo(() => maxValues[category], [category]);
    const isRelativeValue = useMemo(() => category !== "character", [category]);

    const animatedOverlayOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isLeftColumnExpanded) {
        Animated.timing(animatedOverlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start(); // Overlay fades OUT when expanded
      } else {
        Animated.timing(animatedOverlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start(); // Overlay fades IN when collapsed
      }
    }, [isLeftColumnExpanded, animatedOverlayOpacity]); // Add dependencies

    return (
      <>
        <View style={[styles.container, style.containerDynamic]}>
          <View style={styles.textWrapper}>
            <Text style={[styles.text, style.textDynamic]}>{name}</Text>
          </View>
          <FlatList
            data={stats}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <StatSliderCompact
                name={item.name}
                value={item.value}
                isRelativeValue={isRelativeValue}
                maxValue={maxValue}
              />
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <Animated.View style={[styles.overlay, { opacity: animatedOverlayOpacity }]}>
          {/* Themed overlay */}
          <Pressable style={styles.flex} onPress={handleBackgroundPress} />
        </Animated.View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginLeft: LEFT_COLUMN_WIDTH_COLLAPSED + CARD_SPACING,
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

export default ElementCard;
