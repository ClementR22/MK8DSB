import useSetsStore from "@/stores/useSetsStore";
import React, { useEffect, useState } from "react";
import StatSelector from "./StatSelector";
import { toggleAndGetChecksForChosenStats } from "@/utils/toggleCheck";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../Modal";
import { View } from "react-native";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import ButtonAndModal from "../modal/ButtonAndModal";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../ButtonIcon";

const StatSelectorChosenStats = ({ chosenStatsInModal, setChosenStatsInModal }) => {
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

  return (
    <StatSelector
      statList={chosenStatsInModal}
      setStatList={setChosenStatsInModal}
      toggleCheck={(name) => {
        toggleCheckChosenStats(name);
      }}
    />
  );
};

const StatSelectorChosenStatsButtonAndModal = () => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setChosenStats = useSetsStore((state) => state.setChosenStats);
  const isChosenStatsModalVisible = useModalsStore((state) => state.isChosenStatsModalVisible);
  const setIsChosenStatsModalVisible = useModalsStore((state) => state.setIsChosenStatsModalVisible);
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const { setStatsVisibleList } = useStatsVisibleList();

  const [chosenStatsInModal, setChosenStatsInModal] = useState(chosenStats);

  useEffect(() => {
    if (isChosenStatsModalVisible) {
      // à l'ouverture, on récupère le state global chosenStats dans le state local chosenStatsInModal
      setChosenStatsInModal(chosenStats);
    } else {
      // à la fermeture, on donne met à jour le state global chosenStats
      setChosenStats(chosenStatsInModal);

      // et, s'il le faut on synchronise statsVisibleList
      if (isStatsVisibleSync) {
        syncWithChosenStats(setStatsVisibleList);
      }
    }
  }, [isChosenStatsModalVisible, isStatsVisibleSync]);

  return (
    <ButtonAndModal
      modalTitle="DesiredStats"
      isModalVisibleProp={isChosenStatsModalVisible}
      setIsModalVisibleProp={setIsChosenStatsModalVisible}
      customTrigger={
        <ButtonIcon tooltipText="ChooseStats" iconName="plus" iconType={IconType.MaterialCommunityIcons} />
      }
    >
      <StatSelectorChosenStats chosenStatsInModal={chosenStatsInModal} setChosenStatsInModal={setChosenStatsInModal} />
    </ButtonAndModal>
  );
};

export default StatSelectorChosenStatsButtonAndModal;
