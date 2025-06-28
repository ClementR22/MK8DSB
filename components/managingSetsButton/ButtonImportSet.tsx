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

      let parsedSet;
      try {
        parsedSet = JSON.parse(clipboardContent);
      } catch (err) {
        throw new Error("IncorrectFormat");
      }

      if (typeof parsedSet !== "object" || Array.isArray(parsedSet) || parsedSet === null) {
        throw new Error("IncorrectFormat");
      }

      const { name, classIds } = parsedSet;

      if (typeof name !== "string" || name.trim() === "") {
        throw new Error("IncorrectFormat");
      }

      if (!Array.isArray(classIds) || classIds.some((id) => typeof id !== "number")) {
        throw new Error("IncorrectFormat");
      }

      const stats = getSetStatsFromClassIds(classIds);
      if (!stats || stats.length === 0) {
        throw new Error("ThisSetDoesNotExist");
      }

      const set = { ...parsedSet, stats };
      importSet(set, screenName);

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
