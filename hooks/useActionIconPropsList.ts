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
import { BuildAlreadyExistsError } from "@/errors/errors";

interface ActionProps {
  title: string;
  name: string;
  type: IconType;
  onPress: () => void;
}

export type ActionIconPropsList = ActionProps[];

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

    showToast("toast:buildStatsHaveBeenLoaded", "success");
    setIsLoadBuildModalVisible(false);
  }, [source, buildDataId, loadToSearch, setIsLoadBuildModalVisible]);

  const handleLoadToDisplayPress = useCallback(() => {
    try {
      loadToDisplay({ source, buildDataId });
      showToast("toast:buildHasBeenLoadedInTheComparator", "success");
      setIsLoadBuildModalVisible(false);
    } catch (e) {
      if (e instanceof BuildAlreadyExistsError) {
        // e.buildName peut etre undefined (inutile de le préciser car le build en conflit est égal au build à charger)

        // Construction du message avec sécurité
        const targetMessage = e.target ? `|toast:in|toast:${e.target}` : "";
        const buildNameMessage = e.buildName ? `|toast:withTheName|${e.buildName}` : "";

        const fullMessage = `error:${e.message}${targetMessage}${buildNameMessage}`;

        showToast(fullMessage, "error");
      } else if (e instanceof Error) {
        // Erreur générique : on affiche son message si c’est un vrai Error
        showToast(`error:${e.message}`, "error");
      } else {
        // Cas où c’est un type inconnu (throw d’un string ou d’un objet brut)
        console.error("Unexpected error:", e);
        showToast("error:unknownError", "error");
      }
    }
  }, [source, buildDataId, loadToDisplay, setIsLoadBuildModalVisible]);

  const handleSavePress = useCallback(async () => {
    try {
      if (!isSaved) {
        await saveBuild(source, buildDataId);
        showToast("toast:buildHasBeenSaved", "success");
      } else {
        await unSaveBuild(buildDataId);
        showToast("toast:buildHasBeenUnsaved", "success");
      }
    } catch (e) {
      showToast(`error:${e.message}`, "error");
    }
  }, [source, buildDataId, isSaved, saveBuild, unSaveBuild]);

  const handleRemovePress = useCallback(() => {
    removeBuild(buildDataId, source);
    showToast("toast:buildHasBeenDeleted", "success");
  }, [source, buildDataId, removeBuild]);

  const handleExportPress = useCallback(() => {
    try {
      exportBuild(source, buildDataId);
      showToast("toast:buildCopiedInClipboard", "success");
    } catch (e) {
      showToast(`error:${e.message}`, "error");
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
