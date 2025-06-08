import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/primitiveComponents/Text";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { translate } from "@/translations/translations";

const CustomHeader = ({ children, icon = "car-sports", helpComponent }) => {
  const theme = useThemeStore((state) => state.theme);

  const styles = useMemo(() =>
    StyleSheet.create({
      container: {
        backgroundColor: theme.surface_container,
        height: 64,
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
        elevation: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingEnd: 15,
      },
      icon: {
        width: 48,
        height: 48,
        padding: 12,
        marginHorizontal: 4,
      },
      text: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
      },
    })
  );

  function getIconType() {
    if (icon in MaterialCommunityIcons.glyphMap) return IconType.MaterialCommunityIcons;
    if (icon in MaterialIcons.glyphMap) return IconType.MaterialIcons;
  }

  const iconType = useMemo(() => getIconType(icon));

  return (
    <View style={styles.container}>
      <Icon type={iconType} name={icon} size={24} color={theme.on_surface} style={styles.icon} />
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Text style={styles.text}>{translate(children)}</Text>
      </View>

      {helpComponent}
    </View>
  );
};

export default React.memo(CustomHeader);
