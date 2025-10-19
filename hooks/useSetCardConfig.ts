import { useMemo } from "react";

export type ActionName = "edit" | "loadToSearch" | "loadToDisplay" | "save" | "remove" | "export";
export type ActionNamesList = ActionName[];

interface SetCardSituationConfig {
  isNameEditable: boolean;
  showStatSliderResult: boolean;
}

const situationConfigs: Record<string, SetCardSituationConfig> = {
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

const BASE_ACTIONS_SEARCH: ActionNamesList = ["export", "loadToDisplay", "save"];
const BASE_ACTIONS_DISPLAY: ActionNamesList = ["edit", "loadToSearch", "save"];
const BASE_ACTIONS_SAVE: ActionNamesList = ["edit", "loadToSearch", "loadToDisplay"];
const MORE_ACTIONS_DISPLAY_COMMON: ActionNamesList = ["export"]; // Common actions for display more list
const BASE_MORE_ACTIONS_SAVE: ActionNamesList = ["export", "remove"];

export const useSetCardConfig = (situation, hideRemoveSet, screenName) => {
  return useMemo(() => {
    const base = situationConfigs[situation];
    let actionNames: ActionNamesList;
    let moreActionNames: ActionNamesList | undefined;

    if (situation === "load") {
      actionNames = [screenName === "search" ? "loadToSearch" : "loadToDisplay"];
      moreActionNames = undefined;
    } else if (situation === "display") {
      actionNames = BASE_ACTIONS_DISPLAY;
      const dynamicMore: ActionNamesList = [];
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
