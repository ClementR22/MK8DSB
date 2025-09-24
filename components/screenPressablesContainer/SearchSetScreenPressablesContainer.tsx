import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { categories } from "@/data/elements/elementsData";
import { setsData } from "@/data/setsData";
import { translateToLanguage } from "@/translations/translations";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";
import ButtonAndModal from "../modal/ButtonAndModal";
import Button from "../../primitiveComponents/Button";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import ElementPickerCompactSelectorPannel from "../elementCompactSelector/ElementPickerCompactSelectorPannel";
import ElementsDeselector from "../elementCompactSelector/deselector/ElementsDeselector";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { SetFoundObject } from "@/stores/useSetsStore";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";
import StatSelector from "../statSelector/StatSelector";
import useGeneralStore from "@/stores/useGeneralStore";

interface SearchSetScreenPressablesContainerProps {
  scrollviewSetsCardsRef: React.RefObject<any>;
  scrollviewMainRef: React.RefObject<any>;
}

const SearchSetScreenPressablesContainer: React.FC<SearchSetScreenPressablesContainerProps> = ({
  scrollviewSetsCardsRef,
  scrollviewMainRef,
}) => {
  const language = useLanguageStore((state) => state.language);

  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setSetsListFound = useSetsStore((state) => state.setSetsListFound);
  const resultsNumber = useGeneralStore((state) => state.resultsNumber);
  const selectedClassIdsByCategory = usePressableElementsStore((state) => state.multiSelectedClassIdsByCategory);
  const [chosenBodytype, setChosenBodytype] = useState<Set<Bodytype>>(new Set());
  const [isResultsUpdated, setIsResultUpdated] = useState(false);

  useEffect(() => {
    if (isResultsUpdated) {
      setIsResultUpdated(false);
    }
  }, [chosenStats, chosenBodytype, selectedClassIdsByCategory]);

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
  }, [chosenStats, selectedClassIdsByCategory, chosenBodytype, resultsNumber, setSetsListFound]);

  const handleSearch = useCallback(() => {
    setIsResultUpdated(true);
    search();

    scrollviewSetsCardsRef?.current?.scrollToStart();

    setTimeout(() => {
      scrollviewMainRef?.current?.scrollToEnd();
    }, 20);
  }, [search, scrollviewSetsCardsRef, scrollviewMainRef]);

  return (
    <View style={styles.screenPressablesContainer}>
      <StatSelector />

      <Button
        onPress={handleSearch}
        iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}
        disabled={isResultsUpdated}
        flex={1}
      >
        <Text>{translateToLanguage("Search", language)}</Text>
      </Button>

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
    </View>
  );
};

const styles = StyleSheet.create({
  screenPressablesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: MARGIN_CONTAINER_LOWEST * 1.5,
    gap: 15,
  },
});

SearchSetScreenPressablesContainer.displayName = "SearchSetScreenPressablesContainer";

export default React.memo(SearchSetScreenPressablesContainer);
