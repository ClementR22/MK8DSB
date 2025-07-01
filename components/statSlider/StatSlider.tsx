import React, { useCallback } from "react";
import useSetsStore from "@/stores/useSetsStore";
import StatSliderContent from "./StatSliderContent";

interface StatSliderProps {
  name: string;
  value: number;
  statFilterNumber: number;
}

const StatSlider = ({ name, value, statFilterNumber }: StatSliderProps) => {
  const setStatFilterNumber = useSetsStore((state) => state.setStatFilterNumber);

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
