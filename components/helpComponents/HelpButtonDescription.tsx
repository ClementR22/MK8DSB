import React from "react";
import { StyleSheet, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import IconContainer from "@/primitiveComponents/IconContainer";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

interface HelpButtonDescriptionProps {
  iconName: string;
  iconType: IconType;
  description: string;
  namespace: string;
}

const HelpButtonDescription = ({ iconName, iconType, description, namespace }: HelpButtonDescriptionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconContainer iconName={iconName} iconType={iconType} />
      </View>

      <View style={styles.description}>
        <Text role="body" size="large" namespace={namespace}>
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
    alignSelf: "flex-start",
    alignItems: "center",
  },
  iconWrapper: { width: BUTTON_SIZE, alignItems: "center" },
  description: { flex: 1, gap: 10, justifyContent: "center" },
});

export default HelpButtonDescription;
