import React, { useCallback, useMemo } from "react";
import { Switch as NativeSwitch } from "react-native-paper";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { translate } from "@/translations/translations";

interface SwitchProps {
  value: boolean;
  // on peut donner SetValue OU BIEN onToggleSwitch
  setValue?: (newValue: boolean) => void;
  onToggleSwitch?: () => void;
  disabled?: boolean;
  switchLabel: string;
  style?: StyleProp<ViewStyle>;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  setValue,
  onToggleSwitch,
  disabled = false,
  switchLabel,
  style
}) => {
  const theme = useThemeStore((state) => state.theme);

  const handleToggle = useCallback(() => {
    if (onToggleSwitch) {
      onToggleSwitch();
    } else if (setValue) {
      setValue(!value);
    }
  }, [onToggleSwitch, setValue, value]);

  const textStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  return (
    <Pressable onPress={handleToggle} style={[styles.switchContainer, style]}>
      <NativeSwitch value={value} onValueChange={handleToggle} disabled={disabled} style={{ height: 30 }} />
      <Text style={textStyle}>{translate(switchLabel)}</Text>
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
