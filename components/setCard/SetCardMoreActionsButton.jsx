import React, { useState } from "react";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import { getActionIconPropsList } from "@/utils/getActionIconPropsList";
import Icon from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";

const SetCardMoreActionsButton = React.memo(({ moreActionNamesList, setCardIndex, situation }) => {
  const [visible, setVisble] = useState(false);
  const actionIconPropsList = getActionIconPropsList(setCardIndex, situation);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisble(false)}
        anchor={
          <ButtonIcon
            onPress={() => setVisble(true)}
            tooltipText={"MoreActions"}
            iconName={"more-vert"}
            iconType={"MaterialIcons"}
          />
        }
        anchorPosition="bottom"
      >
        {moreActionNamesList.map((actionName) => {
          const { title, name, type, onPress } = actionIconPropsList[actionName];
          return (
            <Menu.Item
              key={actionName}
              onPress={() => {
                setVisble(false);
                onPress();
              }}
              title={title}
              leadingIcon={({ color, size }) => <Icon type={type} name={name} size={24} color="black" />}
            />
          );
        })}
      </Menu>
    </View>
  );
});

export default SetCardMoreActionsButton;
