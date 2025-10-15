import React from "react";
import * as Clipboard from "expo-clipboard";
import { ScreenName } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import showToast from "@/utils/showToast";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { formatErrorMessage } from "@/utils/formatErrorMessage";

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
