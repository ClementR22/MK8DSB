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
      statFilterNumber={statFilterNumber}
      setStatFilterNumber={setStatFilterNumber}
      theme={theme}
    />
  );
};

export default StatSliderPreview;
