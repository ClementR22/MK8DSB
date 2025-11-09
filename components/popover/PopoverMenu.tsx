import useThemeStore from "@/stores/useThemeStore";
import React from "react";
import { StyleSheet } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import PopoverMenuItem from "./PopoverMenuItem";
import { ActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { t } from "i18next";
import { BUTTON_SIZE } from "@/utils/designTokens";

interface PopoverMenuProps {
  trigger: React.ReactElement;
  actionIconPropsList?: ActionIconPropsList;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ trigger, actionIconPropsList }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Menu>
      <MenuTrigger>{trigger}</MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: [styles.menuContainerList, { backgroundColor: theme.surface_container }],
        }}
      >
        {actionIconPropsList.map((actionProps) => {
          const { title, name, type, onPress } = actionProps;
          return <PopoverMenuItem key={title} onPress={onPress} title={t(title)} iconProps={{ name, type }} />;
        })}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContainerList: {
    borderRadius: 4,
    paddingVertical: 4,
    width: 166,
    marginTop: BUTTON_SIZE,
  },
});

export default PopoverMenu;
