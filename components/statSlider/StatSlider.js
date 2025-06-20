import React, { useCallback } from "react";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import StatSliderContent from "./StatSliderContent";

const StatSlider = ({ name, value, statFilterNumber }) => {
  const theme = useThemeStore((state) => state.theme);
  const setStatFilterNumber = useSetsStore((state) => state.setStatFilterNumber);

  const setStatFilterNumberWithName = useCallback((newNumber) => setStatFilterNumber(name, newNumber), [name]);

  return (
    <StatSliderContent
      name={name}
      value={value}
      statFilterNumber={statFilterNumber}
      setStatFilterNumber={setStatFilterNumberWithName}
      theme={theme}
    />
  );
};

export default React.memo(StatSlider);
