import React from "react";
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

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
  const setSetCardEdittedIndex = useSetsStore((state) => state.setSetCardEdittedIndex);
  const saveSetFromDisplay = useSetsStore((state) => state.saveSetFromDisplay);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);

  function handleSavePress() {
    setSetCardEdittedIndex(setCardIndex);
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
      name: "save",
      type: IconType.MaterialIcons,
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
      name: "display-settings",
      type: IconType.MaterialIcons,
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
      onPress: () => removeSet(setCardIndex),
    },

    export: {
      title: "Export",
      name: "share",
      type: IconType.FontAwesome5,
      onPress: () => exportSet(setCardIndex, situation),
    },
  };
}
