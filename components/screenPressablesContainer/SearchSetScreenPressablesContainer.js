import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { bodyTypeNames, setAllInfos } from "@/data/data";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import { translate } from "@/translations/translations";
import BodyTypeSelector from "../elementsSelector/BodyTypeSelector";
import ElementsDeselector from "../elementsSelector/ElementsDeselector";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import ResultsNumber from "../ResultsNumberSelector";
import ButtonIcon from "@/components/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";
import { computePressableElementsByCategory } from "@/utils/computePressableElementsByCategory";
import { usePressableElements } from "@/hooks/usePressableElements";
import ButtonAndModal from "../modal/ButtonAndModal";
import Button from "../Button";
import useModalsStore from "@/stores/useModalsStore";
import StatSelectorChosenStatsButtonAndModal from "../statSelector/StatSelectorChosenStatsButtonAndModal";

const SearchSetScreenPressablesContainer = ({ setSetsToShow }) => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setSetsListFound = useSetsStore((state) => state.setSetsListFound);
  const [resultsNumber, setResultsNumber] = useState(5);
  const setIsChosenStatsModalVisible = useModalsStore((state) => state.setIsChosenStatsModalVisible);
  const openChosenStatsModal = useCallback(() => setIsChosenStatsModalVisible(true));
  const { pressableElementsList } = usePressableElements();
  const pressableElementsByCategory = computePressableElementsByCategory(pressableElementsList);

  const [chosenBodyType, setChosenBodyType] = useState(
    bodyTypeNames.map((bodyTypeName) => ({
      name: bodyTypeName,
      checked: true,
    }))
  );

  const updateSetsToShow = (setsFound) => {
    const setsFoundWithName = setsFound.map((set, index) => ({
      name: "SetFound " + String(index),
      classIds: set.classIds,
      stats: set.stats,
    }));
    setSetsToShow(setsFoundWithName);
    setSetsListFound(setsFoundWithName);
  };

  const selectedClassIds4categories = useMemo(() => {
    const result = [];
    Object.entries(pressableElementsByCategory).forEach(([, category]) => {
      const pressed = [];
      Object.entries(category).forEach(([classKey, classElements]) => {
        const isAnyImagePressed = Object.values(classElements).some(({ pressed }) => pressed);
        if (isAnyImagePressed) {
          pressed.push(+classKey);
        }
      });
      result.push(pressed);
    });
    return result;
  }, [pressableElementsByCategory]);

  const chosenBodyTypeList = useMemo(
    () => chosenBodyType.filter((bodyType) => bodyType.checked).map((bodyType) => bodyType.name),
    [chosenBodyType]
  );

  const search = () => {
    const chosenStatsChecked = chosenStats.map((stat) => stat.checked);
    const chosenStatsValue = chosenStats.map((stat) => stat.value);
    const chosenStatsFilterNumber = chosenStats.map((stat) => stat.statFilterNumber);
    const chosenElementsIds = selectedClassIds4categories;

    if (!chosenStatsChecked.includes(true) || chosenBodyTypeList.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
      return; // Sortir si aucun filtre n'est sélectionné
    }

    const gaps = setAllInfos.reduce((acc, setInfo, setIndex) => {
      const { classIds, stats, bodyTypes } = setInfo;

      // Vérifier si au moins un type de corps est présent
      const listIsSetElementAccepted = classIds.map((elementId, categoryIndex) => {
        const category_x_ElementIds = chosenElementsIds[categoryIndex];
        return category_x_ElementIds.includes(elementId) || category_x_ElementIds.length === 0;
      });
      if (
        !bodyTypes.some((item) => chosenBodyTypeList.includes(item)) ||
        listIsSetElementAccepted.includes(false) // si (le set ne contient aucun type de vehicule choisi OU le set contient au moins un element non choisi)
      ) {
        return acc; // Ignorer si le type de corps ne correspond pas
      }

      let gap = 0;
      let validSet = true; // Pour suivre la validité des statistiques

      chosenStatsChecked.forEach((checked, statIndex) => {
        if (checked) {
          const setValue = stats[statIndex];
          const chosenValue = Number(chosenStatsValue[statIndex]);
          const statFilterNumber = chosenStatsFilterNumber[statIndex];

          if (statFilterNumber === 2 && setValue !== chosenValue) {
            validSet = false; // Écart trouvé
          } else if (statFilterNumber === 1 && setValue < chosenValue) {
            validSet = false; // Écart trouvé
          } else {
            gap += (chosenValue - setValue) ** 2; // Calculer le gap
          }
        }
      });

      if (validSet) {
        acc.push({ setIndex, gap });
      }

      return acc;
    }, []);

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
    } else {
      const setsFound = gaps
        .slice(0, Math.min(resultsNumber, gaps.length))
        .map(({ setIndex }) => ({ ...setAllInfos[setIndex] }));
      updateSetsToShow(setsFound);
    }
  };

  return (
    <View style={styles.pressablesContainer}>
      <StatSelectorChosenStatsButtonAndModal />

      <ButtonAndModal
        modalTitle="Filters"
        customTrigger={
          <ButtonIcon tooltipText="ChooseFilters" iconName="pin" iconType={IconType.MaterialCommunityIcons} />
        }
      >
        <BodyTypeSelector chosenBodyType={chosenBodyType} setChosenBodyType={setChosenBodyType} />
        <ElementsDeselector />
        <ElementsSelector />
      </ButtonAndModal>

      <Button onPress={search} iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
        <Text>{translate("Search")}</Text>
      </Button>

      <ButtonAndModal
        modalTitle="NumberOfResults"
        customTrigger={
          <ButtonIcon tooltipText="NumberOfResults" iconName="numbers" iconType={IconType.MaterialIcons} />
        }
      >
        <ResultsNumber resultsNumber={resultsNumber} setResultsNumber={setResultsNumber} />
      </ButtonAndModal>

      <StatSliderResultSelectorPressable />
    </View>
  );
};

const styles = StyleSheet.create({
  pressablesContainer: {
    // width: screenWidth * 0.87 + 20,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});

export default SearchSetScreenPressablesContainer;
