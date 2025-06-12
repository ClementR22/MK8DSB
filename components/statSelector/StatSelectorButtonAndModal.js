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
  isStatVisibleInSearchScreen = false,
  disabled = false,
  includeBeforeSync = false,
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
        isStatVisibleInSearchScreen={isStatVisibleInSearchScreen}
        disabled={disabled}
      />
    </ButtonAndModal>
  );
};

export default StatSelectorButtonAndModal;
