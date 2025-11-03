import React from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import * as Clipboard from "expo-clipboard";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import showToast from "@/utils/showToast";
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore";

interface ButtonImportBuildProps {
  screenName: ScreenName;
}

const ButtonImportBuild: React.FC<ButtonImportBuildProps> = ({ screenName }) => {
  const importBuild = useBuildsActionsStore((state) => state.importBuild);

  const handleImport = async (screenName: ScreenName) => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      importBuild(clipboardContent, screenName);
      if (screenName === "search") {
        showToast("statsImported", "success");
      } else {
        showToast("buildImported", "success");
      }
      useLoadBuildModalStore.getState().setIsLoadBuildModalVisible(false);
    } catch (e) {
      showToast(e.message, "importError");
    }
  };

  return (
    <ButtonIcon
      onPress={() => handleImport(screenName)}
      tooltipText="importACopiedSet"
      iconName="content-paste"
      iconType={IconType.MaterialCommunityIcons}
    />
  );
};

export default ButtonImportBuild;
