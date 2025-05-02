import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useLanguage } from "../i18n/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Picker
      selectedValue={language}
      onValueChange={(itemValue) => setLanguage(itemValue)}
      style={{
        fontSize: 24,
        fontWeight: "bold",
        paddingHorizontal: 10,
        borderRadius: 5,
      }}
    >
      <Picker.Item label="Francais" value="fr" />
      <Picker.Item label="English" value="en" />
    </Picker>
  );
};

export default LanguageSelector;
