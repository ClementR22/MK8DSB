import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import { actionNamesList } from "./useSetCardConfig";
import showToast from "@/utils/showToast";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

type ActionIconPropsMap = ActionProps[];

export function useActionIconPropsList(
  actionNamesToGenerate: actionNamesList,
  setToShowId: string,
  situation: ScreenName | "load",
  handleEditPress?: () => void,
  isSaved?: boolean
): ActionIconPropsMap {
  const loadSetSaveToSearch = useSetsStore((state) => state.loadSetSaveToSearch);
  const loadSetSaveToDisplay = useSetsStore((state) => state.loadSetSaveToDisplay);
  const loadSetSearchToDisplay = useSetsStore((state) => state.loadSetSearchToDisplay);
  const loadSetDisplayToSearch = useSetsStore((state) => state.loadSetDisplayToSearch);
  const removeSet = useSetsStore((state) => state.removeSet);
  const exportSet = useSetsStore((state) => state.exportSet);
  const setSetCardEditedId = useSetsStore((state) => state.setSetCardEditedId);
  const saveSet = useSetsStore((state) => state.saveSet);
  const unSaveSet = useSetsStore((state) => state.unSaveSet);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);

  const handleSavePress = useCallback(() => {
    if (!isSaved) {
      saveSet(situation as ScreenName, setToShowId);
      showToast("Succès" + " " + "Le set a été enregistré");
    } else {
      unSaveSet(situation as ScreenName, setToShowId);
      showToast("Succès" + " " + "Le set a été supprimé des favoris.");
    }
  }, [setSetCardEditedId, setToShowId, situation, setIsRenameSetModalVisible, saveSet, isSaved]);

  const handleRemovePress = useCallback(() => {
    if (situation !== "load") {
      removeSet(setToShowId, situation);
      if (situation === "save") {
        showToast("Succès" + " " + "Le set a été supprimé des favoris.");
      }
    }
  }, [removeSet, setToShowId, situation]);

  const handleExportPress = useCallback(() => {
    if (situation !== "load") {
      try {
        exportSet(setToShowId, situation);
        showToast("Succès" + " " + "le set a été copié dans le presse-papier !");
      } catch (e) {
        showToast("ERRor" + e);
      }
    }
  }, [exportSet, setToShowId, situation]);

  const handleLoadSaveToSearchPress = useCallback(() => {
    if (setToShowId !== null && setToShowId !== undefined) {
      loadSetSaveToSearch(setToShowId);
      showToast("Succès" + " " + "Les stats du set ont été chargées");
    }
    setIsLoadSetModalVisible(false);
  }, [loadSetSaveToSearch, setToShowId, setIsLoadSetModalVisible]);

  const handleLoadSaveToDisplayPress = useCallback(() => {
    if (setToShowId !== null && setToShowId !== undefined) {
      loadSetSaveToDisplay(setToShowId);
    }
    setIsLoadSetModalVisible(false);
  }, [loadSetSaveToDisplay, setToShowId, setIsLoadSetModalVisible]);

  const handleLoadSearchToDisplayPress = useCallback(() => {
    if (setToShowId !== null && setToShowId !== undefined) {
      loadSetSearchToDisplay(setToShowId);
    }
  }, [loadSetSearchToDisplay, setToShowId]);

  const handleLoadDisplayToSearchPress = useCallback(() => {
    if (setToShowId !== null && setToShowId !== undefined) {
      loadSetDisplayToSearch(setToShowId);
      showToast("Succès" + " " + "Les stats du set ont été chargées");
    }
  }, [loadSetDisplayToSearch, setToShowId]);

  const allPossibleActionDefs = useMemo(
    () => ({
      edit: {
        title: "Edit",
        name: "edit",
        type: IconType.MaterialIcons,
        onPress: handleEditPress,
      },
      remove: {
        title: "Remove",
        name: "close",
        type: IconType.AntDesign,
        onPress: handleRemovePress,
      },
      save: {
        title: "Save",
        name: isSaved ? "heart" : "heart-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleSavePress,
      },
      loadSaveToSearch: {
        title: situation === "load" ? "LoadTheStats" : "LoadTheStatsToSearchScreen",
        name: situation === "save" ? "magnify" : "download",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadSaveToSearchPress,
      },
      loadSaveToDisplay: {
        title: situation === "load" ? "LoadTheSet" : "LoadTheSetToDisplayScreen",
        name: situation === "save" ? "compare" : "download",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadSaveToDisplayPress,
      },
      loadSearchToDisplay: {
        title: "LoadTheSetToDisplayScreen",
        name: "compare",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadSearchToDisplayPress,
      },
      loadDisplayToSearch: {
        title: "LoadTheStatsToSearchScreen",
        name: "magnify",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadDisplayToSearchPress,
      },
      removeInMemory: {
        title: "Remove",
        name: "trash-can",
        type: IconType.MaterialCommunityIcons,
        onPress: handleRemovePress,
      },
      export: {
        title: "Copy",
        name: "clipboard-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleExportPress,
      },
    }),
    [
      setToShowId,
      situation,
      handleEditPress,
      isSaved,
      handleSavePress,
      handleRemovePress,
      handleExportPress,
      handleLoadSaveToSearchPress,
      handleLoadSaveToDisplayPress,
      handleLoadSearchToDisplayPress,
      handleLoadDisplayToSearchPress,
    ]
  );

  const actionIconPropsList = useMemo(() => {
    const selectedActions: ActionIconPropsMap = [];
    actionNamesToGenerate.forEach((actionName) => {
      const actionDef = allPossibleActionDefs[actionName];
      if (actionDef) {
        selectedActions.push(actionDef);
      } else {
        console.warn(`Action definition for "${actionName}" not found in useActionIconPropsList.`);
      }
    });
    return selectedActions;
  }, [actionNamesToGenerate, allPossibleActionDefs]);

  return actionIconPropsList;
}
