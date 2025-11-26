import React, { useState } from "react";
import StatSliderContent from "./StatSliderContent";
import { StatName } from "@/types";

interface StatSliderPreviewProps {
  name: StatName;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onPress: () => void;
  statFilterNumber: number;
  setStatFilterNumber: React.Dispatch<React.SetStateAction<number>>;
}

const StatSliderPreview: React.FC<StatSliderPreviewProps> = ({
  name,
  value,
  setValue,
  onPress,
  statFilterNumber,
  setStatFilterNumber,
}) => {
  return (
    <StatSliderContent
      name={name}
      value={value}
      statFilterNumber={statFilterNumber}
      setStatFilterNumber={setStatFilterNumber}
      setValuePreview={setValue}
      onPress={onPress}
    />
  );
};

export default React.memo(StatSliderPreview);
