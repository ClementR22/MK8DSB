import React from "react";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { ActionNamesList } from "@/hooks/useBuildCardConfig";
import { ScreenName } from "@/contexts/ScreenContext";
import { useTranslation } from "react-i18next";
import PopoverMenu from "../PopoverMenu";
import PopoverMenuItem from "../PopoverMenuItem";
import { StyleSheet } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import { Placement } from "react-native-popover-view/dist/Types";

interface BuildCardMoreActionsButtonProps {
  moreActionNamesList: ActionNamesList;
  buildDataId: string;
  screenName: ScreenName;
}

const BuildCardMoreActionsButton: React.FC<BuildCardMoreActionsButtonProps> = ({
  moreActionNamesList,
  buildDataId,
  screenName,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const { t } = useTranslation("button");

  const actionIconPropsList = useActionIconPropsList(moreActionNamesList, screenName, false, buildDataId);

  return (
    <PopoverMenu
      trigger={(openMenu) => (
        <ButtonIcon
          onPress={() => {
            openMenu();
          }}
          tooltipText={"moreActions"}
          iconName={"more-vert"}
          iconType={IconType.MaterialIcons}
        />
      )}
      placement={Placement.BOTTOM}
      isHideArrow
      style={[styles.menuContainer, { backgroundColor: theme.surface_container }]}
    >
      {(closeMenu) =>
        actionIconPropsList.map((actionProps) => {
          const { title, name, type, onPress } = actionProps;
          return (
            <PopoverMenuItem
              key={name}
              onPress={() => {
                closeMenu();
                onPress();
              }}
              title={t(title)}
              iconProps={{ name: name, type: type }}
            />
          );
        })
      }
    </PopoverMenu>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    borderRadius: 4,
    paddingVertical: 4,
  },
});

export default React.memo(BuildCardMoreActionsButton);
