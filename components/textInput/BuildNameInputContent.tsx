import useThemeStore from "@/stores/useThemeStore";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { typography } from "../styles/typography";

interface BuildNameInputContentProps {
  value: string;
  onChangeText: (text: string) => void;
  onEndEditingOrBlur: () => void;
  editable?: boolean;
  onFocus?: () => void;
  inputRef?: React.RefObject<TextInput>;
}

const BuildNameInputContent: React.FC<BuildNameInputContentProps> = ({
  value,
  onChangeText,
  onEndEditingOrBlur,
  editable = true,
  onFocus,
  inputRef,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TextInput
        ref={inputRef}
        style={[
          styles.textInput,
          {
            backgroundColor: theme.surface_container,
            color: theme.on_surface,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        onFocus={onFocus}
        onBlur={onEndEditingOrBlur}
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

BuildNameInputContent.displayName = "BuildNameInputContent";

export default React.memo(BuildNameInputContent);
