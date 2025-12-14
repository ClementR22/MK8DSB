import React from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { useImportBuild } from "@/hooks/useImportBuild";

interface ButtonImportBuildProps {
  screenName: ScreenName;
}

const ButtonImportBuild: React.FC<ButtonImportBuildProps> = ({ screenName }) => {
  const importBuild = useImportBuild(screenName);

  return (
    <ButtonIcon
      onPress={importBuild}
      tooltipText="importACopiedBuild"
      iconName="content-paste"
      iconType={IconType.MaterialCommunityIcons}
    />
  );
};

export default React.memo(ButtonImportBuild);
