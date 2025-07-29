import React, { useMemo } from "react";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { translate, translateToLanguage } from "@/translations/translations";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Icon from "react-native-vector-icons/MaterialIcons"; // Assure-toi d’avoir installé react-native-vector-icons

interface PickerItem {
  label: string;
  value: string;
}

interface PickerProps {
  value: string;
  setValue: (value: string | number) => void;
  itemList: PickerItem[];
  pickerTitle: string;
}

const Picker: React.FC<PickerProps> = ({ value, setValue, itemList, pickerTitle }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const transformedItems = useMemo(() => {
    return itemList.map((item) => (
      <NativePicker.Item key={item.value} label={translateToLanguage(item.label, language)} value={item.value} />
    ));
  }, [itemList, language]);

  const iosItemStyle = useMemo(() => {
    return { color: theme.on_surface };
  }, [theme.on_surface]);

  return (
    <View style={styles.container}>
      <Text style={StyleSheet.flatten([styles.title, { color: theme.on_surface }])}>{translate(pickerTitle)}</Text>

      <View style={[styles.pickerWrapper, { backgroundColor: theme.surface, borderColor: theme.outline }]}>
        <NativePicker
          selectedValue={value}
          onValueChange={(itemValue) => {
            setValue(itemValue);
          }}
          style={[styles.pickerInput, { color: theme.on_surface }]}
          itemStyle={Platform.OS === "ios" ? iosItemStyle : undefined}
          mode="dropdown"
          dropdownIconColor={Platform.OS === "android" ? "transparent" : undefined} // masque l'icône native sur Android
        >
          {transformedItems}
        </NativePicker>

        {/* Custom chevron icon */}
        <Icon name="arrow-drop-down" size={24} color={theme.on_surface} style={styles.chevronIcon} />
      </View>
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
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    position: "relative",
    justifyContent: "center",
  },
  pickerInput: {
    fontSize: 16,
    paddingHorizontal: 10,
    minHeight: 40,
    width: "100%",
  },
  chevronIcon: {
    position: "absolute",
    right: 10,
    pointerEvents: "none",
  },
});

export default Picker;
