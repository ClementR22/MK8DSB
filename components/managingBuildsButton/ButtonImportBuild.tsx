import React from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { useBuildImportExport } from "@/hooks/useBuildImportExport";

interface ButtonImportBuildProps {
  screenName: ScreenName;
}

const ButtonImportBuild: React.FC<ButtonImportBuildProps> = ({ screenName }) => {
  const handleImport = useBuildImportExport().handleImport;

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
