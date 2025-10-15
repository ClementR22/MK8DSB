import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsActionsStore from "@/stores/useSetsActionsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import { actionNamesList } from "./useSetCardConfig";
import showToast from "@/utils/showToast";
import { useSetImportExport } from "@/stores/useSetImportExport";
import useSetsListStore from "@/stores/useSetsListStore";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

type ActionIconPropsMap = ActionProps[];

export function useActionIconPropsList(
  actionNamesToGenerate: actionNamesList,
  setId: string,
  situation: ScreenName | "load",
  handleEditPress?: () => void,
  isSaved?: boolean
): ActionIconPropsMap {
  const loadSetSaveToSearch = useSetsActionsStore((state) => state.loadSetSaveToSearch);
  const loadSetSaveToDisplay = useSetsActionsStore((state) => state.loadSetSaveToDisplay);
  const loadSetSearchToDisplay = useSetsActionsStore((state) => state.loadSetSearchToDisplay);
  const loadSetDisplayToSearch = useSetsActionsStore((state) => state.loadSetDisplayToSearch);
  const removeSet = useSetsListStore((state) => state.removeSet);
  const setSetCardEditedId = useSetsListStore((state) => state.setSetCardEditedId);
  const saveSet = useSetsActionsStore((state) => state.saveSet);
  const unSaveSet = useSetsActionsStore((state) => state.unSaveSet);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);

  const handleSavePress = useCallback(() => {
    if (!isSaved) {
      saveSet(situation as ScreenName, setId);
      showToast("Succès" + " " + "Le set a été enregistré");
    } else {
      unSaveSet(situation as ScreenName, setId);
      showToast("Succès" + " " + "Le set a été supprimé des favoris.");
    }
  }, [setSetCardEditedId, setId, situation, setIsRenameSetModalVisible, saveSet, isSaved]);

  const handleRemovePress = useCallback(() => {
    if (situation !== "load") {
      removeSet(setId, situation);
      if (situation === "save") {
        showToast("Succès" + " " + "Le set a été supprimé des favoris.");
      }
    }
  }, [removeSet, setId, situation]);

  const handleExportPress = () => {
    useSetImportExport().handleExport(setId, situation as ScreenName);
  };

  const handleLoadSaveToSearchPress = useCallback(() => {
    if (setId !== null && setId !== undefined) {
      loadSetSaveToSearch(setId);
      showToast("Succès" + " " + "Les stats du set ont été chargées");
    }
    setIsLoadSetModalVisible(false);
  }, [loadSetSaveToSearch, setId, setIsLoadSetModalVisible]);

  const handleLoadSaveToDisplayPress = useCallback(() => {
    if (setId !== null && setId !== undefined) {
      loadSetSaveToDisplay(setId);
    }
    setIsLoadSetModalVisible(false);
  }, [loadSetSaveToDisplay, setId, setIsLoadSetModalVisible]);

  const handleLoadSearchToDisplayPress = useCallback(() => {
    if (setId !== null && setId !== undefined) {
      loadSetSearchToDisplay(setId);
    }
  }, [loadSetSearchToDisplay, setId]);

  const handleLoadDisplayToSearchPress = useCallback(() => {
    if (setId !== null && setId !== undefined) {
      loadSetDisplayToSearch(setId);
      showToast("Succès" + " " + "Les stats du set ont été chargées");
    }
  }, [loadSetDisplayToSearch, setId]);

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
      setId,
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
