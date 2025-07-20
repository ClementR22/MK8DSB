import ButtonIcon, { ButtonIconProps } from "@/primitiveComponents/ButtonIcon";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { memo } from "react";
import { View, ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

interface ButtonIconSortProps extends ButtonIconProps {
  iconBackgroundColor?: string;
  direction?: "asc" | "desc";
  isBadge?: boolean;
  badgeContainerStyle: ViewStyle;
}

const ButtonIconSort: React.FC<ButtonIconSortProps> = memo(
  ({
    onPress,
    tooltipText,
    iconName,
    iconType,
    iconBackgroundColor,
    direction = "asc",
    isBadge = false,
    badgeContainerStyle,
  }) => {
    const theme = useThemeStore((state) => state.theme);

    const badgeIconName = direction === "asc" ? "arrow-up" : "arrow-down";
    const badgeBackgroundColor = theme.primary_container;
    const badgeIconColor = theme.primary;
    const badgeIconInnerSize = 20;

    return (
      <View>
        <ButtonIcon
          onPress={onPress}
          tooltipText={tooltipText}
          iconName={iconName}
          iconType={iconType}
          style={{ backgroundColor: iconBackgroundColor ?? theme.primary }}
        />
        {isBadge && (
          <View style={[badgeContainerStyle, { backgroundColor: badgeBackgroundColor }]}>
            <Icon
              name={badgeIconName}
              type={IconType.MaterialCommunityIcons}
              size={badgeIconInnerSize}
              color={badgeIconColor}
            />
          </View>
        )}
      </View>
    );
  }
);

export default ButtonIconSort;
