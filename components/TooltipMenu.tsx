// components/TooltipMenu.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";

interface TooltipMenuProps {
  trigger: React.ReactNode;
  placement?: Placement;
  children: React.ReactNode;
}

const TooltipMenu: React.FC<TooltipMenuProps> = ({ trigger, placement = PopoverPlacement.AUTO, children }) => {
  const [showPopover, setShowPopover] = React.useState(false);
  const triggerRef = React.useRef(null);

  return (
    <>
      <View ref={triggerRef} onTouchEnd={() => setShowPopover(true)}>
        {trigger}
      </View>

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
