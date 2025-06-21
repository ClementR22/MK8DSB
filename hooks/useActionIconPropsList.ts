import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import { actionNamesList } from "@/components/setCard/SetCard";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

type ActionIconPropsMap = ActionProps[];

export function useActionIconPropsList(
  actionNamesToGenerate: actionNamesList,
  setCardIndex: number,
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
  const setsetCardEditedIndex = useSetsStore((state) => state.setsetCardEditedIndex);
  const saveSetFromDisplay = useSetsStore((state) => state.saveSetFromDisplay);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);

  const handleSavePress = useCallback(() => {
    if (setCardIndex !== null && setCardIndex !== undefined) {
      setsetCardEditedIndex(setCardIndex);
    }
    situation === "search" ? setIsRenameSetModalVisible(true) : saveSetFromDisplay(setCardIndex);
  }, [setsetCardEditedIndex, setCardIndex, situation, setIsRenameSetModalVisible, saveSetFromDisplay]);

  const handleRemovePress = useCallback(() => {
    if (situation !== "load") {
      removeSet(setCardIndex, situation);
    }
  }, [removeSet, setCardIndex, situation]);

  const handleExportPress = useCallback(() => {
    if (situation !== "load") {
      exportSet(setCardIndex, situation);
    }
  }, [exportSet, setCardIndex, situation]);

  const handleLoadSaveToSearchPress = useCallback(() => {
    if (setCardIndex !== null && setCardIndex !== undefined) {
      loadSetSaveToSearch(setCardIndex);
    }
    setIsLoadSetModalVisible(false);
  }, [loadSetSaveToSearch, setCardIndex, setIsLoadSetModalVisible]);

  const handleLoadSaveToDisplayPress = useCallback(() => {
    if (setCardIndex !== null && setCardIndex !== undefined) {
      loadSetSaveToDisplay(setCardIndex);
    }
    setIsLoadSetModalVisible(false);
  }, [loadSetSaveToDisplay, setCardIndex, setIsLoadSetModalVisible]);

  const handleLoadSearchToDisplayPress = useCallback(() => {
    if (setCardIndex !== null && setCardIndex !== undefined) {
      loadSetSearchToDisplay(setCardIndex);
    }
  }, [loadSetSearchToDisplay, setCardIndex]);

  const handleLoadDisplayToSearchPress = useCallback(() => {
    if (setCardIndex !== null && setCardIndex !== undefined) {
      loadSetDisplayToSearch(setCardIndex);
    }
  }, [loadSetDisplayToSearch, setCardIndex]);

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
        type: IconType.Ionicons,
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
      setCardIndex,
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
