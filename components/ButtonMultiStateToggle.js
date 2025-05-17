import React from "react";
import ButtonIcon from "@/components/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonMultiStateToggle = ({
  number,
  setNumber,
  filterCase = false,
  tooltipText,
}) => {
  const statFilterIconsNames = [
    "approximately-equal",
    "greater-than-or-equal",
    "equal",
  ];
  const elementOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  const iconsNames = filterCase ? statFilterIconsNames : elementOrderIconsNames;

  const handlePress = () => {
    const newNumber = (number + 1) % iconsNames.length;
    setNumber(newNumber);
  };

  return (
    <ButtonIcon
      tooltipText={tooltipText}
      iconName={iconsNames[number]}
      iconSize={24}
      iconType={IconType.MaterialCommunityIcons}
      onPress={handlePress}
    ></ButtonIcon>
  );
};

export default ButtonMultiStateToggle;
