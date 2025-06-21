import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext"; // Make sure this path is correct
import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

interface ActionIconPropsMap {
  [key: string]: ActionProps;
}

export function useActionIconPropsList(
  setCardIndex: number,
  situation: ScreenName | "load",
  handleEditPress?: () => void,
  isSaved?: boolean
): ActionIconPropsMap {
  // Correct way to access store actions: select them individually.
  // These action functions are stable references from your Zustand store.
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

  // Memoize handleSavePress
  const handleSavePress = useCallback(() => {
    if (setCardIndex !== null && setCardIndex !== undefined) {
      setsetCardEditedIndex(setCardIndex);
    }
    situation === "search" ? setIsRenameSetModalVisible(true) : saveSetFromDisplay(setCardIndex);
  }, [setsetCardEditedIndex, setCardIndex, situation, setIsRenameSetModalVisible, saveSetFromDisplay]);

  // Memoize other onPress callbacks
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

  const actionPropsList = useMemo(() => {
    return {
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
        onPress: handleRemovePress, // Assuming this is the same 'remove' logic.
      },
      export: {
        title: "Copy",
        name: "clipboard-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleExportPress,
      },
    };
  }, [
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
  ]);

  return actionPropsList;
}
