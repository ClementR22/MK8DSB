import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Menu, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import { BORDER_RADIUS_STANDARD, GAP_SORT_MODE_SELECTOR } from "@/utils/designTokens";
import useThemeStore from "@/stores/useThemeStore";

interface PopoverProps {
  trigger: (openPopover: () => void) => React.ReactNode;
  children?: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ trigger, children }) => {
  const theme = useThemeStore((state) => state.theme);

  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  const backgroundColor = theme.isDark ? theme.surface_variant : undefined; // undefined = valeur par défaut

  return (
    <Menu
      opened={isOpen}
      onBackdropPress={closePopover}
      renderer={renderers.Popover}
      rendererProps={{ placement: "bottom", anchorStyle: { backgroundColor: backgroundColor } }}
    >
      <MenuTrigger>{trigger(openPopover)}</MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: BORDER_RADIUS_STANDARD,
            backgroundColor: backgroundColor,
          },
          optionsWrapper: styles.menuContainer,
        }}
      >
        {children}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    padding: GAP_SORT_MODE_SELECTOR,
    gap: GAP_SORT_MODE_SELECTOR,
    borderRadius: BORDER_RADIUS_STANDARD,
  },
});

export default React.memo(Popover);
