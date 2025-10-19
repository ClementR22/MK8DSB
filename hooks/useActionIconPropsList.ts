import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsActionsStore from "@/stores/useSetsActionsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import { ActionName, ActionNamesList } from "./useSetCardConfig";
import showToast from "@/utils/showToast";
import { useSetImportExport } from "@/hooks/useSetImportExport";
import useSetsListStore from "@/stores/useSetsListStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

type ActionIconPropsMap = ActionProps[];

export function useActionIconPropsList(
  actionNamesToGenerate: ActionNamesList,
  screenName: ScreenName,
  isInLoadModal: boolean,
  id: string,
  isSaved?: boolean
): ActionIconPropsMap {
  const s = useSetsListStore((state) => state.getSet(screenName, id));

  const language = useLanguageStore((state) => state.language);

  const updateSelectionFromSet = usePressableElementsStore((state) => state.updateSelectionFromSet);
  const setSetCardEditedId = useSetsListStore((state) => state.setSetCardEditedId);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  const loadToSearch = useSetsActionsStore((state) => state.loadToSearch);
  const loadToDisplay = useSetsActionsStore((state) => state.loadToDisplay);
  const saveSet = useSetsActionsStore((state) => state.saveSet);
  const unSaveSet = useSetsActionsStore((state) => state.unSaveSet);
  const removeSet = useSetsListStore((state) => state.removeSet);
  const handleExport = useSetImportExport().handleExport;
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);

  const handleEditPress = useCallback(() => {
    setSetCardEditedId(id);
    updateSelectionFromSet(s?.classIds);
    setIsEditModalVisible(true);
  }, [id, s?.classIds, setSetCardEditedId, updateSelectionFromSet, setIsEditModalVisible]);

  const handleLoadToSearchPress = useCallback(() => {
    loadToSearch({ source: screenName, id });
    showToast("Succès" + " " + "Les stats du set ont été chargées");

    setIsLoadSetModalVisible(false);
  }, [screenName, id, loadToSearch, setIsLoadSetModalVisible]);

  const handleLoadToDisplayPress = useCallback(() => {
    try {
      loadToDisplay({ source: screenName, id });
      showToast("Succès" + " " + "Le set a été chargé dans l'écran de comparaison");
    } catch (e) {
      showToast(e.message);
    }

    setIsLoadSetModalVisible(false);
  }, [screenName, id, loadToDisplay, setIsLoadSetModalVisible]);

  const handleSavePress = useCallback(() => {
    if (!isSaved) {
      saveSet(screenName, id);
      showToast("Succès" + " " + "Le set a été enregistré");
    } else {
      unSaveSet(screenName, id);
      showToast("Succès" + " " + "Le set a été supprimé des favoris.");
    }
  }, [screenName, id, isSaved, saveSet, unSaveSet]);

  const handleRemovePress = useCallback(() => {
    removeSet(id, screenName);
    if (screenName === "save") {
      showToast("Succès" + " " + "Le set a été supprimé des favoris.");
    }
  }, [screenName, id, removeSet]);

  const handleExportPress = useCallback(() => {
    handleExport(screenName, id);
  }, [screenName, id, handleExport]);

  const actionIconPropsList: ActionIconPropsMap = useMemo(() => {
    const allActionsDefs: Record<ActionName, ActionProps> = {
      edit: {
        title: "Edit",
        name: "edit",
        type: IconType.MaterialIcons,
        onPress: handleEditPress,
      },
      loadToSearch: {
        title: isInLoadModal ? "LoadTheStats" : "LoadTheStatsToSearchScreen",
        name: isInLoadModal ? "download" : "magnify",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadToSearchPress,
      },
      loadToDisplay: {
        title: isInLoadModal ? "LoadTheSet" : "LoadTheSetToDisplayScreen",
        name: isInLoadModal ? "download" : "compare",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadToDisplayPress,
      },
      save: {
        title: "Save",
        name: isSaved ? "heart" : "heart-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleSavePress,
      },
      remove: {
        title: "Remove",
        name: screenName === "save" ? "trash-can" : "close",
        type: screenName === "save" ? IconType.MaterialCommunityIcons : IconType.AntDesign,
        onPress: handleRemovePress,
      },
      export: {
        title: "Copy",
        name: "clipboard-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleExportPress,
      },
    };

    return actionNamesToGenerate.map((actionName) => allActionsDefs[actionName]);
  }, [
    actionNamesToGenerate,
    id,
    screenName,
    isInLoadModal,
    isSaved,
    s?.classIds,
    setSetCardEditedId,
    updateSelectionFromSet,
    setIsEditModalVisible,
    loadToSearch,
    loadToDisplay,
    saveSet,
    unSaveSet,
    removeSet,
    setIsLoadSetModalVisible,
    handleExport,
  ]);

  return actionIconPropsList;
}
