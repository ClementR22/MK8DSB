import React, { useState } from "react";
import ButtonAndModal from "../modal/ButtonAndModal";
import StatSelector from "./StatSelector";

const StatSelectorButtonAndModal = ({
  statList,
  setStatList,
  toggleCheck,
  customTrigger,
  triggerButtonText,
  modalTitle,
  secondButtonProps,
  isResultStatsInSearchScreen = false,
  disabled = false,
  includeBeforeSync = false,
  // Si fournie, la modale est contrôlée de l'extérieur
  isModalVisibleProp = undefined,
  // Setter pour le contrôle externe
  setIsModalVisibleProp = undefined,
}) => {
  const [statListBeforeAll, setStatListBeforeAll] = useState(null);
  const [statListBeforeSync, setStatListBeforeSync] = useState(statList);

  return (
    <ButtonAndModal
      customTrigger={customTrigger}
      triggerButtonText={triggerButtonText}
      modalTitle={modalTitle}
      secondButtonProps={secondButtonProps}
      closeAfterSecondButton={false}
      isModalVisibleProp={isModalVisibleProp}
      setIsModalVisibleProp={setIsModalVisibleProp}
    >
      <StatSelector
        statList={statList}
        setStatList={setStatList}
        toggleCheck={toggleCheck}
        statListBeforeAll={statListBeforeAll}
        setStatListBeforeAll={setStatListBeforeAll}
        {...(includeBeforeSync && {
          statListBeforeSync,
          setStatListBeforeSync,
        })}
        isResultStatsInSearchScreen={isResultStatsInSearchScreen}
        disabled={disabled}
      />
    </ButtonAndModal>
  );
};

export default StatSelectorButtonAndModal;
