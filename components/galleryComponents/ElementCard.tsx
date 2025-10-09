import React, { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { maxValues } from "@/data/classStats";
import { Category } from "@/data/elements/elementsTypes";
import { BORDER_RADIUS_18, LIST_ITEM_SPACING, PADDING_HORIZONTAL_ELEMENT_CARD } from "@/utils/designTokens";
import { useThemeStore } from "@/stores/useThemeStore";
import StatGaugeRelativeBar from "../statGauge/StatGaugeRelativeBar";
import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import StatGaugeBar from "../statGauge/StatGaugeBar";
import Text from "@/primitiveComponents/Text";

type ElementStat = {
  name: string;
  value: number;
};

interface ElementCardProps {
  name: string;
  stats: ElementStat[];
  category: Category;
}

const ElementCard: React.FC<ElementCardProps> = memo(({ name, stats, category }) => {
  const theme = useThemeStore((state) => state.theme);

  const renderStat = useCallback(
    ({ name, value }: ElementStat) => (
      <StatGaugeContainer key={name} name={name} value={value}>
        {category !== "character" ? (
          <StatGaugeRelativeBar value={value} maxValue={maxValues[category]} />
        ) : (
          <StatGaugeBar value={value} contextId="stat-gauge-gallery" />
        )}
      </StatGaugeContainer>
    ),
    [maxValues, category]
  );

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.surface_container,
          backgroundColor: theme.surface,
        },
      ]}
    >
      <Text role="headline" size="small" weight="bold" style={styles.textWrapper}>
        {name}
      </Text>

      <View style={styles.flatListContent}>{stats.map((stat) => renderStat(stat))}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS_18,
    borderWidth: 5,
  },
  textWrapper: {
    padding: PADDING_HORIZONTAL_ELEMENT_CARD,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE", // Light separator line
  },
  flatListContent: {
    paddingVertical: LIST_ITEM_SPACING * 2, // Padding for lists
    paddingHorizontal: LIST_ITEM_SPACING * 2, // Consistent padding
    gap: 1,
  },
});

ElementCard.displayName = "ElementCard";

export default ElementCard;
