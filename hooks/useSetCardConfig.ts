import { useMemo } from "react";

export type actionNamesList = string[];

interface SetCardSituationConfig {
  isNameEditable: boolean;
  showStatSliderResult: boolean;
  actionNamesList: actionNamesList;
  moreActionNamesList?: actionNamesList;
}

const situationConfigs: Record<string, Omit<SetCardSituationConfig, "actionNamesList" | "moreActionNamesList">> = {
  search: {
    isNameEditable: true,
    showStatSliderResult: true,
  },
  display: {
    isNameEditable: true,
    showStatSliderResult: false,
  },
  save: {
    isNameEditable: true,
    showStatSliderResult: true,
  },
  load: {
    isNameEditable: false,
    showStatSliderResult: false,
  },
};

const BASE_ACTIONS_SEARCH: actionNamesList = ["export", "loadSearchToDisplay", "save"];
const BASE_ACTIONS_DISPLAY: actionNamesList = ["edit", "loadDisplayToSearch", "save"];
const BASE_ACTIONS_SAVE: actionNamesList = ["edit", "loadSaveToSearch", "loadSaveToDisplay"];
const BASE_MORE_ACTIONS_SAVE: actionNamesList = ["export", "removeInMemory"];
const MORE_ACTIONS_DISPLAY_COMMON: actionNamesList = ["export"]; // Common actions for display more list

export const useSetCardConfig = (situation, hideRemoveSet, screenName) => {
  return useMemo(() => {
    const base = situationConfigs[situation];
    let actionNames: actionNamesList;
    let moreActionNames: actionNamesList | undefined;

    if (situation === "load") {
      actionNames = [screenName === "search" ? "loadSaveToSearch" : "loadSaveToDisplay"];
      moreActionNames = undefined;
    } else if (situation === "display") {
      actionNames = BASE_ACTIONS_DISPLAY;
      const dynamicMore: string[] = [];
      if (!hideRemoveSet) {
        dynamicMore.push("remove");
      }

      moreActionNames =
        dynamicMore.length > 0 ? [...dynamicMore, ...MORE_ACTIONS_DISPLAY_COMMON] : MORE_ACTIONS_DISPLAY_COMMON;
    } else if (situation === "save") {
      actionNames = BASE_ACTIONS_SAVE;
      moreActionNames = BASE_MORE_ACTIONS_SAVE;
    } else if (situation === "search") {
      actionNames = BASE_ACTIONS_SEARCH;
      moreActionNames = undefined;
    } else {
      actionNames = [];
      moreActionNames = undefined;
    }

    return {
      ...base,
      actionNamesList: actionNames,
      moreActionNamesList: moreActionNames,
    };
  }, [situation, hideRemoveSet, screenName]);
};
