import { useThemeStore } from "@/stores/useThemeStore";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { typography } from "../styles/typography";

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: theme.surface_container,
            color: theme.on_surface,
          },
        ]}
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
    fontSize: typography.title.medium.fontSize,
    margin: 0,
    padding: 0,
    height: 35,
    paddingLeft: 10,
    borderRadius: 7,
  },
});

SetNameInputContent.displayName = "SetNameInputContent";

export default React.memo(SetNameInputContent);
