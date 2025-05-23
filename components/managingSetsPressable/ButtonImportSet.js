import React from "react";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "@/components/styles/theme";
import { Feather } from "@expo/vector-icons";
import TooltipWrapper from "../TooltipWrapper";
import * as Clipboard from "expo-clipboard";
import { getSetStatsFromElementsClassIds } from "@/utils/getSetStatsFromElementsClassIds";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { translate, translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import showToast from "@/utils/toast";
import { useThemeStore } from "@/stores/useThemeStore";

const ButtonImportSet = () => {
  const { screenName } = useScreen();
  const theme = useThemeStore((state) => state.theme);
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

      const stats = getSetStatsFromElementsClassIds(classIds);
      if (!stats || stats.length === 0) {
        throw new Error("ThisSetDoesNotExist");
      }

      const set = { ...parsedSet, stats };
      importSet(set, screenName);
    } catch (e) {
      const text1 = translateToLanguage("ImportError", language);
      const text2 = translateToLanguage(":", language) + translateToLanguage(e.message, language) + ".";
      showToast(text1, text2, "error");
    }
  };

  return (
    <TooltipWrapper
      tooltipText="ImportACopiedSet"
      style={[button_icon(theme).container, shadow_3dp]}
      onPress={handlePaste}
    >
      <Feather name="download" size={24} color={theme.on_primary} />
    </TooltipWrapper>
  );
};

export default ButtonImportSet;
