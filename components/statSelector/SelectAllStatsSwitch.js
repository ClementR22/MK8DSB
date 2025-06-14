import React, { useEffect, useRef, useState } from "react";
import Switch from "../../primitiveComponents/Switch";

function areAllStatsChecked(statList) {
  return !statList.some((stat) => stat.checked === false);
}

const SelectAllStatsSwitch = ({
  statList,
  setStatList,
  statListBeforeAll,
  setStatListBeforeAll,
  disabled = false,
  externalUpdateRef,
}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(areAllStatsChecked(statList));

  const internalUpdate = useRef(false);

  const isFirstRender = useRef(true);

  const onToggleSwitch = () => {
    // on déclare que le changement est provoqué par le switch, pour bloquer le useEffect
    internalUpdate.current = true;

    if (!isSwitchOn) {
      // si l'utilisateur vient active le switch
      // Sauvegarde l’état courant avant modification
      setStatListBeforeAll(statList);

      // coche tous les stat
      const newList = statList.map((stat) => ({ ...stat, checked: true }));
      setStatList(newList);
      setIsSwitchOn(true);

      // si l'utilisateur veut restaurer la liste précédente et qu'elle existe
    } else if (statListBeforeAll) {
      // on restaure la liste précédente
      setStatList(statListBeforeAll);
      setIsSwitchOn(false);
    }
  };

  const updateToggleSwitch = () => {
    const hasAllChecked = areAllStatsChecked(statList);

    // si le switch n'est pas à jour
    if (isSwitchOn != hasAllChecked) {
      // on le met à jour
      setIsSwitchOn(hasAllChecked);

      // si tout est checké
      if (hasAllChecked) {
        if (externalUpdateRef.current) {
          externalUpdateRef.current = false; // reset le flag
          return; // skip la mise à jour de statListBeforeAll si le changement vient de ResultStatsSyncSwitch
        } else {
          // sinon, on est dans le cas : l'utilisateur vient de cocher le dernier élément manuellement
          // on MAJ statListBeforeAll avec tous les checked à true
          setStatListBeforeAll(statList); // nouvelle référence avec tous cochés
        }
      }
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // reset le flag
      return; // skip la mise à jour de statListBeforeAll si le changement est dû au 1er render
    }

    if (internalUpdate.current) {
      internalUpdate.current = false; // reset le flag
      return; // skip la mise à jour du switch si le changement provoqué par le switch
      // celle de statListBeforeAll est deja faite
    }

    updateToggleSwitch();
  }, [statList]);

  return <Switch value={isSwitchOn} onToggleSwitch={onToggleSwitch} disabled={disabled} switchLabel="All" />;
};

export default SelectAllStatsSwitch;
