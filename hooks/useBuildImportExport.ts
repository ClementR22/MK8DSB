// hooks/useBuildImportExport.ts
import * as Clipboard from "expo-clipboard";
import { ScreenName } from "@/contexts/ScreenContext";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import showToast from "@/utils/showToast";
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore";

export const useBuildImportExport = () => {
  const exportBuild = useBuildsActionsStore((state) => state.exportBuild);
  const importBuild = useBuildsActionsStore((state) => state.importBuild);

  const handleExport = async (screenName: ScreenName, id: string) => {
    exportBuild(screenName, id);
    showToast("setCopiedInClipboard", "success");
  };

  const handleImport = async (screenName: ScreenName) => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      importBuild(clipboardContent, screenName);
      if (screenName === "search") {
        showToast("statsImported", "success");
      } else {
        showToast("buildImported", "success");
      }
    } catch (e) {
      showToast(e.message, "error");
    }
    useLoadBuildModalStore.getState().setIsLoadBuildModalVisible(false);
  };

  return { handleExport, handleImport };
};
