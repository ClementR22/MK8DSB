import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { categories } from "@/data/elements/elementsData";
import { buildsData } from "@/data/buildsData";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonAndModal from "../modal/ButtonAndModal";
import Button from "../../primitiveComponents/Button";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import PannelPaginated from "../elementPickerCompact/PannelPaginated";
import ElementsDeselector from "../elementPickerCompact/ElementsDeselector";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import { MARGIN_CONTAINER_LOWEST, PADDING_SEARCH_CONTAINER } from "@/utils/designTokens";
import StatSelector from "../statSelector/StatSelector";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonIconWithBadge from "../sortModeSelector/ButtonIconWithBadge";
import useStatsStore from "@/stores/useStatsStore";
import useBuildsListStore, { Build } from "@/stores/useBuildsListStore";
import { useTranslation } from "react-i18next";

interface SearchBuildScreenPressablesContainerProps {
  scrollviewSetsCardsRef: React.RefObject<any>;
  scrollviewMainRef: React.RefObject<any>;
}

const SearchBuildScreenPressablesContainer: React.FC<SearchBuildScreenPressablesContainerProps> = ({
  scrollviewSetsCardsRef,
  scrollviewMainRef,
}) => {
  const { t } = useTranslation("text");

  const chosenStats = useStatsStore((state) => state.chosenStats);
  const setBuildsListFound = useBuildsListStore((state) => state.setBuildsListFound);
  const resultsNumber = useGeneralStore((state) => state.resultsNumber);
  const selectedClassIdsByCategory = usePressableElementsStore((state) => state.multiSelectedClassIdsByCategory);
  const setIsLoading = useGeneralStore((state) => state.setIsLoading);

  const [chosenBodytype, setChosenBodytype] = useState<Set<Bodytype>>(new Set());
  const [disableSearch, setDisableSearch] = useState(false);

  const numberOfSelectedClassIds = useMemo(
    () => Object.values(selectedClassIdsByCategory).reduce((count, category) => count + category.size, 0),
    [selectedClassIdsByCategory]
  );

  useEffect(() => {
    if (disableSearch) {
      setDisableSearch(false);
    }
  }, [chosenStats, chosenBodytype, selectedClassIdsByCategory]);

  const search = () => {
    const chosenStatsChecked = chosenStats.map((stat) => stat.checked);
    const chosenStatsValue = chosenStats.map((stat) => stat.value);
    const chosenStatsFilterNumber = chosenStats.map((stat) => stat.statFilterNumber);
    const chosenClassIds = selectedClassIdsByCategory;

    const gaps: { id: string; gap: number }[] = [];

    buildsData.forEach((buildData, id) => {
      const { classIds, stats, bodytypes } = buildData;

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
        gaps.push({ id, gap });
      }
    });

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      setBuildsListFound([]);
    } else {
      const realResultsNumber = Math.min(resultsNumber, gaps.length);
      const setsFoundIdGap = gaps.slice(0, realResultsNumber);
      const worstGap = chosenStatsChecked.filter((checked) => checked).length;

      const setsFound: Build[] = setsFoundIdGap.map(({ id, gap }, index) => {
        const percentage = 100 * (1 - Math.sqrt(gap / worstGap));
        const percentageRounded = Number(percentage.toPrecision(3));
        const { bodytypes, ...setFoundData } = buildsData.get(id);
        return {
          ...setFoundData,
          id: nanoid(8),
          name: `${t("buildFound")} (${index + 1})`,
          percentage: percentageRounded,
        };
      });

      setBuildsListFound(setsFound);
    }
  };

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    scrollviewSetsCardsRef?.current?.scrollToStart();

    setDisableSearch(true);

    // Donner le temps à l'UI de se mettre à jour avant de lancer le calcul
    setTimeout(() => {
      // Faire le calcul lourd
      search();

      setTimeout(() => {
        scrollviewMainRef?.current?.scrollToEnd();
      }, 20);

      // Terminer le loading
      setIsLoading(false);
    }, 50); // 50ms suffit pour que l'UI se rafraîchisse
  }, [search, scrollviewSetsCardsRef, scrollviewMainRef]);

  return (
    <View style={styles.screenPressablesContainer}>
      <StatSelector />

      <Button
        key="button-search"
        onPress={handleSearch}
        iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}
        disabled={disableSearch}
        flex={1}
      >
        search
      </Button>

      <ButtonAndModal
        modalTitle="filters"
        customTrigger={
          <ButtonIconWithBadge
            tooltipText="ChooseFilters"
            iconName="pin"
            iconType={IconType.MaterialCommunityIcons}
            badgeText={numberOfSelectedClassIds}
          />
        }
      >
        <PannelPaginated
          selectionMode="multiple"
          selectedBodytypes={chosenBodytype}
          setSelectedBodytypes={setChosenBodytype}
        >
          <ElementsDeselector />
        </PannelPaginated>
      </ButtonAndModal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenPressablesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: MARGIN_CONTAINER_LOWEST,
    paddingHorizontal: PADDING_SEARCH_CONTAINER,
    gap: MARGIN_CONTAINER_LOWEST,
  },
});

// 24

SearchBuildScreenPressablesContainer.displayName = "SearchBuildScreenPressablesContainer";

export default React.memo(SearchBuildScreenPressablesContainer);
