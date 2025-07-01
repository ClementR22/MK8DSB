import React, { useCallback, useMemo } from "react";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

interface ButtonMultiStateToggleProps {
  number: number;
  setNumber: (newNumber: number) => void;
  filterCase?: boolean;
  tooltipText?: string;
}

const statFilterIconsNames = ["approximately-equal", "greater-than-or-equal", "equal"];
const elementOrderIconsNames = [
  "sort-numeric-ascending",
  "sort-alphabetical-ascending",
  "sort-alphabetical-descending",
  "graphql",
];

const ButtonMultiStateToggle: React.FC<ButtonMultiStateToggleProps> = ({
  number,
  setNumber,
  filterCase = false,
  tooltipText,
}) => {
  const currentIconsNames = useMemo(() => {
    return filterCase ? statFilterIconsNames : elementOrderIconsNames;
  }, [filterCase]);

  const handlePress = useCallback(() => {
    const newNumber = (number + 1) % currentIconsNames.length;
    setNumber(newNumber);
  }, [number, currentIconsNames, setNumber]);

  return (
    <ButtonIcon
      tooltipText={tooltipText}
      iconName={currentIconsNames[number]}
      iconType={IconType.MaterialCommunityIcons}
      onPress={handlePress}
      shape={filterCase ? "rectangle" : undefined}
    />
  );
};

export default React.memo(ButtonMultiStateToggle);
