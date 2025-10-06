import React, { useMemo } from "react";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { translate, translateToLanguage } from "@/translations/translations";
import { View, StyleSheet, Platform } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import Icon from "react-native-vector-icons/MaterialIcons"; // Assure-toi d’avoir installé react-native-vector-icons
import { BORDER_RADIUS_STANDARD } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";
import { typography } from "./styles/typography";

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

  return (
    <View style={styles.container}>
      <Text role="title" size="small" style={styles.title}>
        {translate(pickerTitle)}
      </Text>

      <View style={[styles.pickerWrapper, { backgroundColor: theme.surface, borderColor: theme.outline }]}>
        <NativePicker
          selectedValue={value}
          onValueChange={(itemValue) => {
            setValue(itemValue);
          }}
          style={[styles.pickerInput, { color: theme.on_surface }]}
          itemStyle={Platform.OS === "ios" ? { color: theme.on_surface } : undefined}
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
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS_STANDARD,
    position: "relative",
    justifyContent: "center",
  },
  pickerInput: {
    fontSize: typography.title.small.fontSize,
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
