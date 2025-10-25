// hooks/useSetImportExport.ts
import * as Clipboard from "expo-clipboard";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsActionsStore from "@/stores/useSetsActionsStore";
import showToast from "@/utils/showToast";

export const useSetImportExport = () => {
  const exportSet = useSetsActionsStore((state) => state.exportSet);
  const importSet = useSetsActionsStore((state) => state.importSet);

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
