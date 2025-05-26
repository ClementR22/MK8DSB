import React from "react";
import { useLoadSetModalStore } from "@/stores/useLoadSetModalStore";
import ButtonIcon from "../ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonLoadSet = ({ tooltipText }) => {
  const setIsLoadSetModalVisible = useLoadSetModalStore((state) => state.setIsLoadSetModalVisible);

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
