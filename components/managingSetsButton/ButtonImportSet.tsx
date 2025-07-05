import React from "react";
import * as Clipboard from "expo-clipboard";
import { getSetStatsFromClassIds } from "@/utils/getSetStatsFromClassIds";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import showToast from "@/utils/toast";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonImportSet = ({ screenName, onComplete }: { screenName: ScreenName; onComplete?: () => void }) => {
  const importSet = useSetsStore((state) => state.importSet);
  const language = useLanguageStore((state) => state.language);

  const handlePaste = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();

      if (!clipboardContent || clipboardContent.trim() === "") {
        throw new Error("ClipboardIsEmpty");
      }

      // La validation JSON et structure est maintenant dans `importSet` :
      await importSet(clipboardContent, screenName);

      onComplete?.();
    } catch (e) {
      const text =
        translateToLanguage("ImportError", language) +
        translateToLanguage(":", language) +
        translateToLanguage(e.message, language) +
        ".";
      showToast(text);
    }
  };

  return (
    <ButtonIcon onPress={handlePaste} tooltipText="ImportACopiedSet" iconName="download" iconType={IconType.Feather} />
  );
};

export default ButtonImportSet;
