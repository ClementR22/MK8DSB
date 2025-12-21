import React from "react";
import Button from "@/primitiveComponents/Button";
import { useCheckUpdate } from "@/hooks/useCheckUpdate";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";

interface ButtonUpdateProps {
  isInModal: boolean;
}

const ButtonUpdate: React.FC<ButtonUpdateProps> = ({ isInModal }) => {
  const { updateAvailable, openDownloadPage } = useCheckUpdate();
  const text = "updateTheApp";

  return (
    <ButtonSettings
      title={text}
      onPress={openDownloadPage}
      iconProps={!isInModal && { name: "refresh", type: IconType.MaterialCommunityIcons }}
      tooltipText={text}
      disabled={!updateAvailable}
    />
  );
};

export default ButtonUpdate;
