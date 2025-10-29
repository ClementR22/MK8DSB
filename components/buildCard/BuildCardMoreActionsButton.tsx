import React, { useState, useCallback } from "react";
import { Menu } from "react-native-paper";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { ActionNamesList } from "@/hooks/useBuildCardConfig";
import { ScreenName } from "@/contexts/ScreenContext";
import { useTranslation } from "react-i18next";

interface BuildCardMoreActionsButtonProps {
  moreActionNamesList: ActionNamesList;
  id: string;
  screenName: ScreenName;
}

const BuildCardMoreActionsButton: React.FC<BuildCardMoreActionsButtonProps> = ({
  moreActionNamesList,
  id,
  screenName,
}) => {
  const { t } = useTranslation("button");

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
          tooltipText={"moreActions"}
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
            title={t(title)}
            leadingIcon={({ color, size }) => <Icon type={type} name={name} size={size} color={color || "black"} />}
          />
        );
      })}
    </Menu>
  );
};

export default React.memo(BuildCardMoreActionsButton);
