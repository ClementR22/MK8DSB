import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";
import { IconType } from "react-native-dynamic-vector-icons";

export function getActionIconPropsList(setCardIndex, situation, handleEditPress) {
  const loadSetSaveToSearch = useSetsStore((state) => state.loadSetSaveToSearch);
  const loadSetSaveToDisplay = useSetsStore((state) => state.loadSetSaveToDisplay);
  const loadSetSearchToDisplay = useSetsStore((state) => state.loadSetSearchToDisplay);
  const loadSetDisplayToSearch = useSetsStore((state) => state.loadSetDisplayToSearch);
  const removeSet = useSetsStore((state) => state.removeSet);
  const exportSet = useSetsStore((state) => state.exportSet);
  const setsetCardEditedIndex = useSetsStore((state) => state.setsetCardEditedIndex);
  const saveSetFromDisplay = useSetsStore((state) => state.saveSetFromDisplay);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);

  function handleSavePress() {
    setsetCardEditedIndex(setCardIndex);
    situation === "search" ? setIsRenameSetModalVisible(true) : saveSetFromDisplay(setCardIndex);
  }

  return {
    edit: {
      title: "Edit",
      name: "edit",
      type: IconType.MaterialIcons,
      onPress: () => handleEditPress(),
    },

    remove: {
      title: "Remove",
      name: "close",
      type: IconType.Ionicons,
      onPress: () => removeSet(setCardIndex, situation),
    },

    save: {
      title: "Save",
      name: "heart-outline",
      type: IconType.MaterialCommunityIcons,
      onPress: () => handleSavePress(),
    },

    loadSaveToSearch: {
      title: situation === "load" ? "LoadTheStats" : "LoadTheStatsToSearchScreen",
      name: situation === "save" ? "magnify" : "download",
      type: IconType.MaterialCommunityIcons,
      onPress: () => loadSetSaveToSearch(setCardIndex),
    },

    loadSaveToDisplay: {
      title: situation === "load" ? "LoadTheSet" : "LoadTheSetToDisplayScreen",
      name: situation === "save" ? "display-settings" : "download",
      type: IconType.MaterialIcons,
      onPress: () => loadSetSaveToDisplay(setCardIndex),
    },

    loadSearchToDisplay: {
      title: "LoadTheSetToDisplayScreen",
      name: "compare",
      type: IconType.MaterialCommunityIcons,
      onPress: () => loadSetSearchToDisplay(setCardIndex),
    },

    loadDisplayToSearch: {
      title: "LoadTheStatsToSearchScreen",
      name: "magnify",
      type: IconType.MaterialCommunityIcons,
      onPress: () => loadSetDisplayToSearch(setCardIndex),
    },

    removeInMemory: {
      title: "Remove",
      name: "trash-can",
      type: IconType.MaterialCommunityIcons,
      onPress: () => removeSet(setCardIndex, situation),
    },

    export: {
      title: "Copy",
      name: "clipboard-outline",
      type: IconType.MaterialCommunityIcons,
      onPress: () => exportSet(setCardIndex, situation),
    },
  };
}
