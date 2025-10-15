// hooks/useSetImportExport.ts
import * as Clipboard from "expo-clipboard";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsActionsStore from "@/stores/useSetsActionsStore";
import showToast from "@/utils/showToast";

export const useSetImportExport = () => {
  const exportSet = useSetsActionsStore((state) => state.exportSet);
  const importSet = useSetsActionsStore((state) => state.importSet);

  const handleExport = async (id: string, screenName: ScreenName) => {
    try {
      exportSet(id, screenName);
      showToast("Set copié dans le presse-papier", "success");
    } catch (error) {
      showToast("Erreur lors de l'export", "error");
    }
  };

  const handleImport = async (screenName: ScreenName) => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      importSet(clipboardContent, screenName);
      showToast("Set importé avec succès", "success");
    } catch (error) {
      const message = error.message === "IncorrectFormat" ? "Format incorrect" : "Erreur lors de l'import";
      showToast(message, "error");
    }
  };

  return { handleExport, handleImport };
};

/*
const handleImport = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();

      if (!clipboardContent?.trim()) {
        throw new Error("ClipboardIsEmpty");
      }

      importSet(clipboardContent, screenName);
      switch (screenName) {
        case "search":
          showToast("Succès" + " " + "Les stats du set ont été chargées");

        case "display":
          showToast(translateToLanguage("Succès" + " " + "Le set a été ajouté à l'écran de comparaison", language));
        case "save":
          showToast(translateToLanguage("Succès" + " " + "Le set a été chargé dans les favoris", language));
          showToast("Succès" + " " + "Le set a été chargé dans les favoris");
      }
    } catch (e) {
      showToast(formatErrorMessage(e, language, "ImportError"));
    }
  };
*/
