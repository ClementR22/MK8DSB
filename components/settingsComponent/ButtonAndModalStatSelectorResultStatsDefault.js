import React from "react";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import ButtonAndModalStatSelector from "../statSelector/StatSelector";

const ButtonAndModalStatSelectorResultStatsDefault = () => {
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);
  const setResultStatsDefault = useResultStatsDefaultStore((state) => state.setResultStatsDefault);

  return (
    <ButtonAndModalStatSelector
      statList={resultStatsDefault}
      setStatList={setResultStatsDefault}
      triggerButtonText="ConfigureDefaultStats"
      modalTitle="DefaultDisplayedStats"
    />
  );
};

export default ButtonAndModalStatSelectorResultStatsDefault;
