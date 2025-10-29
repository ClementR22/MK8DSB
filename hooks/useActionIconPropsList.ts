import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadBuildStore } from "@/stores/useModalLoadBuildStore";
import { ActionName, ActionNamesList } from "./useSetCardConfig";
import showToast from "@/utils/showToast";
import { useSetImportExport } from "@/hooks/useSetImportExport";
import useBuildsListStore from "@/stores/useBuildsListStore";
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
  const source = isInLoadModal ? "save" : screenName;
  const s = useBuildsListStore((state) => state.getSet(source, id));

  const updateSelectionFromSet = usePressableElementsStore((state) => state.updateSelectionFromSet);
  const setSetCardEditedId = useBuildsListStore((state) => state.setSetCardEditedId);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  const loadToSearch = useBuildsActionsStore((state) => state.loadToSearch);
  const loadToDisplay = useBuildsActionsStore((state) => state.loadToDisplay);
  const saveSet = useBuildsActionsStore((state) => state.saveSet);
  const unSaveSet = useBuildsActionsStore((state) => state.unSaveSet);
  const removeSet = useBuildsListStore((state) => state.removeSet);
  const handleExport = useSetImportExport().handleExport;
  const setIsLoadBuildModalVisible = useModalLoadBuildStore((state) => state.setIsLoadBuildModalVisible);

  const handleEditPress = useCallback(() => {
    setSetCardEditedId(id);
    updateSelectionFromSet(s?.classIds);
    setIsEditModalVisible(true);
  }, [id, s?.classIds, setSetCardEditedId, updateSelectionFromSet, setIsEditModalVisible]);

  const handleLoadToSearchPress = useCallback(() => {
    loadToSearch({ source, id });
    showToast("setStatsHaveBeenLoaded", "success");

    setIsLoadBuildModalVisible(false);
  }, [source, id, loadToSearch, setIsLoadBuildModalVisible]);

  const handleLoadToDisplayPress = useCallback(() => {
    try {
      loadToDisplay({ source, id });
      showToast("setHasBeenLoadedInTheComparator", "success");
    } catch (e) {
      showToast(e.message, "error");
    }

    setIsLoadBuildModalVisible(false);
  }, [source, id, loadToDisplay, setIsLoadBuildModalVisible]);

  const handleSavePress = useCallback(() => {
    try {
      if (!isSaved) {
        saveSet(source, id);
        showToast("setHasBeenSaved", "success");
      } else {
        unSaveSet(source, id);
        showToast("setHasBeenUnSaved", "success");
      }
    } catch (e) {
      showToast(e.message, "error");
    }
  }, [source, id, isSaved, saveSet, unSaveSet]);

  const handleRemovePress = useCallback(() => {
    removeSet(id, source);
    showToast("setHasBeenDeleted", "success");
  }, [source, id, removeSet]);

  const handleExportPress = useCallback(() => {
    handleExport(source, id);
  }, [source, id, handleExport]);

  const actionIconPropsList: ActionIconPropsMap = useMemo(() => {
    const allActionsDefs: Record<ActionName, ActionProps> = {
      edit: {
        title: "edit",
        name: "edit",
        type: IconType.MaterialIcons,
        onPress: handleEditPress,
      },
      loadToSearch: {
        title: isInLoadModal ? "loadTheStats" : "loadTheStatsToSearchScreen",
        name: isInLoadModal ? "download" : "magnify",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadToSearchPress,
      },
      loadToDisplay: {
        title: isInLoadModal ? "loadTheSet" : "loadTheSetToDisplayScreen",
        name: isInLoadModal ? "download" : "compare",
        type: IconType.MaterialCommunityIcons,
        onPress: handleLoadToDisplayPress,
      },
      save: {
        title: "save",
        name: isSaved ? "heart" : "heart-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleSavePress,
      },
      remove: {
        title: "remove",
        name: source === "save" ? "trash-can" : "close",
        type: source === "save" ? IconType.MaterialCommunityIcons : IconType.AntDesign,
        onPress: handleRemovePress,
      },
      export: {
        title: "copy",
        name: "clipboard-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleExportPress,
      },
    };

    return actionNamesToGenerate.map((actionName) => allActionsDefs[actionName]);
  }, [
    actionNamesToGenerate,
    id,
    source,
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
    setIsLoadBuildModalVisible,
    handleExport,
  ]);

  return actionIconPropsList;
}
