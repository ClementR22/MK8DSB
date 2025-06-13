import useSetsStore from "@/stores/useSetsStore";
import React, { useEffect, useState } from "react";
import StatSelector from "./StatSelector";
import { toggleAndGetChecksForChosenStats } from "@/utils/toggleCheck";
import useModalsStore from "@/stores/useModalsStore";
import { useResultStatsConfigStore } from "@/stores/useResultStatsDefaultStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import ButtonAndModal from "../modal/ButtonAndModal";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";

const StatSelectorChosenStatsButtonAndModal = () => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setChosenStats = useSetsStore((state) => state.setChosenStats);
  const isChosenStatsModalVisible = useModalsStore((state) => state.isChosenStatsModalVisible);
  const setIsChosenStatsModalVisible = useModalsStore((state) => state.setIsChosenStatsModalVisible);
  const isResultStatsSync = useResultStatsConfigStore((state) => state.isResultStatsSync);
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const { setResultStats } = useResultStats();

  const [chosenStatsInModal, setChosenStatsInModal] = useState(chosenStats);
  const [statListBeforeAll, setStatListBeforeAll] = useState(null);

  const toggleCheckChosenStats = (name) => {
    const newList = toggleAndGetChecksForChosenStats(chosenStatsInModal, name);
    const hasChecked = newList.some((item) => item.checked);
    if (!hasChecked) {
      // Ici tu peux aussi déclencher un toast si tu veux,
      // ou faire ça dans le composant après l'appel
      return; // annule la modif si pas de checked
    }
    setChosenStatsInModal(newList);
  };

  useEffect(() => {
    if (isChosenStatsModalVisible) {
      // à l'ouverture, on récupère le state global chosenStats dans le state local chosenStatsInModal
      setChosenStatsInModal(chosenStats);
    } else {
      // à la fermeture, on donne met à jour le state global chosenStats
      setChosenStats(chosenStatsInModal);

      // et, s'il le faut on synchronise resultStats
      if (isResultStatsSync) {
        syncWithChosenStats(setResultStats);
      }
    }
  }, [isChosenStatsModalVisible, isResultStatsSync]);

  return (
    <ButtonAndModal
      customTrigger={
        <ButtonIcon tooltipText="ChooseStats" iconName="plus" iconType={IconType.MaterialCommunityIcons} />
      }
      isModalVisibleProp={isChosenStatsModalVisible}
      setIsModalVisibleProp={setIsChosenStatsModalVisible}
      modalTitle="DesiredStats"
    >
      <StatSelector
        statList={chosenStatsInModal}
        setStatList={setChosenStatsInModal}
        statListBeforeAll={statListBeforeAll}
        setStatListBeforeAll={setStatListBeforeAll}
        toggleCheck={(name) => {
          toggleCheckChosenStats(name);
        }}
      />
    </ButtonAndModal>
  );
};

export default StatSelectorChosenStatsButtonAndModal;
