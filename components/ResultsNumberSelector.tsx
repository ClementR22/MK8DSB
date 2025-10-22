import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonAndModal from "./modal/ButtonAndModal";
import Text from "@/primitiveComponents/Text";

const MIN_RESULTS = 1;
const MAX_RESULTS = 20;

const ResultsNumberSelector = () => {
  const theme = useThemeStore((state) => state.theme);
  const resultsNumber = useGeneralStore((state) => state.resultsNumber);
  const setResultsNumber = useGeneralStore((state) => state.setResultsNumber);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultsNumberInModal, setResultsNumberInModal] = useState(resultsNumber);

  useEffect(() => {
    if (isModalVisible) {
      // À l'ouverture : charger la valeur du store
      setResultsNumberInModal(resultsNumber);
    } else if (resultsNumber !== resultsNumberInModal) {
      // À la fermeture : sauvegarder dans le store
      setResultsNumber(resultsNumberInModal);
    }
  }, [isModalVisible]);

  // Handlers optimisés avec useCallback correct
  const increment = useCallback(() => {
    setResultsNumberInModal((prev) => Math.min(prev + 1, MAX_RESULTS));
  }, []);

  const decrement = useCallback(() => {
    setResultsNumberInModal((prev) => Math.max(prev - 1, MIN_RESULTS));
  }, []);

  // États dérivés calculés à chaque render (pas de problème de performance ici)
  const canDecrement = resultsNumberInModal > MIN_RESULTS;
  const canIncrement = resultsNumberInModal < MAX_RESULTS;

  return (
    <ButtonAndModal
      modalTitle="numberOfSearchResults"
      triggerButtonText="numberOfSearchResults"
      isModalVisibleProp={isModalVisible}
      setIsModalVisibleProp={setIsModalVisible}
    >
      <View style={styles.container}>
        <ButtonIcon
          onPress={decrement}
          iconName="minus"
          iconType={IconType.MaterialCommunityIcons}
          disabled={!canDecrement}
        />
        <Text role="display" size="medium" textAlign="center" style={styles.resultsNumberText} namespace="not">
          {resultsNumberInModal}
        </Text>
        <ButtonIcon
          onPress={increment}
          iconName="plus"
          iconType={IconType.MaterialCommunityIcons}
          disabled={!canIncrement}
        />
      </View>
    </ButtonAndModal>
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
    flexGrow: 1,
  },
});

export default React.memo(ResultsNumberSelector);
