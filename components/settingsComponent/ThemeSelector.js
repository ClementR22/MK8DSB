import React from "react";
import Picker from "../Picker";
import { useThemeStore, themeList } from "@/stores/useThemeStore";

const ThemeSelector = () => {
  const themeLabel = useThemeStore((state) => state.themeLabel);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <Picker
      value={themeLabel}
      setValue={setTheme}
      itemList={themeList}
      pickerTitle="Theme"
      isTranslatedContent={true}
    />
  );
};

export default ThemeSelector;
