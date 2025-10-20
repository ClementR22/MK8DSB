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
    showToast("Set copié dans le presse-papier", "success");
  };

  const handleImport = async (screenName: ScreenName) => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      importSet(clipboardContent, screenName);
      showToast("Set importé avec succès", "success");
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  return { handleExport, handleImport };
};
