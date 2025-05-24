import React from "react";
import { Picker } from "@react-native-picker/picker";
import { translate } from "@/translations/translations";
import { Text, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const MyPicker = ({ value, setValue, itemList, pickerTitle, isTranslatedContent }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View>
      <Text style={{ color: theme.on_surface }}>{translate(pickerTitle)}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          setValue(itemValue);
        }}
        style={{
          fontSize: 24,
          fontWeight: "bold",
          paddingHorizontal: 10,
          borderRadius: 5,
          backgroundColor: theme.surface,
          color: theme.on_surface,
        }}
        itemStyle={{ color: theme.on_surface }}
      >
        {itemList.map(({ label, value }) => (
          <Picker.Item key={value} label={isTranslatedContent ? translate(label) : label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export default MyPicker;
