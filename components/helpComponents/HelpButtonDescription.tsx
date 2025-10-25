import React from "react";
import { StyleSheet, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import IconContainer from "@/primitiveComponents/IconContainer";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

interface HelpButtonDescriptionProps {
  iconName: string;
  iconType: IconType;
  containerSize?: number;
  description: string;
  namespace: string;
}

const HelpButtonDescription = ({
  iconName,
  iconType,
  containerSize = BUTTON_SIZE,
  description,
  namespace,
}: HelpButtonDescriptionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconContainer
          iconName={iconName}
          iconType={iconType}
          containerSize={containerSize}
          containerStyle={{ borderRadius: BORDER_RADIUS_INF }}
        />
      </View>

      <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
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
});

export default HelpButtonDescription;
