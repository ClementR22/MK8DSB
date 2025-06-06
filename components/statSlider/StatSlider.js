import React, { useEffect, useState } from "react";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import StatSliderContent from "./StatSliderContent";

const StatSlider = ({ name, value, statFilterNumber }) => {
  const theme = useThemeStore((state) => state.theme);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);
  const setStatFilterNumber = useSetsStore((state) => state.setStatFilterNumber);
  const setStatFilterNumberWithName = (newNumber) => setStatFilterNumber(name, newNumber);

  return (
    <StatSliderContent
      name={name}
      value={value}
      number={statFilterNumber}
      setNumber={setStatFilterNumberWithName}
      theme={theme}
      onSlidingComplete={([v]) => updateStatValue(name, v)}
    />
  );
};

export default StatSlider;
