import React from "react";
import { useTheme, themeList } from "../contexts/ThemeContext";
import MyPicker from "./MyPicker";

const ThemeSelector = () => {
  const { setTheme, themeValue } = useTheme();

  return (
    <MyPicker
      value={themeValue}
      setValue={setTheme}
      itemList={themeList}
      isTranslateLabel={true}
    />
  );
};

export default ThemeSelector;
