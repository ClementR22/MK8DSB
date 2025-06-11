import React from "react";
import { Switch as NativeSwitch } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { translate } from "@/translations/translations";

interface SwitchProps {
  value: boolean;
  // on peut donner SetValue OU BIEN onToggleSwitch
  setValue?: (newValue: boolean) => void;
  onToggleSwitch?: () => void;
  disabled?: boolean;
  switchLabel: string;
}

const Switch: React.FC<SwitchProps> = ({ value, setValue, onToggleSwitch, disabled = false, switchLabel }) => {
  const theme = useThemeStore((state) => state.theme);

  const onToggleSwitch_ = onToggleSwitch ?? (() => setValue(!value));

  return (
    <View style={styles.switchContainer}>
      <NativeSwitch value={value} onValueChange={onToggleSwitch_} disabled={disabled} />
      <Text style={{ color: theme.on_surface }}>{translate(switchLabel)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Switch;
