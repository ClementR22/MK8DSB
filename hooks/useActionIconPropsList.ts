import { IconType } from "react-native-dynamic-vector-icons"; // Assuming this is correct
import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import { useCallback, useMemo } from "react"; // Import useMemo and useCallback if needed for internal stability
import { ScreenName } from "@/contexts/ScreenContext";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

// Define the return type of the hook
interface ActionIconPropsMap {
  [key: string]: ActionProps;
}

export function useActionIconPropsList(
  setCardIndex: number,
  situation: ScreenName | string,
  handleEditPress?: () => void, // This is now a dependency passed from the component
  isSaved?: boolean
): ActionIconPropsMap {
  // Call Hooks at the top level of this custom Hook
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

  // Memoize handleSavePress to ensure its stability, as it's used in the returned object
  const handleSavePress = useCallback(() => {
    if (setCardIndex !== null) {
      setsetCardEditedIndex(setCardIndex);
    }
    situation === "search" ? setIsRenameSetModalVisible(true) : saveSetFromDisplay(setCardIndex);
  }, [setsetCardEditedIndex, setCardIndex, situation, setIsRenameSetModalVisible, saveSetFromDisplay]);

  // Use useMemo to return a stable object of action props,
  // re-calculating only when the dependencies change.
  const actionPropsList = useMemo(() => {
    return {
      edit: {
        title: "Edit",
        name: "edit",
        type: IconType.MaterialIcons,
        onPress: handleEditPress, // Use the passed handleEditPress
      },

      remove: {
        title: "Remove",
        name: "close",
        type: IconType.Ionicons,
        onPress: () => {
          if (setCardIndex !== null) {
            removeSet(setCardIndex, situation);
          }
        },
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
        onPress: () => {
          if (setCardIndex !== null) {
            loadSetSaveToSearch(setCardIndex);
          }
          setIsLoadSetModalVisible(false);
        },
      },

      loadSaveToDisplay: {
        title: situation === "load" ? "LoadTheSet" : "LoadTheSetToDisplayScreen",
        name: situation === "save" ? "compare" : "download",
        type: IconType.MaterialCommunityIcons,
        onPress: () => {
          if (setCardIndex !== null) {
            loadSetSaveToDisplay(setCardIndex);
          }
          setIsLoadSetModalVisible(false);
        },
      },

      loadSearchToDisplay: {
        title: "LoadTheSetToDisplayScreen",
        name: "compare",
        type: IconType.MaterialCommunityIcons,
        onPress: () => {
          if (setCardIndex !== null) {
            loadSetSearchToDisplay(setCardIndex);
          }
        },
      },

      loadDisplayToSearch: {
        title: "LoadTheStatsToSearchScreen",
        name: "magnify",
        type: IconType.MaterialCommunityIcons,
        onPress: () => {
          if (setCardIndex !== null) {
            loadSetDisplayToSearch(setCardIndex);
          }
        },
      },

      removeInMemory: {
        title: "Remove",
        name: "trash-can",
        type: IconType.MaterialCommunityIcons,
        onPress: () => {
          if (setCardIndex !== null) {
            removeSet(setCardIndex, situation);
          }
        },
      },

      export: {
        title: "Copy",
        name: "clipboard-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: () => {
          if (setCardIndex !== null) {
            exportSet(setCardIndex, situation);
          }
        },
      },
    };
  }, [
    setCardIndex,
    situation,
    handleEditPress,
    isSaved,
    loadSetSaveToSearch,
    loadSetSaveToDisplay,
    loadSetSearchToDisplay,
    loadSetDisplayToSearch,
    removeSet,
    exportSet,
    handleSavePress,
    setIsLoadSetModalVisible,
  ]); // Include all external dependencies for memoization

  return actionPropsList;
}
