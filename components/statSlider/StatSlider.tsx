import React, { useCallback } from "react";
import StatSliderContent from "./StatSliderContent";
import { StatName } from "@/data/stats/statsTypes";
import useStatsStore from "@/stores/useStatsStore";

interface StatSliderProps {
  name: StatName;
  value: number;
  statFilterNumber: number;
}

const StatSlider = ({ name, value, statFilterNumber }: StatSliderProps) => {
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
    />
  );
};

export default React.memo(StatSlider);
