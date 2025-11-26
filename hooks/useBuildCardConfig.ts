import { useMemo } from "react";

export type ActionName = "edit" | "loadToSearch" | "loadToDisplay" | "save" | "remove" | "share";
export type ActionNamesList = ActionName[];

interface BuildCardSituationConfig {
  isNameEditable: boolean;
  showStatSliderResult: boolean;
}

const situationConfigs: Record<string, BuildCardSituationConfig> = {
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

const BASE_ACTIONS_SEARCH: ActionNamesList = ["share", "loadToDisplay", "save"];
const BASE_ACTIONS_DISPLAY: ActionNamesList = ["edit", "loadToSearch", "save"];
const BASE_ACTIONS_SAVE: ActionNamesList = ["edit", "loadToSearch", "loadToDisplay"];
const MORE_ACTIONS_DISPLAY_COMMON: ActionNamesList = ["remove", "share"];
const BASE_MORE_ACTIONS_SAVE: ActionNamesList = ["share", "remove"];

export const useBuildCardConfig = (situation, hideRemoveBuild, screenName) => {
  return useMemo(() => {
    const base = situationConfigs[situation];
    let actionNames: ActionNamesList;
    let moreActionNames: ActionNamesList | undefined;

    if (situation === "load") {
      actionNames = [screenName === "search" ? "loadToSearch" : "loadToDisplay"];
      moreActionNames = undefined;
    } else if (situation === "display") {
      actionNames = BASE_ACTIONS_DISPLAY;
      moreActionNames = MORE_ACTIONS_DISPLAY_COMMON;
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
  }, [situation, hideRemoveBuild, screenName]);
};
