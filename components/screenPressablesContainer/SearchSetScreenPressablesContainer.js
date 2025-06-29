import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { bodyTypeNames, category4Names } from "@/data/data";
import { setsData } from "@/data/setsData";
import ButtonAndModalStatSelectorResultStats from "../statSelector/ButtonAndModalStatSelectorResultStats";
import { translate } from "@/translations/translations";
import ResultsNumber from "../ResultsNumberSelector";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";
import ButtonAndModal from "../modal/ButtonAndModal";
import Button from "../../primitiveComponents/Button";
import ButtonAndModalStatSelectorChosenStats from "../statSelector/ButtonAndModalStatSelectorChosenStats";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import BodyTypeSelector from "../elementsSelector/BodyTypeSelector";
import { elementsDataBody, elementsDataCharacter, elementsDataGlider, elementsDataWheel } from "@/data/elementsData";
import ElementsDeselector from "../elementsSelector/ElementsDeselector";

const allCategoryElements = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

// Define a union type for any element
// type AnyElement = CharacterElement | BodyElement | WheelElement | GliderElement;

const elementsGroupedByClassId = new Map(); // new Map<number, AnyElement[]>()

// Parcourir toutes les listes de catégories pour collecter tous les éléments
Object.values(allCategoryElements).forEach((categoryList) => {
  categoryList.forEach((element) => {
    const groupId = element.classId; // Utilisation de 'classId' comme identifiant de groupe

    // Si cette 'groupId' (classId) n'a pas encore de tableau dans la Map, on en crée un
    if (!elementsGroupedByClassId.has(groupId)) {
      elementsGroupedByClassId.set(groupId, []);
    }
    // Ajouter l'élément actuel au tableau correspondant à ce 'groupId'
    elementsGroupedByClassId.get(groupId)?.push(element);
  });
});

const SearchSetScreenPressablesContainer = ({ setSetsToShow, scrollRef }) => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setSetsListFound = useSetsStore((state) => state.setSetsListFound);
  const [resultsNumber, setResultsNumber] = useState(5);
  const selectedClassIds = usePressableElementsStore((state) => state.multiSelectedClassIds);
  const [chosenBodyType, setChosenBodyType] = useState(new Set());

  const SetFoundTranslated = translate("SetFound");

  const updateSetsToShow = (setsFound) => {
    const setsFoundWithName = setsFound.map((set, index) => ({
      name: `${SetFoundTranslated} ${index + 1}`,
      classIds: set.classIds,
      stats: set.stats,
      percentage: set.percentage,
    }));
    setSetsToShow(setsFoundWithName);

    setSetsListFound(setsFoundWithName);
  };

  const search = () => {
    const chosenStatsChecked = chosenStats.map((stat) => stat.checked);
    const chosenStatsValue = chosenStats.map((stat) => stat.value);
    const chosenStatsFilterNumber = chosenStats.map((stat) => stat.statFilterNumber);
    const chosenClassIds = selectedClassIds;

    if (!chosenStatsChecked.includes(true) || chosenBodyType.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
      return; // Sortir si aucun filtre n'est sélectionné
    }

    const gaps = [];

    for (const [setId, setData] of setsData) {
      const { classIds, stats, bodyTypes } = setData;

      const isOneElementNonAccepted = category4Names.some((categoryKey, index) => {
        if (chosenClassIds[categoryKey].size === 0) {
          return false;
        } else {
          return !chosenClassIds[categoryKey].has(classIds[index]);
        }
      });

      if (isOneElementNonAccepted) {
        continue;
      }

      if (chosenBodyType.size !== 0) {
        const isEveryBodyTypeNonAccepted = !bodyTypes.some((item) => chosenBodyType.has(item));
        if (isEveryBodyTypeNonAccepted) {
          continue;
        }
      }

      let gap = 0;
      let validSet = true;

      chosenStatsChecked.forEach((checked, statIndex) => {
        if (checked) {
          const setValue = stats[statIndex];
          const chosenValue = Number(chosenStatsValue[statIndex]);
          const statFilterNumber = chosenStatsFilterNumber[statIndex];

          if (statFilterNumber === 2 && setValue !== chosenValue) {
            validSet = false;
          } else if (statFilterNumber === 1 && setValue < chosenValue) {
            validSet = false;
          } else {
            gap += ((chosenValue - setValue) / 6) ** 2;
          }
        }
      });

      if (validSet) {
        gaps.push({ setId: setId, gap });
      }
    }

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      updateSetsToShow([]);
    } else {
      const realResultsNumber = Math.min(resultsNumber, gaps.length);
      const setsFoundIdGap = gaps.slice(0, realResultsNumber);
      const worstGap = chosenStatsChecked.filter((checked) => checked).length;
      const setsFoundDataPourcentage = setsFoundIdGap.map(({ setId, gap }) => {
        const percentage = 100 * (1 - gap / worstGap);
        const percentageRounded = Number(percentage.toPrecision(3));
        const setFoundData = setsData.get(setId);
        return { ...setFoundData, percentage: percentageRounded };
      });
      updateSetsToShow(setsFoundDataPourcentage);
    }

    scrollRef?.current?.scrollToStart();
  };

  return (
    <View style={styles.pressablesContainer}>
      <ButtonAndModalStatSelectorChosenStats />

      <ButtonAndModal
        modalTitle="Filters"
        customTrigger={
          <ButtonIcon tooltipText="ChooseFilters" iconName="pin" iconType={IconType.MaterialCommunityIcons} />
        }
      >
        <BodyTypeSelector selectedBodyTypes={chosenBodyType} setSelectedBodyTypes={setChosenBodyType} />

        <ElementsDeselector elementsGroupedByClassId={elementsGroupedByClassId} />
        <ElementsSelector selectionMode="multiple" />
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

      <ButtonAndModalStatSelectorResultStats />
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
