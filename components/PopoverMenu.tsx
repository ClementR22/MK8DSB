// components/PopoverMenu.tsx
import React, { ReactElement } from "react";
import { View, ViewStyle } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";

type TriggerCallback = (openMenu: () => void) => React.ReactElement;
type ChildrenCallback = (closeMenu: () => void) => React.ReactNode;

interface TooltipMenuProps {
  trigger: TriggerCallback | ReactElement;
  placement?: Placement;
  isHideArrow?: boolean;
  isAlignRight?: boolean;
  style: ViewStyle | ViewStyle[];
  children: ChildrenCallback | React.ReactNode;
}

const PopoverMenu: React.FC<TooltipMenuProps> = ({
  trigger,
  placement = PopoverPlacement.AUTO,
  isHideArrow = false,
  isAlignRight = false,
  style,
  children,
}) => {
  const [showPopover, setShowPopover] = React.useState(false);
  const triggerRef = React.useRef(null);

  const openMenu = () => setShowPopover(true);
  const closeMenu = () => setShowPopover(false);

  const triggerElement = typeof trigger === "function" ? trigger(openMenu) : trigger;
  const triggerChildren = typeof children === "function" ? children(closeMenu) : children;

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
        popoverStyle={style}
        arrowSize={isHideArrow && { width: 0, height: 0 }}
      >
        {triggerChildren}
      </Popover>
    </>
  );
};

export default PopoverMenu;
