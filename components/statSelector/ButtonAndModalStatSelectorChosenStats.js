import useSetsStore from "@/stores/useSetsStore";
import React, { useEffect, useState } from "react";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import useModalsStore from "@/stores/useModalsStore";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import ButtonAndModalStatSelector from "./ButtonAndModalStatSelector";

const ButtonAndModalStatSelectorChosenStats = () => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setChosenStats = useSetsStore((state) => state.setChosenStats);
  const isChosenStatsModalVisible = useModalsStore((state) => state.isChosenStatsModalVisible);
  const setIsChosenStatsModalVisible = useModalsStore((state) => state.setIsChosenStatsModalVisible);
  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const { setResultStats } = useResultStats();

  const [chosenStatsInModal, setChosenStatsInModal] = useState(chosenStats);

  const toggleCheckChosenStats = (name) => {
    const newList = toggleAndGetChecks(chosenStatsInModal, name);
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
    <ButtonAndModalStatSelector
      statList={chosenStatsInModal}
      setStatList={setChosenStatsInModal}
      toggleCheck={(name) => {
        toggleCheckChosenStats(name);
      }}
      customTrigger={
        <ButtonIcon tooltipText="ChooseStats" iconName="plus" iconType={IconType.MaterialCommunityIcons} />
      }
      modalTitle="DesiredStats"
      isModalVisibleProp={isChosenStatsModalVisible}
      setIsModalVisibleProp={setIsChosenStatsModalVisible}
    />
  );
};

export default ButtonAndModalStatSelectorChosenStats;
