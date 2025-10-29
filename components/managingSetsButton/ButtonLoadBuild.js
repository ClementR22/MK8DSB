import React, { memo } from "react";
import { useModalLoadBuildStore } from "@/stores/useModalLoadBuildStore";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonLoadBuild = ({ tooltipText }) => {
  const setIsLoadBuildModalVisible = useModalLoadBuildStore((state) => state.setIsLoadBuildModalVisible);

  return (
    <ButtonIcon
      onPress={() => setIsLoadBuildModalVisible(true)}
      tooltipText={tooltipText}
      iconName="cards-outline"
      iconType={IconType.MaterialCommunityIcons}
    />
  );
};

export default memo(ButtonLoadBuild);
