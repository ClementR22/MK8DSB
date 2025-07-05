import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { categories } from "@/data/elements/elementsData";
import { statNames } from "@/data/stats/statsData";
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
import ElementsSelectorPannel from "../elementsSelector/ElementsSelectorPannel";
import ElementsDeselector from "../elementsSelector/deselector/ElementsDeselector";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

const SearchSetScreenPressablesContainer = ({ setSetsToShow, scrollRef }) => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setSetsListFound = useSetsStore((state) => state.setSetsListFound);
  const [resultsNumber, setResultsNumber] = useState(5);
  const selectedClassIds = usePressableElementsStore((state) => state.multiSelectedClassIds);
  const [chosenBodytype, setChosenBodytype] = useState(new Set());

  const SetFoundTranslated = translate("SetFound");

  const updateSetsToShow = (setsFound) => {
    const setsFoundWithName = setsFound.map((set, index) => ({
      id: nanoid(8),
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

    if (!chosenStatsChecked.includes(true) || chosenBodytype.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
      return; // Sortir si aucun filtre n'est sélectionné
    }

    const gaps = [];

    for (const [setId, setData] of setsData) {
      const { classIds, stats, bodytypes } = setData;

      const isOneElementNonAccepted = categories.some((categoryKey, index) => {
        if (chosenClassIds[categoryKey].size === 0) {
          return false;
        } else {
          return !chosenClassIds[categoryKey].has(classIds[index]);
        }
      });

      if (isOneElementNonAccepted) {
        continue;
      }

      if (chosenBodytype.size !== 0) {
        const isEveryBodytypeNonAccepted = !bodytypes.some((item) => chosenBodytype.has(item));
        if (isEveryBodytypeNonAccepted) {
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
        <ElementsSelectorPannel
          selectionMode="multiple"
          selectedBodytypes={chosenBodytype}
          setSelectedBodytypes={setChosenBodytype}
        >
          <ElementsDeselector />
        </ElementsSelectorPannel>
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
