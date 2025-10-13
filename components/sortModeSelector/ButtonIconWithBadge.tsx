import ButtonIcon, { ButtonIconProps } from "@/primitiveComponents/ButtonIcon";
import Text from "@/primitiveComponents/Text";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF } from "@/utils/designTokens";
import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

interface ButtonIconWithBadgeProps extends ButtonIconProps {
  iconBackgroundColor?: string;
  // if the badge content is a number, then give it as badgeText
  badgeText?: string | number;
  // but if the badge content up/down arrow icon, then use direction
  direction?: "asc" | "desc";
  isBadge?: boolean;
}

const ButtonIconWithBadge: React.FC<ButtonIconWithBadgeProps> = memo(
  ({ onPress, tooltipText, iconName, iconType, iconBackgroundColor, badgeText, direction = "asc", isBadge = true }) => {
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
          <View style={[styles.badgeContainer, { backgroundColor: badgeBackgroundColor }]}>
            {badgeText ? (
              <Text role="title" size="small">
                {badgeText}
              </Text>
            ) : (
              <Icon
                name={badgeIconName}
                type={IconType.MaterialCommunityIcons}
                size={badgeIconInnerSize}
                color={badgeIconColor}
              />
            )}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    top: -2,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: BORDER_RADIUS_INF,
    width: 20,
    height: 20,
  },
});

export default ButtonIconWithBadge;
