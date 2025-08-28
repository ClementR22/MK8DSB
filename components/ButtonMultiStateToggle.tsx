import React, { useCallback } from "react";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

interface ButtonMultiStateToggleProps {
  number: number;
  setNumber: (newNumber: number) => void;
  tooltipText?: string;
}

const statFilterIconsNames = ["approximately-equal", "greater-than-or-equal", "equal"];

const ButtonMultiStateToggle: React.FC<ButtonMultiStateToggleProps> = ({ number, setNumber, tooltipText }) => {
  const currentIconsNames = statFilterIconsNames;

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
      shape={"rectangle"}
    />
  );
};

export default React.memo(ButtonMultiStateToggle);
