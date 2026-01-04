import React from "react";
import { useCheckUpdate } from "@/hooks/useCheckUpdate";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";

interface ButtonUpdateProps {}

const ButtonUpdate: React.FC<ButtonUpdateProps> = () => {
  const { updateAvailable, openDownloadPage } = useCheckUpdate();
  const text = "updateTheApp";

  return (
    <ButtonSettings
      title={text}
      onPress={openDownloadPage}
      iconProps={{ name: "refresh", type: IconType.MaterialCommunityIcons }}
      tooltipText={text}
      disabled={!updateAvailable}
    />
  );
};

export default ButtonUpdate;
