import React from "react";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import StatSelectorButtonAndModal from "../statSelector/StatSelectorButtonAndModal";

const StatSelectorResultStatsDefaultButtonAndModal = () => {
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);
  const setResultStatsDefault = useResultStatsDefaultStore((state) => state.setResultStatsDefault);
  const toggleCheck = useResultStatsDefaultStore((state) => state.toggleCheckListResultStatsDefault);

  return (
    <StatSelectorButtonAndModal
      statList={resultStatsDefault}
      setStatList={setResultStatsDefault}
      toggleCheck={toggleCheck}
      customTrigger={undefined}
      triggerButtonText="ConfigureDefaultStats"
      modalTitle="DefaultDisplayedStats"
      secondButtonProps={undefined}
    />
  );
};

export default StatSelectorResultStatsDefaultButtonAndModal;
