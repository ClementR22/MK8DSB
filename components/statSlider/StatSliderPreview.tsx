import React, { useState } from "react";
import StatSliderContent from "./StatSliderContent";
import { StatName } from "@/data/stats/statsTypes";

interface StatSliderPreviewProps {
  name: StatName;
}

const StatSliderPreview: React.FC<StatSliderPreviewProps> = ({ name }) => {
  const [statFilterNumber, setStatFilterNumber] = useState(0);

  return (
    <StatSliderContent
      name={name}
      value={4}
      statFilterNumber={statFilterNumber}
      setStatFilterNumber={setStatFilterNumber}
      disabled={true}
    />
  );
};

export default React.memo(StatSliderPreview);
