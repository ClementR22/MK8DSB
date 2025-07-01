import { useThemeStore } from "@/stores/useThemeStore";
import React, { useMemo } from "react";
import { StyleSheet, TextInput } from "react-native";

interface SetNameInputContentProps {
  value: string;
  onChangeText: (text: string) => void;
  onEndEditing: () => void;
  editable?: boolean;
}

const SetNameInputContent: React.FC<SetNameInputContentProps> = ({
  value,
  onChangeText,
  onEndEditing,
  editable = true,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const textDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  return (
    <TextInput
      style={StyleSheet.flatten([styles.textInput, textDynamicStyle])}
      value={value}
      onChangeText={onChangeText}
      onBlur={onEndEditing}
      editable={editable}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    margin: 0,
    padding: 0,
  },
});

export default React.memo(SetNameInputContent);
