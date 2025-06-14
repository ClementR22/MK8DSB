import React from "react";
import Picker from "../Picker";
import { useLanguageStore, languageList } from "@/stores/useLanguageStore";

const LanguageSelector = () => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return (
    <Picker
      value={language}
      setValue={setLanguage}
      itemList={languageList}
      pickerTitle="Language"
      isTranslatedContent={false}
    />
  );
};

export default LanguageSelector;
