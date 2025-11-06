import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { categories } from "@/data/elements/elementsData";
import { buildsDataArray } from "@/data/builds/buildsData";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonAndModal from "../modal/ButtonAndModal";
import Button from "../../primitiveComponents/Button";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import PannelPaginated from "../elementPickerCompact/PannelPaginated";
import ElementsDeselector from "../elementPickerCompact/ElementsDeselector";
import "react-native-get-random-values";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import { MARGIN_CONTAINER_LOWEST, PADDING_SEARCH_CONTAINER } from "@/utils/designTokens";
import StatSelector from "../statSelector/StatSelector";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonIconWithBadge from "../sortModeSelector/ButtonIconWithBadge";
import useStatsStore from "@/stores/useStatsStore";
import useBuildsListStore from "@/stores/useBuildsListStore";
import { Build } from "@/data/builds/buildsTypes";
import { useTranslation } from "react-i18next";

interface SearchBuildScreenPressablesContainerProps {
  scrollviewBuildsCardsRef: React.RefObject<any>;
  scrollviewMainRef: React.RefObject<any>;
}

const SearchBuildScreenPressablesContainer: React.FC<SearchBuildScreenPressablesContainerProps> = ({
  scrollviewBuildsCardsRef,
  scrollviewMainRef,
}) => {
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

    const gaps: { buildDataId: string; gap: number }[] = [];

    for (const build of buildsDataArray) {
      const { buildDataId, classIds, stats, bodytypes } = build;

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

      if (chosenBodytype.size && !bodytypes.some((b) => chosenBodytype.has(b))) continue;

      let gap = 0;
      let validSet = true;

      for (let statIndex = 0; statIndex < chosenStatsChecked.length; statIndex++) {
        if (!chosenStatsChecked[statIndex]) continue;

        const setValue = stats[statIndex];
        const chosenValue = Number(chosenStatsValue[statIndex]);
        const statFilterNumber = chosenStatsFilterNumber[statIndex];

        if (statFilterNumber === 2 && setValue !== chosenValue) {
          validSet = false;
          break;
        } else if (statFilterNumber === 1 && setValue < chosenValue) {
          validSet = false;
          break;
        } else {
          gap += ((chosenValue - setValue) / 6) ** 2;
        }
      }

      if (validSet) {
        gaps.push({ buildDataId, gap });
      }
    }

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      setBuildsListFound([]);
    } else {
      const realResultsNumber = Math.min(resultsNumber, gaps.length);
      const buildsFoundIdGap = gaps.slice(0, realResultsNumber);

      const worstGap = chosenStatsChecked.filter((checked) => checked).length;

      const buildsFound: Build[] = buildsFoundIdGap.map(({ buildDataId, gap }, index) => {
        const percentage = 100 * (1 - Math.sqrt(gap / worstGap));
        const percentageRounded = Number(percentage.toPrecision(3));
        return {
          buildDataId: buildDataId,
          percentage: percentageRounded,
        };
      });

      setBuildsListFound(buildsFound);
    }
  };

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    scrollviewBuildsCardsRef?.current?.scrollToStart();

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
  }, [search, scrollviewBuildsCardsRef, scrollviewMainRef]);

  return (
    <View style={styles.screenPressablesContainer}>
      <StatSelector tooltipText="desiredStatsAndStatsInBuilds" />

      <Button
        key="button-search"
        onPress={handleSearch}
        tooltipText="search"
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
            tooltipText="chooseFilters"
            iconName="filter"
            iconType={IconType.MaterialCommunityIcons}
            badgeText={numberOfSelectedClassIds}
          />
        }
        tooltipText="chooseFilters"
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
