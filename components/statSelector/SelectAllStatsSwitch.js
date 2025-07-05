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

  // Mémoïsation du handler pour éviter de recréer la fonction à chaque render
  const onToggleSwitch = React.useCallback(() => {
    internalUpdate.current = true;
    if (!isSwitchOn) {
      setStatListBeforeAll(statList);
      const newList = statList.map((stat) => ({ ...stat, checked: true }));
      setStatList(newList);
      setIsSwitchOn(true);
    } else if (statListBeforeAll) {
      setStatList(statListBeforeAll);
      setIsSwitchOn(false);
    }
  }, [isSwitchOn, statList, setStatList, setStatListBeforeAll, statListBeforeAll]);

  // Mémoïsation de la fonction de mise à jour du switch
  const updateToggleSwitch = React.useCallback(() => {
    const hasAllChecked = areAllStatsChecked(statList);
    if (isSwitchOn != hasAllChecked) {
      setIsSwitchOn(hasAllChecked);
      if (hasAllChecked) {
        if (externalUpdateRef.current) {
          externalUpdateRef.current = false;
          return;
        } else {
          setStatListBeforeAll(statList);
        }
      }
    }
  }, [isSwitchOn, statList, setStatListBeforeAll, externalUpdateRef]);

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
