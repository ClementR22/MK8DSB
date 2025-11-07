import React from "react";
import { StyleSheet } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { BORDER_RADIUS_STANDARD, GAP_SORT_MODE_SELECTOR } from "@/utils/designTokens";
import { renderers } from "react-native-popup-menu";

interface PopoverProps {
  trigger: React.ReactElement;
  children?: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ trigger, children }) => {
  return (
    <Menu renderer={renderers.Popover} rendererProps={{ placement: "bottom" }}>
      <MenuTrigger>{trigger}</MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: { borderRadius: BORDER_RADIUS_STANDARD },
          optionsWrapper: styles.menuContainer,
        }}
      >
        {children}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContainerList: {
    borderRadius: 4,
    paddingVertical: 4,
    width: 166,
  },

  menuContainer: {
    flexDirection: "row",
    padding: GAP_SORT_MODE_SELECTOR,
    gap: GAP_SORT_MODE_SELECTOR,
    borderRadius: BORDER_RADIUS_STANDARD,
  },
});

export default Popover;
