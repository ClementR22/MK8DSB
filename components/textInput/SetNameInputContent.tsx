import { useThemeStore } from "@/stores/useThemeStore";
import React, { useMemo } from "react";
import { StyleSheet, TextInput, View } from "react-native";

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
      backgroundColor: theme.surface_container,
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TextInput
        style={StyleSheet.flatten([styles.textInput, textDynamicStyle])}
        value={value}
        onChangeText={onChangeText}
        onBlur={onEndEditing}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    height: 35,
    paddingLeft: 10,
    borderRadius: 7,
  },
});

export default React.memo(SetNameInputContent);
