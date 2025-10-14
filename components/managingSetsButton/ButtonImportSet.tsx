import React from "react";
import * as Clipboard from "expo-clipboard";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import showToast from "@/utils/showToast";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

interface ButtonImportSetProps {
  screenName: ScreenName;
}

const ButtonImportSet: React.FC<ButtonImportSetProps> = ({ screenName }) => {
  const importSet = useSetsStore((state) => state.importSet);
  const language = useLanguageStore((state) => state.language);

  const handleImport = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();

      if (!clipboardContent?.trim()) {
        throw new Error("ClipboardIsEmpty");
      }

      importSet(clipboardContent, screenName);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "UnknownError";
      const text = `${translateToLanguage("ImportError", language)}${translateToLanguage(
        ":",
        language
      )}${translateToLanguage(errorMessage, language)}`;
      showToast(text);
    }
  };

  return (
    <ButtonIcon
      onPress={handleImport}
      tooltipText="ImportACopiedSet"
      iconName="paste"
      iconType={IconType.FontAwesome5}
    />
  );
};

export default ButtonImportSet;
