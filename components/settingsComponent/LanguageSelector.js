import React from "react";
import MyPicker from "../MyPicker";
import { useLanguageStore, languageList } from "@/stores/useLanguageStore";

const LanguageSelector = () => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return (
    <MyPicker
      value={language}
      setValue={setLanguage}
      itemList={languageList}
      pickerTitle="Language"
      isTranslatedContent={false}
    />
  );
};

export default LanguageSelector;
