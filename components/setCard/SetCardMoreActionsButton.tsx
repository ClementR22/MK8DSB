import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { actionNamesList } from "./SetCard";
import { ScreenName } from "@/contexts/ScreenContext";

interface SetCardMoreActionsButtonProps {
  moreActionNamesList: actionNamesList;
  setCardIndex: number;
  situation: ScreenName | "load";
}

const SetCardMoreActionsButton: React.FC<SetCardMoreActionsButtonProps> = ({
  moreActionNamesList,
  setCardIndex,
  situation,
}) => {
  const [visible, setVisible] = useState(false);

  const actionIconPropsList = useActionIconPropsList(moreActionNamesList, setCardIndex, situation);

  const handleMenuItemPress = (onPressAction: () => void) => {
    setVisible(false);
    onPressAction();
  };

  return (
    <View>
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
    </View>
  );
};

export default React.memo(SetCardMoreActionsButton);
