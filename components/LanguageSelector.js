import React from "react";
import { useLanguage, languageList } from "../i18n/LanguageContext";
import MyPicker from "./MyPicker";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <MyPicker
      value={language}
      setValue={setLanguage}
      itemList={languageList}
      isTranslateLabel={false}
    />
  );
};

export default LanguageSelector;
