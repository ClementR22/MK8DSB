import React, { useState } from "react";
import StatSliderContent from "./StatSliderContent";

const StatSliderPreview = ({ name }: { name: string }) => {
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
