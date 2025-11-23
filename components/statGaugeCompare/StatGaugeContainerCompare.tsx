import React from "react";
import { View, StyleSheet } from "react-native";
import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import { StatName } from "@/types";
import { useBuildCardStyle } from "@/hooks/useBuildCardStyle";
import Text from "@/primitiveComponents/Text";
import { useBuildCardsScroll } from "@/contexts/BuildCardsScrollContext";
import StatGaugeBar from "../statGauge/StatGaugeBar";
interface SetIdAndStatValue {
  id: string;
  value: number;
  color: string;
}

interface StatGaugeContainerCompareProps {
  name: StatName;
  buildsIdAndValue: SetIdAndStatValue[];
}

const StatGaugeContainerCompare: React.FC<StatGaugeContainerCompareProps> = ({ buildsIdAndValue, name }) => {
  const { buildCardStyle } = useBuildCardStyle("100%");
  const { scrollToBuildCard } = useBuildCardsScroll();

  return (
    <View style={[buildCardStyle, styles.container]}>
      <Text role="title" size="medium" style={styles.textWrapper} namespace="stats">
        {name}
      </Text>

      <View style={styles.statBarsContainer}>
        {buildsIdAndValue.map(({ id, value, color }) => (
          <StatGaugeContainer key={id} value={value} onPress={() => scrollToBuildCard(id)}>
            <StatGaugeBar value={value} color={color}></StatGaugeBar>
          </StatGaugeContainer>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 7, paddingTop: 3, paddingRight: 0 },
  textWrapper: {
    marginBottom: 4, // Espacement entre le titre et les barres de stat
  },
  statBarsContainer: {
    width: "100%",
    gap: 0,
  },
});

export default React.memo(StatGaugeContainerCompare);
