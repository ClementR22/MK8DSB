import React from "react";
import { StyleSheet, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import IconContainer from "@/primitiveComponents/IconContainer";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";
import Tooltip from "../Tooltip";

interface HelpButtonDescriptionProps {
  iconName: string;
  iconType: IconType;
  description: string;
  namespaceDescription: string;
  tooltipText: string;
  namespaceTooltipText?: string;
}

const HelpButtonDescription = ({
  iconName,
  iconType,
  description,
  namespaceDescription,
  tooltipText,
  namespaceTooltipText,
}: HelpButtonDescriptionProps) => {
  return (
    <View style={styles.container}>
      <Tooltip tooltipText={tooltipText} namespace={namespaceTooltipText}>
        <IconContainer iconName={iconName} iconType={iconType} />
      </Tooltip>

      <View style={styles.description}>
        <Text role="body" size="large" namespace={namespaceDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  description: { flex: 1 },
});

export default HelpButtonDescription;
