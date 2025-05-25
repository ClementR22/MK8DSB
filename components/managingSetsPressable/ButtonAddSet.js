import React from "react";
import useSetsStore from "@/stores/useSetsStore";
import ButtonIcon from "../ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonAddSet = () => {
  const addNewSetInDisplay = useSetsStore((state) => state.addNewSetInDisplay);

  return (
    <ButtonIcon
      onPress={addNewSetInDisplay}
      tooltipText="AddASet"
      iconName="plus"
      iconType={IconType.MaterialCommunityIcons}
    />
  );
};

export default ButtonAddSet;
