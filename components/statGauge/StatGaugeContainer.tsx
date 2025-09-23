import React, { useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import { getBonusColor } from "@/utils/getBonusColor";
import useGeneralStore from "@/stores/useGeneralStore";
import { vw } from "../styles/theme";
import { BORDER_RADIUS_STAT_GAUGE_CONTAINER, HEIGHT_STAT_GAUGE_CONTAINER } from "@/utils/designTokens";
import { useScreen } from "@/contexts/ScreenContext";

interface StatGaugeContainerProps {
  name: string;
  value: number;
  statFilterNumber?: number;
  chosenValue?: number;
  isInSetCard?: boolean;
  children: React.ReactElement;
}

const StatGaugeContainer = ({
  name,
  value,
  statFilterNumber = 0,
  chosenValue,
  isInSetCard = false,
  children,
}: StatGaugeContainerProps) => {
  const theme = useThemeStore((state) => state.theme);

  const screenName = useScreen();

  const isInSearchScreen = useMemo(() => screenName === "search", [screenName]);

  const showAllStatGaugeBonuses = isInSearchScreen ? useGeneralStore((state) => state.showAllStatGaugeBonuses) : false;
  const toggleAllStatGaugeBonuses = useGeneralStore((state) => state.toggleAllStatGaugeBonuses);

  // Bonus trouvé
  const { displayedValue, bonusColor } = useMemo(() => {
    let bonusFound = undefined;

    if (chosenValue !== undefined) {
      bonusFound = value - chosenValue;
    }

    let displayedValue: number | string;
    if (!showAllStatGaugeBonuses) {
      displayedValue = value;
    } else {
      if (bonusFound === undefined) {
        displayedValue = "?";
      } else if (bonusFound === 0) {
        displayedValue = "=";
      } else if (bonusFound > 0) {
        displayedValue = `+${bonusFound}`;
      } else {
        displayedValue = bonusFound;
      }
    }

    const bonusColor = getBonusColor(bonusFound);

    return { displayedValue, bonusColor };
  }, [value, chosenValue, showAllStatGaugeBonuses]);

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
    () => StyleSheet.flatten([styles.text, showAllStatGaugeBonuses && { color: bonusColor }]),
    [dynamicTextColor, showAllStatGaugeBonuses, bonusColor]
  );

  // Handler mémoïsé pour le press
  const handlePress = useCallback(() => {
    if (!isInSearchScreen) return;
    toggleAllStatGaugeBonuses();
  }, [isInSearchScreen, toggleAllStatGaugeBonuses]);

  return (
    <Pressable style={containerStyle} onPress={handlePress}>
      <View
        style={[
          styles.nameContainer,
          {
            width: (vw / 360) * 43,
          },
        ]}
      >
        <Text style={nameStyle}>{translate(name)}</Text>
      </View>

      {children}

      {isInSetCard && (
        <View
          style={[
            styles.nameContainer,
            {
              width: (vw / 360) * 40,
            },
          ]}
        >
          <Text style={valueStyle}>{displayedValue}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_STAT_GAUGE_CONTAINER,
    width: "100%",
    flexDirection: "row",
    padding: 3,
    borderRadius: BORDER_RADIUS_STAT_GAUGE_CONTAINER,
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

export default React.memo(StatGaugeContainer);
