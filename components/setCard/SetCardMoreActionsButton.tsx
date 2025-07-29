import React, { useState, useMemo, useCallback } from "react";
import { Platform } from "react-native";
import { Menu } from "react-native-paper";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { actionNamesList } from "./SetCard";
import { ScreenName } from "@/contexts/ScreenContext";
import useGeneralStore from "@/stores/useGeneralStore";

interface SetCardMoreActionsButtonProps {
  moreActionNamesList: actionNamesList;
  setToShowId: string;
  situation: ScreenName | "load";
}

const SetCardMoreActionsButton: React.FC<SetCardMoreActionsButtonProps> = ({
  moreActionNamesList,
  setToShowId,
  situation,
}) => {
  const [visible, setVisible] = useState(false);

  const actionIconPropsList = useActionIconPropsList(moreActionNamesList, setToShowId, situation);

  // Mémoïsation du handler pour éviter de recréer la fonction à chaque render
  const handleMenuItemPress = useCallback((onPressAction: () => void) => {
    setVisible(false);
    onPressAction();
  }, []);

  const menuVerticalOffset = useGeneralStore((state) => state.statusBarHeight);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <ButtonIcon
          onPress={() => setVisible(true)}
          tooltipText={"MoreActions"}
          iconName={"more-vert"}
          iconType={IconType.MaterialIcons}
        />
      }
      anchorPosition="bottom"
      style={{ marginTop: menuVerticalOffset }}
    >
      {actionIconPropsList.map((actionProps) => {
        const { title, name, type, onPress } = actionProps;
        return (
          <Menu.Item
            key={name}
            onPress={() => handleMenuItemPress(onPress)}
            title={title}
            leadingIcon={({ color, size }) => <Icon type={type} name={name} size={size} color={color || "black"} />}
          />
        );
      })}
    </Menu>
  );
};

export default React.memo(SetCardMoreActionsButton);
