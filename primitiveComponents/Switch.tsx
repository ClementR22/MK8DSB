import React, { useCallback } from "react";
import { Switch as NativeSwitch } from "react-native-paper";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { translate } from "@/translations/translations";
import Text from "./Text";

interface SwitchProps {
  value: boolean;
  // on peut donner SetValue OU BIEN onToggleSwitch
  setValue?: (newValue: boolean) => void;
  onToggleSwitch?: () => void;
  disabled?: boolean;
  switchLabel: string;
  style?: StyleProp<ViewStyle>;
}

const Switch: React.FC<SwitchProps> = ({ value, setValue, onToggleSwitch, disabled = false, switchLabel, style }) => {
  const handleToggle = useCallback(() => {
    if (onToggleSwitch) {
      onToggleSwitch();
    } else if (setValue) {
      setValue(!value);
    }
  }, [onToggleSwitch, setValue, value]);

  return (
    <Pressable onPress={handleToggle} style={[styles.switchContainer, style]}>
      <NativeSwitch value={value} onValueChange={handleToggle} disabled={disabled} style={{ height: 30 }} />
      <Text role="title" size="small" numberOfLines={1}>
        {translate(switchLabel)}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

Switch.displayName = "Switch";

export default React.memo(Switch);
