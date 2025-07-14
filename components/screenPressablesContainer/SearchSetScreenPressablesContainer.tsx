import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { categories } from "@/data/elements/elementsData";
import { setsData } from "@/data/setsData";
import ButtonAndModalStatSelectorResultStats from "../statSelector/ButtonAndModalStatSelectorResultStats";
import { translateToLanguage } from "@/translations/translations";
import ResultsNumber from "../ResultsNumberSelector";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";
import ButtonAndModal from "../modal/ButtonAndModal";
import Button from "../../primitiveComponents/Button";
import ButtonAndModalStatSelectorChosenStats from "../statSelector/ButtonAndModalStatSelectorChosenStats";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import ElementPickerCompactSelectorPannel from "../elementCompactSelector/ElementPickerCompactSelectorPannel";
import ElementsDeselector from "../elementCompactSelector/deselector/ElementsDeselector";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { SetFoundObject } from "@/stores/useSetsStore";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface SearchSetScreenPressablesContainerProps {
  scrollRef: React.RefObject<any>;
}

const SearchSetScreenPressablesContainer: React.FC<SearchSetScreenPressablesContainerProps> = ({ scrollRef }) => {
  const language = useLanguageStore((state) => state.language);

  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setSetsListFound = useSetsStore((state) => state.setSetsListFound);
  const [resultsNumber, setResultsNumber] = useState(5);
  const selectedClassIdsByCategory = usePressableElementsStore((state) => state.multiSelectedClassIdsByCategory);
  const [chosenBodytype, setChosenBodytype] = useState<Set<Bodytype>>(new Set());

  const SetFoundTranslated = useMemo(() => translateToLanguage("SetFound", language), []);

  const search = useCallback(() => {
    const chosenStatsChecked = chosenStats.map((stat) => stat.checked);
    const chosenStatsValue = chosenStats.map((stat) => stat.value);
    const chosenStatsFilterNumber = chosenStats.map((stat) => stat.statFilterNumber);
    const chosenClassIds = selectedClassIdsByCategory;

    const gaps: { setId: string; gap: number }[] = [];

    setsData.forEach((setData, setId) => {
      const { classIds, stats, bodytypes } = setData;

      const isOneElementNonAccepted = categories.some((categoryKey, index) => {
        if (chosenClassIds[categoryKey].size === 0) {
          return false;
        } else {
          return !chosenClassIds[categoryKey].has(classIds[index]);
        }
      });

      if (isOneElementNonAccepted) {
        return;
      }

      if (chosenBodytype.size !== 0) {
        const isEveryBodytypeNonAccepted = !bodytypes.some((item: Bodytype) => chosenBodytype.has(item));
        if (isEveryBodytypeNonAccepted) {
          return;
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
        gaps.push({ setId, gap });
      }
    });

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      setSetsListFound([]);
    } else {
      const realResultsNumber = Math.min(resultsNumber, gaps.length);
      const setsFoundIdGap = gaps.slice(0, realResultsNumber);
      const worstGap = chosenStatsChecked.filter((checked) => checked).length;

      const setsFound: SetFoundObject[] = setsFoundIdGap.map(({ setId, gap }, index) => {
        const percentage = 100 * (1 - Math.sqrt(gap / worstGap));
        const percentageRounded = Number(percentage.toPrecision(3));
        const setFoundData = setsData.get(setId);
        return {
          ...setFoundData,
          id: nanoid(8),
          name: `${SetFoundTranslated} ${index + 1}`,
          percentage: percentageRounded,
        };
      });

      setSetsListFound(setsFound);
    }

    scrollRef?.current?.scrollToStart();
  }, [chosenStats, selectedClassIdsByCategory, chosenBodytype, resultsNumber, setSetsListFound, scrollRef]);

  return (
    <View style={styles.ScreenPressablesContainer}>
      <ButtonAndModalStatSelectorChosenStats />

      <ButtonAndModal
        modalTitle="Filters"
        customTrigger={
          <ButtonIcon tooltipText="ChooseFilters" iconName="pin" iconType={IconType.MaterialCommunityIcons} />
        }
      >
        <ElementPickerCompactSelectorPannel
          selectionMode="multiple"
          selectedBodytypes={chosenBodytype}
          setSelectedBodytypes={setChosenBodytype}
        >
          <ElementsDeselector />
        </ElementPickerCompactSelectorPannel>
      </ButtonAndModal>

      <Button onPress={search} iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
        <Text>{translateToLanguage("Search", language)}</Text>
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
  ScreenPressablesContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});

SearchSetScreenPressablesContainer.displayName = "SearchSetScreenPressablesContainer";

export default React.memo(SearchSetScreenPressablesContainer);
