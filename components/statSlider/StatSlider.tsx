import React, { useCallback } from "react";
import StatSliderContent from "./StatSliderContent";
import { StatName } from "@/types";
import useStatsStore from "@/stores/useStatsStore";

interface StatSliderProps {
  name: StatName;
  value: number;
  statFilterNumber: number;
  onPress: () => void;
}

const StatSlider = ({ name, value, statFilterNumber, onPress }: StatSliderProps) => {
  const setStatFilterNumber = useStatsStore((state) => state.setStatFilterNumber);

  const setStatFilterNumberWithName = useCallback(
    (newNumber: number) => setStatFilterNumber(name, newNumber),
    [name, setStatFilterNumber]
  );

  return (
    <StatSliderContent
      name={name}
      value={value}
      statFilterNumber={statFilterNumber}
      setStatFilterNumber={setStatFilterNumberWithName}
      onPress={onPress}
    />
  );
};

export default React.memo(StatSlider);
