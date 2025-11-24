import React from "react";
import Picker from "../Picker";
import useLanguageStore, { LanguageMode } from "@/stores/useLanguageStore";

export const languageList: { label: string; value: LanguageMode }[] = [
  { label: "english", value: "en" },
  { label: "french", value: "fr" },
  { label: "system", value: "system" },
];

const LanguageSelector = () => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return (
    <Picker
      value={language}
      setValue={setLanguage}
      itemList={languageList}
      pickerTitle="language"
      namespace="language"
    />
  );
};

export default React.memo(LanguageSelector);
