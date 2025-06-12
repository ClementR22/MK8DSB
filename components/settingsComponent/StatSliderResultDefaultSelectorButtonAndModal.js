import React from "react";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import StatSelectorButtonAndModal from "../statSelector/StatSelectorButtonAndModal";

const StatSliderResultDefaultSelectorButtonAndModal = () => {
  const statsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.statsVisibleListDefault);
  const setStatsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.setStatsVisibleListDefault);
  const toggleCheck = useStatsVisibleListConfigStore((state) => state.toggleCheckListStatsVisibleListDefault);

  return (
    <StatSelectorButtonAndModal
      statList={statsVisibleListDefault}
      setStatList={setStatsVisibleListDefault}
      toggleCheck={toggleCheck}
      customTrigger={undefined}
      triggerButtonText="ConfigureDefaultStats"
      modalTitle="DefaultDisplayedStats"
      secondButtonProps={undefined}
    />
  );
};

export default StatSliderResultDefaultSelectorButtonAndModal;
