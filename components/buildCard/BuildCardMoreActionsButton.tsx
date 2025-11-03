import React, { useState, useCallback } from "react";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { ActionNamesList } from "@/hooks/useBuildCardConfig";
import { ScreenName } from "@/contexts/ScreenContext";
import { useTranslation } from "react-i18next";
import PopoverMenu from "../PopoverMenu";
import PopoverMenuItem from "../PopoverMenuItem";
import { StyleSheet, View } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import { Placement } from "react-native-popover-view/dist/Types";
import { useBuildCardsScroll } from "@/contexts/BuildCardsScrollContext";

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
  const theme = useThemeStore((state) => state.theme);
  const { t } = useTranslation("button");

  const { scrollToBuildCard } = useBuildCardsScroll();

  const actionIconPropsList = useActionIconPropsList(moreActionNamesList, screenName, false, id);

  return (
    <PopoverMenu
      trigger={(openMenu) => (
        <ButtonIcon
          onPress={() => {
            scrollToBuildCard(id);
            openMenu();
          }}
          tooltipText={"moreActions"}
          iconName={"more-vert"}
          iconType={IconType.MaterialIcons}
        />
      )}
      placement={Placement.BOTTOM}
      isHideArrow
      isAlignRight
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
