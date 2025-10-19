import React, { useState, useCallback } from "react";
import { Menu } from "react-native-paper";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { ActionNamesList } from "@/hooks/useSetCardConfig";
import { ScreenName } from "@/contexts/ScreenContext";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface SetCardMoreActionsButtonProps {
  moreActionNamesList: ActionNamesList;
  id: string;
  screenName: ScreenName;
}

const SetCardMoreActionsButton: React.FC<SetCardMoreActionsButtonProps> = ({ moreActionNamesList, id, screenName }) => {
  const language = useLanguageStore((state) => state.language);

  const [visible, setVisible] = useState(false);

  const actionIconPropsList = useActionIconPropsList(moreActionNamesList, screenName, false, id);

  // Mémoïsation du handler pour éviter de recréer la fonction à chaque render
  const handleMenuItemPress = useCallback((onPressAction: () => void) => {
    setVisible(false);
    onPressAction();
  }, []);

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
    >
      {actionIconPropsList.map((actionProps) => {
        const { title, name, type, onPress } = actionProps;
        return (
          <Menu.Item
            key={name}
            onPress={() => handleMenuItemPress(onPress)}
            title={translateToLanguage(title, language)}
            leadingIcon={({ color, size }) => <Icon type={type} name={name} size={size} color={color || "black"} />}
          />
        );
      })}
    </Menu>
  );
};

export default React.memo(SetCardMoreActionsButton);
