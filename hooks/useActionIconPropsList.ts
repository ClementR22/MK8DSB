import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useModalLoadBuildStore } from "@/stores/useModalLoadBuildStore";
import { ActionName, ActionNamesList } from "./useBuildCardConfig";
import showToast from "@/utils/showToast";
import { useBuildImportExport } from "@/hooks/useBuildImportExport";
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
  const build = useBuildsListStore((state) => state.getBuild(source, id));

  const updateSelectionFromBuild = usePressableElementsStore((state) => state.updateSelectionFromBuild);
  const setBuildEditedId = useBuildsListStore((state) => state.setBuildEditedId);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  const loadToSearch = useBuildsActionsStore((state) => state.loadToSearch);
  const loadToDisplay = useBuildsActionsStore((state) => state.loadToDisplay);
  const saveBuild = useBuildsActionsStore((state) => state.saveBuild);
  const unSaveBuild = useBuildsActionsStore((state) => state.unSaveBuild);
  const removeBuild = useBuildsListStore((state) => state.removeBuild);
  const handleExport = useBuildImportExport().handleExport;
  const setIsLoadBuildModalVisible = useModalLoadBuildStore((state) => state.setIsLoadBuildModalVisible);

  const handleEditPress = useCallback(() => {
    setBuildEditedId(id);
    updateSelectionFromBuild(build?.classIds);
    setIsEditModalVisible(true);
  }, [id, build?.classIds, setBuildEditedId, updateSelectionFromBuild, setIsEditModalVisible]);

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
        saveBuild(source, id);
        showToast("setHasBeenSaved", "success");
      } else {
        unSaveBuild(source, id);
        showToast("setHasBeenUnSaved", "success");
      }
    } catch (e) {
      showToast(e.message, "error");
    }
  }, [source, id, isSaved, saveBuild, unSaveBuild]);

  const handleRemovePress = useCallback(() => {
    removeBuild(id, source);
    showToast("setHasBeenDeleted", "success");
  }, [source, id, removeBuild]);

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
        title: isInLoadModal ? "loadTheBuild" : "loadTheBuildToDisplayScreen",
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
    build?.classIds,
    setBuildEditedId,
    updateSelectionFromBuild,
    setIsEditModalVisible,
    loadToSearch,
    loadToDisplay,
    saveBuild,
    unSaveBuild,
    removeBuild,
    setIsLoadBuildModalVisible,
    handleExport,
  ]);

  return actionIconPropsList;
}
