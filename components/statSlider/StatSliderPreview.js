import React, { useState } from "react";
import StatSliderContent from "./StatSliderContent";
import { useThemeStore } from "@/stores/useThemeStore";

const StatSliderPreview = ({ name }) => {
  const theme = useThemeStore((state) => state.theme);
  const [statFilterNumber, setStatFilterNumber] = useState(0);

  return (
    <StatSliderContent
      name={name}
      value={4}
      number={statFilterNumber}
      setNumber={setStatFilterNumber} // pas d’action
      theme={theme}
      disable={true}
    />
  );
};

export default StatSliderPreview;
