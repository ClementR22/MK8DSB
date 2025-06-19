import React from "react";
import useSetsStore from "@/stores/useSetsStore";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonAddSet = ({ scrollRef }) => {
  const addNewSetInDisplay = useSetsStore((state) => state.addNewSetInDisplay);

  const handleAdd = () => {
    addNewSetInDisplay(); // ajouter un set
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd(); // scroller à la fin
    }, 50); // petit délai pour que le DOM ait le temps de se mettre à jour
  };

  return (
    <ButtonIcon onPress={handleAdd} tooltipText="AddASet" iconName="plus" iconType={IconType.MaterialCommunityIcons} />
  );
};

export default ButtonAddSet;
