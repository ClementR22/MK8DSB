import React from "react";
import { useLoadSetModalStore } from "@/stores/useLoadSetModalStore";
import ButtonIcon from "../ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonLoadSet = ({ tooltip_text }) => {
  const setIsLoadSetModalVisible = useLoadSetModalStore((state) => state.setIsLoadSetModalVisible);

  return (
    <ButtonIcon
      onPress={() => setIsLoadSetModalVisible(true)}
      tooltipText={tooltip_text}
      iconName="cards-outline"
      iconType={IconType.MaterialCommunityIcons}
    />
  );
};

export default ButtonLoadSet;
