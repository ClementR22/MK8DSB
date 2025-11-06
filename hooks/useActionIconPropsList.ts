import { IconType } from "react-native-dynamic-vector-icons";
import { useCallback, useMemo } from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import useEditBuildModalStore from "@/stores/useEditBuildModalStore";
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore";
import { ActionName, ActionNamesList } from "./useBuildCardConfig";
import showToast from "@/utils/showToast";
import useBuildsListStore from "@/stores/useBuildsListStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { buildsDataMap } from "@/data/builds/buildsData";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

type ActionIconPropsList = ActionProps[];

export function useActionIconPropsList(
  actionNamesToGenerate: ActionNamesList,
  screenName: ScreenName,
  isInLoadBuildModal: boolean,
  buildDataId: string,
  isSaved?: boolean
): ActionIconPropsList {
  const source = isInLoadBuildModal ? "save" : screenName;

  const updateSelectionFromBuild = usePressableElementsStore((state) => state.updateSelectionFromBuild);
  const setBuildEditedDataId = useBuildsListStore((state) => state.setBuildEditedDataId);
  const setIsEditBuildModalVisible = useEditBuildModalStore((state) => state.setIsEditBuildModalVisible);
  const loadToSearch = useBuildsActionsStore((state) => state.loadToSearch);
  const loadToDisplay = useBuildsActionsStore((state) => state.loadToDisplay);
  const saveBuild = useBuildsActionsStore((state) => state.saveBuild);
  const unSaveBuild = useBuildsActionsStore((state) => state.unSaveBuild);
  const removeBuild = useBuildsListStore((state) => state.removeBuild);
  const exportBuild = useBuildsActionsStore((state) => state.exportBuild);
  const setIsLoadBuildModalVisible = useLoadBuildModalStore((state) => state.setIsLoadBuildModalVisible);

  const handleEditPress = useCallback(() => {
    setBuildEditedDataId(buildDataId);
    updateSelectionFromBuild(buildsDataMap.get(buildDataId).classIds);
    setIsEditBuildModalVisible(true);
  }, [buildDataId, setBuildEditedDataId, updateSelectionFromBuild, setIsEditBuildModalVisible]);

  const handleLoadToSearchPress = useCallback(() => {
    loadToSearch({ source, buildDataId });

    showToast("buildStatsHaveBeenLoaded", "success");
    setIsLoadBuildModalVisible(false);
  }, [source, buildDataId, loadToSearch, setIsLoadBuildModalVisible]);

  const handleLoadToDisplayPress = useCallback(() => {
    try {
      loadToDisplay({ source, buildDataId });

      showToast("buildHasBeenLoadedInTheComparator", "success");
      setIsLoadBuildModalVisible(false);
    } catch (e) {
      showToast(e.message, "error");
    }
  }, [source, buildDataId, loadToDisplay, setIsLoadBuildModalVisible]);

  const handleSavePress = useCallback(async () => {
    try {
      if (!isSaved) {
        await saveBuild(source, buildDataId);
        showToast("buildHasBeenSaved", "success");
      } else {
        await unSaveBuild(source, buildDataId);
        showToast("buildHasBeenUnsaved", "success");
      }
    } catch (e) {
      showToast(e.message, "error");
    }
  }, [source, buildDataId, isSaved, saveBuild, unSaveBuild]);

  const handleRemovePress = useCallback(() => {
    removeBuild(buildDataId, source);
    showToast("buildHasBeenDeleted", "success");
  }, [source, buildDataId, removeBuild]);

  const handleExportPress = useCallback(() => {
    try {
      exportBuild(source, buildDataId);
      showToast("buildCopiedInClipboard", "success");
    } catch (e) {
      showToast(e.message, "error");
    }
  }, [source, buildDataId, exportBuild]);

  if (isInLoadBuildModal) {
    const actionIconPropsList: ActionIconPropsList = [
      {
        title: screenName === "search" ? "loadTheStats" : "loadTheBuild",
        name: "check",
        type: IconType.FontAwesome5,
        onPress: screenName === "search" ? handleLoadToSearchPress : handleLoadToDisplayPress,
      },
    ];
    return actionIconPropsList;
  }

  const actionIconPropsList: ActionIconPropsList = useMemo(() => {
    const allActionsDefs: Record<ActionName, ActionProps> = {
      edit: {
        title: "edit",
        name: "edit",
        type: IconType.MaterialIcons,
        onPress: handleEditPress,
      },
      loadToSearch: {
        title: isInLoadBuildModal ? "loadTheStats" : "loadTheStatsToSearchScreen",
        name: isInLoadBuildModal ? "check" : "magnify",
        type: isInLoadBuildModal ? IconType.FontAwesome5 : IconType.MaterialCommunityIcons,
        onPress: handleLoadToSearchPress,
      },
      loadToDisplay: {
        title: isInLoadBuildModal ? "loadTheBuild" : "loadTheBuildToDisplayScreen",
        name: isInLoadBuildModal ? "check" : "compare",
        type: isInLoadBuildModal ? IconType.FontAwesome5 : IconType.MaterialCommunityIcons,
        onPress: handleLoadToDisplayPress,
      },
      save: {
        title: "save",
        name: isSaved ? "content-save-check" : "content-save-outline",
        type: IconType.MaterialCommunityIcons,
        onPress: handleSavePress,
      },
      remove: {
        title: "remove",
        name: source === "save" ? "trash-can" : "close",
        type: source === "save" ? IconType.MaterialCommunityIcons : IconType.AntDesign,
        onPress: handleRemovePress,
      },
      share: {
        title: "share",
        name: "share",
        type: IconType.MaterialIcons,
        onPress: handleExportPress,
      },
    };

    return actionNamesToGenerate.map((actionName) => allActionsDefs[actionName]);
  }, [
    actionNamesToGenerate,
    buildDataId,
    source,
    isInLoadBuildModal,
    isSaved,
    setBuildEditedDataId,
    updateSelectionFromBuild,
    setIsEditBuildModalVisible,
    loadToSearch,
    loadToDisplay,
    saveBuild,
    unSaveBuild,
    removeBuild,
    setIsLoadBuildModalVisible,
    exportBuild,
  ]);

  return actionIconPropsList;
}
