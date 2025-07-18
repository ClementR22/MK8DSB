import React from "react";
import useSetsStore from "@/stores/useSetsStore";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonAddSet = ({ scrollRef }) => {
  const addNewSetInDisplay = useSetsStore((state) => state.addNewSetInDisplay);

  const handleAdd = () => {
    addNewSetInDisplay();
    setTimeout(() => {
      // besoin d'un delai pour prendre en compte la nouvelle taille de SetCardsContainer
      scrollRef?.current?.scrollToEnd();
    }, 50);
  };

  return (
    <ButtonIcon onPress={handleAdd} tooltipText="AddASet" iconName="plus" iconType={IconType.MaterialCommunityIcons} />
  );
};

export default ButtonAddSet;
