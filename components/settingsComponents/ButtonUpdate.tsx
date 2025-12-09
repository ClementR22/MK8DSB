import React from "react";
import Button from "@/primitiveComponents/Button";
import { useCheckUpdate } from "@/hooks/useCheckUpdate";
import { IconType } from "react-native-dynamic-vector-icons";

interface ButtonUpdateProps {
  isInModal: boolean;
}

const ButtonUpdate: React.FC<ButtonUpdateProps> = ({ isInModal }) => {
  const { updateAvailable, openDownloadPage } = useCheckUpdate();
  const text = isInModal ? "update" : "updateTheApp";

  return (
    <Button
      onPress={openDownloadPage}
      tooltipText={text}
      disabled={!updateAvailable}
      iconProps={!isInModal && { name: "refresh", type: IconType.MaterialCommunityIcons }}
    >
      {text}
    </Button>
  );
};

export default ButtonUpdate;
