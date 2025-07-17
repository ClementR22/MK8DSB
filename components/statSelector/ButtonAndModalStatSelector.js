import React, { useEffect, useState } from "react";
import ButtonAndModal from "../modal/ButtonAndModal";
import StatSelector from "./StatSelector";
import { toggleAndGetChecks } from "@/utils/toggleCheck";

const ButtonAndModalStatSelector = ({
  statList,
  setStatList,
  keepOneSelected = false,
  customTrigger,
  triggerButtonText,
  modalTitle,
  secondButtonProps,
  isResultStatsInSearchScreen = false,
  disabled = false,
  includeBeforeSync = false,
}) => {
  const [statListBeforeAll, setStatListBeforeAll] = useState(null);
  const [statListBeforeSync, setStatListBeforeSync] = useState(statList);

  const [statListInModal, setStatListInModal] = useState(statList);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      // à l'ouverture, on récupère le state global chosenStats dans le state local chosenStatsInModal
      setStatListInModal(statList);
    } else {
      // à la fermeture, on donne met à jour le state global
      setStatList(statListInModal);
    }
  }, [isModalVisible]);

  const toggleCheck = (name) => {
    const newList = toggleAndGetChecks(statListInModal, name);
    const hasChecked = newList.some((item) => item.checked);
    if (keepOneSelected && !hasChecked) {
      // Ici tu peux aussi déclencher un toast si tu veux,
      // ou faire ça dans le composant après l'appel
      return; // annule la modif si pas de checked
    }
    setStatListInModal(newList);
  };

  return (
    <ButtonAndModal
      customTrigger={customTrigger}
      triggerButtonText={triggerButtonText}
      modalTitle={modalTitle}
      secondButtonProps={secondButtonProps}
      closeAfterSecondButton={false}
      isModalVisibleProp={isModalVisible}
      setIsModalVisibleProp={setIsModalVisible}
    >
      <StatSelector
        statList={statListInModal}
        setStatList={setStatListInModal}
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

export default React.memo(ButtonAndModalStatSelector);
