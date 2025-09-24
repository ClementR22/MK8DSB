import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useGeneralStore from "@/stores/useGeneralStore";

const MIN_RESULTS = 1;
const MAX_RESULTS = 20;

const ResultsNumberSelector = () => {
  const theme = useThemeStore((state) => state.theme);
  const resultsNumber = useGeneralStore((state) => state.resultsNumber);
  const setResultsNumber = useGeneralStore((state) => state.setResultsNumber);

  // Handlers optimisés sans dépendances sur resultsNumber
  const increment = useCallback(() => {
    setResultsNumber(Math.min(resultsNumber + 1, MAX_RESULTS));
  }, [setResultsNumber]);

  const decrement = useCallback(() => {
    setResultsNumber(Math.max(resultsNumber - 1, MIN_RESULTS));
  }, [setResultsNumber]);

  // États dérivés simples (pas besoin de useMemo)
  const canDecrement = resultsNumber > MIN_RESULTS;
  const canIncrement = resultsNumber < MAX_RESULTS;

  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={decrement}
        iconName="minus"
        iconType={IconType.MaterialCommunityIcons}
        disabled={!canDecrement}
      />
      <Text style={[styles.resultsNumberText, { color: theme.on_surface }]}>{resultsNumber}</Text>
      <ButtonIcon
        onPress={increment}
        iconName="plus"
        iconType={IconType.MaterialCommunityIcons}
        disabled={!canIncrement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    flexDirection: "row",
    paddingHorizontal: 14,
  },
  resultsNumberText: {
    fontSize: 48,
    textAlign: "center",
    flexGrow: 1,
  },
});

export default React.memo(ResultsNumberSelector);
