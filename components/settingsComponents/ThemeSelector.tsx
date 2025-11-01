import React from "react";
import Picker from "../Picker";
import useThemeStore, { ThemeMode } from "@/stores/useThemeStore";

const themeList: { label: string; value: ThemeMode }[] = [
  { label: "dark", value: "dark" },
  { label: "light", value: "light" },
  { label: "system", value: "system" },
];

const ThemeSelector = () => {
  const themeMode = useThemeStore((state) => state.themeMode);
  const setTheme = useThemeStore((state) => state.setTheme);

  return <Picker value={themeMode} setValue={setTheme} itemList={themeList} pickerTitle="theme" namespace="theme" />;
};

export default React.memo(ThemeSelector);
