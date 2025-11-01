import React, { memo } from "react";
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

interface ButtonLoadBuildProps {
  tooltipText: string;
}

const ButtonLoadBuild: React.FC<ButtonLoadBuildProps> = ({ tooltipText }) => {
  const setIsLoadBuildModalVisible = useLoadBuildModalStore((state) => state.setIsLoadBuildModalVisible);

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
