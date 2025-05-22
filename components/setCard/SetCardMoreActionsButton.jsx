import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Menu } from "react-native-paper";
import { getActionIconPropsList } from "@/utils/getActionIconPropsList";
import Icon from "react-native-dynamic-vector-icons";

const SetCardMoreActionsButton = React.memo(({ moreActionNamesList, setCardIndex, situation }) => {
  const [visible, setVisble] = useState(false);

  const actionIconPropsList = getActionIconPropsList(setCardIndex, situation);

  return (
    <View style={{ position: "absolute", left: 0, top: 0, backgroundColor: "red" }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisble(false)}
        anchor={
          <Pressable
            onPress={() => {
              setVisble(true);
            }}
          >
            <MaterialIcons name="more-vert" size={24} />
          </Pressable>
        }
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
