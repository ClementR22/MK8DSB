import React, { useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import StatSliderCompactBar from "./StatSliderCompactBar";
import { getBonusColor } from "@/utils/getBonusColor";
import useGeneralStore from "@/stores/useGeneralStore";
import { vw } from "../styles/theme";
import StatSliderCompactBarRelativeValue from "./StatSliderCompactBarRelativeValue";

export const STAT_SLIDER_COMPACT_HEIGHT = 34;

interface StatSliderCompactProps {
  name: string;
  value: number;
  statFilterNumber?: number;
  chosenValue?: number;
  isInSetCard?: boolean;
  isRelativeValue?: boolean;
  maxValue?: number;
}

const StatSliderCompact = ({
  name,
  value,
  statFilterNumber = 0,
  chosenValue,
  isInSetCard = false,
  isRelativeValue = false,
  maxValue,
}: StatSliderCompactProps) => {
  const theme = useThemeStore((state) => state.theme);
  const showAllStatSliderCompactBonuses = useGeneralStore((state) => state.showAllStatSliderCompactBonuses);
  const toggleAllStatSliderCompactBonuses = useGeneralStore((state) => state.toggleAllStatSliderCompactBonuses);

  // Calcul du bonus activé
  const bonusEnabled = useMemo(() => chosenValue !== undefined, [chosenValue]);
  // Bonus trouvé
  const bonusFound = useMemo(() => (chosenValue ? value - chosenValue : 0), [value, chosenValue]);
  // Couleur du bonus
  const bonusColor = useMemo(() => getBonusColor(bonusFound), [bonusFound]);

  // Style du conteneur, dépend du thème et du filtre
  const containerStyle = useMemo(() => {
    const borderColor = getStatSliderBorderColor(statFilterNumber, theme);
    return StyleSheet.flatten([styles.container, { backgroundColor: theme.surface, borderColor: borderColor }]);
  }, [theme, statFilterNumber]);

  // Couleur dynamique du texte
  const dynamicTextColor = useMemo(() => ({ color: theme.on_surface }), [theme.on_surface]);

  // Style du nom
  const nameStyle = useMemo(() => StyleSheet.flatten([styles.text, dynamicTextColor]), [dynamicTextColor]);

  // Style de la valeur
  const valueStyle = useMemo(
    () => StyleSheet.flatten([styles.text, showAllStatSliderCompactBonuses && { color: bonusColor }]),
    [dynamicTextColor, showAllStatSliderCompactBonuses, bonusColor]
  );

  // Handler mémoïsé pour le press
  const handlePress = useCallback(() => {
    if (!bonusEnabled) return;
    toggleAllStatSliderCompactBonuses();
  }, [bonusEnabled, toggleAllStatSliderCompactBonuses]);

  return (
    <Pressable style={containerStyle} onPress={handlePress}>
      {!isInSetCard && (
        <View
          style={[
            styles.nameContainer,
            {
              width: (vw / 360) * 66,
            },
          ]}
        >
          <Text style={nameStyle}>{translate(name)}</Text>
        </View>
      )}

      {isRelativeValue ? (
        <StatSliderCompactBarRelativeValue value={value} maxValue={maxValue} />
      ) : (
        <StatSliderCompactBar value={value} chosenValue={chosenValue} isInSetCard={isInSetCard} />
      )}

      {isInSetCard && (
        <View
          style={[
            styles.nameContainer,
            {
              width: (vw / 360) * 40,
            },
          ]}
        >
          <Text style={valueStyle}>
            {showAllStatSliderCompactBonuses ? (bonusFound > 0 ? `+${bonusFound}` : bonusFound) : value}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 34,
    width: "100%",
    flexDirection: "row",
    padding: 3,
    borderRadius: 17,
    borderWidth: 2,
    alignItems: "center",
  },
  nameContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
});

export default React.memo(StatSliderCompact);
