import React, { useMemo } from "react";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { View, StyleSheet, Platform } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import { useTranslation } from "react-i18next";
import Text from "@/primitiveComponents/Text";
import { BORDER_RADIUS_STANDARD } from "@/utils/designTokens";
import { typography } from "./styles/typography";

type PickerItem = {
  label: string; // clé de traduction (ex. "settings.language.english")
  value: string;
};

interface PickerProps {
  value: string;
  setValue: (value: string | number) => void;
  itemList: PickerItem[];
  pickerTitle: string; // clé de traduction (ex. "settings.language.title")
  namespace: string;
}

const Picker: React.FC<PickerProps> = ({ value, setValue, itemList, pickerTitle, namespace }) => {
  const theme = useThemeStore((state) => state.theme);

  const { t } = useTranslation(namespace);

  const transformedItems = useMemo(() => {
    return itemList.map((item) => (
      <NativePicker.Item
        key={item.value}
        label={t(item.label)} // traduction directe
        value={item.value}
      />
    ));
  }, [itemList, t]);

  return (
    <View>
      <Text role="title" size="small" weight="semibold" style={styles.title} namespace="text">
        {pickerTitle}
      </Text>

      <View style={[styles.pickerWrapper, { backgroundColor: theme.surface, borderColor: theme.outline }]}>
        <NativePicker
          selectedValue={value}
          onValueChange={setValue}
          style={[styles.pickerInput, { color: theme.on_surface }]}
          itemStyle={Platform.OS === "ios" ? { color: theme.on_surface } : undefined}
          mode="dropdown"
          dropdownIconColor={Platform.OS === "android" ? "transparent" : undefined}
        >
          {transformedItems}
        </NativePicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default React.memo(Picker);
