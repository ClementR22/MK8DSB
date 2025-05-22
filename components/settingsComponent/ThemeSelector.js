import React from "react";
import { themeList, useTheme } from "@/contexts/ThemeContext";
import MyPicker from "../MyPicker";

const ThemeSelector = () => {
  const { setTheme, themeValue } = useTheme();

  return (
    <MyPicker
      value={themeValue}
      setValue={setTheme}
      itemList={themeList}
      pickerTitle="Theme"
      isTranslatedContent={true}
    />
  );
};

export default ThemeSelector;
