import useThemeStore from "@/stores/useThemeStore";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import PopoverMenuItem from "./PopoverMenuItem";
import { ActionIconProps } from "@/hooks/useActionIconPropsList";
import { t } from "i18next";
import { BUTTON_SIZE } from "@/utils/designTokens";

interface PopoverMenuProps {
  trigger: (openPopover: () => void) => React.ReactNode;
  actionIconPropsList?: ActionIconProps[];
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ trigger, actionIconPropsList }) => {
  const theme = useThemeStore((state) => state.theme);

  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  return (
    <Menu opened={isOpen} onBackdropPress={closePopover}>
      <MenuTrigger>{trigger(openPopover)}</MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: [styles.menuContainerList, { backgroundColor: theme.surface_container }],
        }}
      >
        {actionIconPropsList.map((actionProps) => {
          const { title, name, type, onPress } = actionProps;
          return (
            <PopoverMenuItem
              key={title}
              onPress={() => {
                onPress();
                closePopover();
              }}
              title={t(title)}
              iconProps={{ name, type }}
            />
          );
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

export default React.memo(PopoverMenu);
