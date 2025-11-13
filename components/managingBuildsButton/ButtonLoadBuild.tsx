import React, { memo } from "react";
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIconWithBadge from "../sortModeSelector/ButtonIconWithBadge";
import useThemeStore from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";

interface ButtonLoadBuildProps {
  tooltipText: string;
}

const ButtonLoadBuild: React.FC<ButtonLoadBuildProps> = ({ tooltipText }) => {
  const theme = useThemeStore((state) => state.theme);

  const setIsLoadBuildModalVisible = useLoadBuildModalStore((state) => state.setIsLoadBuildModalVisible);
  const numberSavedBuilds = useGeneralStore((state) => state.numberSavedBuilds);

  return (
    <ButtonIconWithBadge
      onPress={() => setIsLoadBuildModalVisible(true)}
      tooltipText={tooltipText}
      iconName="cards-outline"
      iconType={IconType.MaterialCommunityIcons}
      badgeText={numberSavedBuilds}
    />
  );
};

export default memo(ButtonLoadBuild);
