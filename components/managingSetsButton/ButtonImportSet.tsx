import React from "react";
import { ScreenName } from "@/contexts/ScreenContext";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { useSetImportExport } from "@/stores/useSetImportExport";

interface ButtonImportSetProps {
  screenName: ScreenName;
}

const ButtonImportSet: React.FC<ButtonImportSetProps> = ({ screenName }) => {
  const handleImport = useSetImportExport().handleImport;

  return (
    <ButtonIcon
      onPress={() => handleImport(screenName)}
      tooltipText="ImportACopiedSet"
      iconName="paste"
      iconType={IconType.FontAwesome5}
    />
  );
};

export default ButtonImportSet;
