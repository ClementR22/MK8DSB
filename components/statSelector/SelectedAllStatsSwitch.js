import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { translate } from "@/translations/translations";

const SelectedAllStatsSwitch = ({ statList, setStatList }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [formerStatList, setFormerStatList] = useState(null);
  const internalUpdate = useRef(false); // Marqueur de mise à jour interne

  const onToggleSwitch = () => {
    internalUpdate.current = true;

    if (!isSwitchOn) {
      // si l'utilisateur vient active le switch
      // Sauvegarde l’état courant avant modification
      setFormerStatList(statList);

      // Coche tous les stat
      setStatList(statList.map((stat) => ({ ...stat, checked: true })));
    } else if (formerStatList) {
      // si l'utilisateur ne veut pas tout activer et qu'il existe une liste précédente
      // Restaure la liste précédente
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
