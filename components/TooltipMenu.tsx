// components/TooltipMenu.tsx
import React, { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";

type TriggerCallback = (openMenu: () => void) => React.ReactElement;

interface TooltipMenuProps {
  trigger: TriggerCallback | ReactElement;
  placement?: Placement;
  children: React.ReactNode;
}

const TooltipMenu: React.FC<TooltipMenuProps> = ({ trigger, placement = PopoverPlacement.AUTO, children }) => {
  const [showPopover, setShowPopover] = React.useState(false);
  const triggerRef = React.useRef(null);

  const openMenu = () => setShowPopover(true);

  const triggerElement = typeof trigger === "function" ? trigger(openMenu) : trigger;

  return (
    <>
      <View ref={triggerRef}>{triggerElement}</View>

      <Popover
        mode={PopoverMode.RN_MODAL}
        backgroundStyle={{ backgroundColor: "transparent" }}
        placement={placement}
        isVisible={showPopover}
        from={triggerRef}
        onRequestClose={() => setShowPopover(false)}
      >
        <View style={styles.menuContainer}>{children}</View>
      </Popover>
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
  },
});

export default TooltipMenu;
