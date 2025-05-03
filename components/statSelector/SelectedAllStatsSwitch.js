import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { translate } from "../../i18n/translations";

const SelectedAllStatsSwitch = ({ statList, setStatList }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [formerStatList, setFormerStatList] = useState(null);
  const internalUpdate = useRef(false); // <- nouvelle référence

  const onToggleSwitch = () => {
    internalUpdate.current = true; // <- on marque que le changement est interne

    if (!isSwitchOn) {
      setStatList((statList) => {
        setFormerStatList(statList);
        return statList.map((stat) => {
          return { ...stat, checked: true };
        });
      });
    } else {
      setStatList(formerStatList);
    }

    setIsSwitchOn(!isSwitchOn);
  };

  const updateToggleSwitch = () => {
    if (internalUpdate.current) {
      internalUpdate.current = false; // <- reset le flag
      return; // <- skip la mise à jour si c'était un changement interne
    } // ce test permet uniquement d'éviter les calculs inutiles

    const hasUnchecked = statList.some((stat) => stat.checked === false);
    if (hasUnchecked) {
      setIsSwitchOn(false);
    }
  };

  useEffect(() => updateToggleSwitch(), [statList]);

  return (
    <View style={styles.switchContainer}>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      <Text>{translate("All")}</Text>
    </View>
  );
};

export default SelectedAllStatsSwitch;

const styles = StyleSheet.create({
  switchContainer: { flexDirection: "row" },
});
