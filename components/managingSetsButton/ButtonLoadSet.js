import React from "react";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonLoadSet = ({ tooltipText }) => {
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);

  return (
    <ButtonIcon
      onPress={() => setIsLoadSetModalVisible(true)}
      tooltipText={tooltipText}
      iconName="cards-outline"
      iconType={IconType.MaterialCommunityIcons}
    />
  );
};

export default ButtonLoadSet;
