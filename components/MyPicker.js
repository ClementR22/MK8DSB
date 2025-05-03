import React from "react";
import { Picker } from "@react-native-picker/picker";
import { translate } from "../i18n/translations";

const MyPicker = ({ value, setValue, itemList, isTranslateLabel }) => {
  return (
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
        <Picker.Item
          key={value}
          label={isTranslateLabel ? translate(label) : label}
          value={value}
        />
      ))}
    </Picker>
  );
};

export default MyPicker;
