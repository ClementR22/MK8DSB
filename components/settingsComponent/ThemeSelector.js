import React from "react";
import Picker from "../Picker";
import { useThemeStore, themeList } from "@/stores/useThemeStore";

const ThemeSelector = React.memo(() => {
  const themeMode = useThemeStore((state) => state.themeMode);
  const setTheme = useThemeStore((state) => state.setTheme);

  return <Picker value={themeMode} setValue={setTheme} itemList={themeList} pickerTitle="Theme" />;
});

export default ThemeSelector;
