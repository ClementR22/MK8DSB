import React, { useMemo } from "react";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { translate, translateToLanguage } from "@/translations/translations";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface PickerItem {
  label: string;
  value: string;
}

interface PickerProps {
  value: string;
  setValue: (value: string | number) => void;
  itemList: PickerItem[];
  pickerTitle: string;
  isTranslatedContent?: boolean;
}

const Picker: React.FC<PickerProps> = ({ value, setValue, itemList, pickerTitle, isTranslatedContent = false }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const transformedItems = useMemo(() => {
    return itemList.map((item) => (
      <NativePicker.Item
        key={item.value}
        label={isTranslatedContent ? translateToLanguage(item.label, language) : item.label}
        value={item.value}
      />
    ));
  }, [itemList, isTranslatedContent, language, theme]);

  const pickerInputDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface,
      color: theme.on_surface,
    }),
    [theme.surface, theme.on_surface]
  );

  const iosItemStyle = useMemo(() => {
    return { color: theme.on_surface };
  }, [theme.on_surface]);

  return (
    <View style={styles.container}>
      <Text style={StyleSheet.flatten([styles.title, { color: theme.on_surface }])}>{translate(pickerTitle)}</Text>
      <NativePicker
        selectedValue={value}
        onValueChange={(itemValue) => {
          setValue(itemValue);
        }}
        style={StyleSheet.flatten([styles.pickerInput, pickerInputDynamicStyle])}
        itemStyle={Platform.OS === "ios" ? iosItemStyle : undefined}
        mode="dropdown"
      >
        {transformedItems}
      </NativePicker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  pickerInput: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    minHeight: 40,
  },
});

export default Picker;
