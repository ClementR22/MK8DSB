import React from "react";
import Picker from "../Picker";
import { useLanguageStore, languageList } from "@/stores/useLanguageStore";

const LanguageSelector = () => {
  const languageMode = useLanguageStore((state) => state.languageMode);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return <Picker value={languageMode} setValue={setLanguage} itemList={languageList} pickerTitle="Language" />;
};

export default LanguageSelector;
