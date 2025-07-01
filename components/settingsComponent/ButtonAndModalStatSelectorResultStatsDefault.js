import React from "react";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import ButtonAndModalStatSelector from "../statSelector/ButtonAndModalStatSelector";

const ButtonAndModalStatSelectorResultStatsDefault = () => {
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);
  const setResultStatsDefault = useResultStatsDefaultStore((state) => state.setResultStatsDefault);
  const toggleCheck = useResultStatsDefaultStore((state) => state.toggleCheckListResultStatsDefault);

  return (
    <ButtonAndModalStatSelector
      statList={resultStatsDefault}
      setStatList={setResultStatsDefault}
      toggleCheck={toggleCheck}
      triggerButtonText="ConfigureDefaultStats"
      modalTitle="DefaultDisplayedStats"
    />
  );
};

export default ButtonAndModalStatSelectorResultStatsDefault;
