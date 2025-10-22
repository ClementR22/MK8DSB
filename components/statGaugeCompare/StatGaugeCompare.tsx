import React from "react";
import { View, StyleSheet } from "react-native";
import StatGaugeCompareBar from "./StatGaugeCompareBar";
import { StatName } from "@/data/stats/statsTypes";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";
import Text from "@/primitiveComponents/Text";
import { useSetCardsScroll } from "@/contexts/SetCardsScrollContext";
export interface SetIdAndStatValue {
  id: string;
  value: number;
  color: string;
}

interface StatGaugeCompareProps {
  name: StatName;
  setsIdAndValue: SetIdAndStatValue[];
}

const StatGaugeCompare: React.FC<StatGaugeCompareProps> = ({ setsIdAndValue, name }) => {
  const { setCardStyle } = useSetCardStyle("100%");
  const { scrollToSetCard } = useSetCardsScroll();

  return (
    <View style={[setCardStyle, { paddingTop: 3 }]}>
      <Text role="title" size="medium" style={styles.textWrapper} namespace="stats">
        {name}
      </Text>

      <View style={styles.statBarsContainer}>
        {setsIdAndValue.map(({ id, value, color }) => (
          <StatGaugeCompareBar key={id} value={value} color={color} scrollToThisSetCard={() => scrollToSetCard(id)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    marginBottom: 5, // Espacement entre le titre et les barres de stat
  },
  statBarsContainer: {
    width: "100%",
    gap: 0,
  },
});

export default React.memo(StatGaugeCompare);
