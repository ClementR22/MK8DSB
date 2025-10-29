// hooks/useBuildImportExport.ts
import * as Clipboard from "expo-clipboard";
import { ScreenName } from "@/contexts/ScreenContext";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import showToast from "@/utils/showToast";

export const useBuildImportExport = () => {
  const exportSet = useBuildsActionsStore((state) => state.exportSet);
  const importSet = useBuildsActionsStore((state) => state.importSet);

  const handleExport = async (screenName: ScreenName, id: string) => {
    exportSet(screenName, id);
    showToast("setCopiedInClipboard", "success");
  };

  const handleImport = async (screenName: ScreenName) => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      importSet(clipboardContent, screenName);
      if (screenName === "search") {
        showToast("statsImported", "success");
      } else {
        showToast("setImported", "success");
      }
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  return { handleExport, handleImport };
};
