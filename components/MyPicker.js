import React from "react";
import { Picker } from "@react-native-picker/picker";
import { translate } from "@/translations/translations";
import { Text, View } from "react-native";

const MyPicker = ({ value, setValue, itemList, pickerTitle, isTranslatedContent }) => {
  return (
    <View>
      <Text>{translate(pickerTitle)}</Text>
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
        }}
      >
        {itemList.map(({ label, value }) => (
          <Picker.Item key={value} label={isTranslatedContent ? translate(label) : label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export default MyPicker;
