import React, { useEffect, useState } from "react";
import Picker from "../Picker";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { LanguageMode, useLanguage } from "@/hooks/useLanguage";

export const languageList: { label: string; value: LanguageMode }[] = [
  { label: "english", value: "en" },
  { label: "french", value: "fr" },
  { label: "system", value: "system" },
];

const LanguageSelector = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const [languageMode, setLanguageMode_] = useState<LanguageMode>(selectedLanguage);
  const setLanguageMode = (newLanguageMode: LanguageMode) => {
    changeLanguage(newLanguageMode);
    saveThingInMemory("language", newLanguageMode);
  };

  useEffect(() => setLanguageMode_(selectedLanguage), [selectedLanguage]);

  return (
    <Picker
      value={languageMode}
      setValue={setLanguageMode}
      itemList={languageList}
      pickerTitle="language"
      namespace="language"
    />
  );
};

export default React.memo(LanguageSelector);
