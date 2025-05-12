import React from "react";
import { button_icon } from "../styles/button";
import { useTheme } from "@/contexts/ThemeContext";
import { shadow_3dp } from "../styles/theme";
import { Feather } from "@expo/vector-icons";
import { useSetsList } from "@/contexts/SetsListContext";
import TooltipWrapper from "../TooltipWrapper";
import * as Clipboard from "expo-clipboard";
import { searchSetStatsFromElementsClassIds } from "@/utils/searchSetStatsFromElementsClassIds";
import { useScreen } from "../../contexts/ScreenContext";

const ButtonImportSet = () => {
  const { screenName } = useScreen();
  const { theme } = useTheme();
  const { importSet } = useSetsList();

  const handlePaste = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      const parsedSet = JSON.parse(clipboardContent);

      if (!parsedSet.name || !parsedSet.classIds) {
        throw new Error("Le set collé est incomplet.");
      }

      const stats = searchSetStatsFromElementsClassIds(parsedSet.classIds);
      if (!stats || stats.length === 0) {
        throw new Error("Les éléments sont invalides.");
      }

      const set = { ...parsedSet, stats: stats };
      // Importer le set
      importSet(set, screenName);
    } catch (e) {
      alert("Erreur d'import : " + e.message);
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
