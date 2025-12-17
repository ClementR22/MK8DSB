import React from "react";
import { Pressable, Linking, StyleSheet, ScrollView } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import { licensesLinks } from "@/constants/licensesLinks";
import Text from "@/primitiveComponents/Text";
import { vh } from "../styles/theme";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";
import useThemeStore from "@/stores/useThemeStore";
import { buttonPressed } from "@/utils/designTokens";

const ButtonLicenses = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonAndModal
      modalTitle="licenses"
      triggerComponent={
        <ButtonSettings
          title="openSourceLicenses"
          iconProps={{ name: "license", type: IconType.MaterialCommunityIcons }}
          tooltipText="openSourceLicenses"
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.flatListContainer}
        style={{
          marginVertical: 10,
          maxHeight: vh * 0.5,
        }}
      >
        {Object.entries(licensesLinks).map((item, index) => {
          const [licenseName, licenseUrl] = item;
          return (
            <Pressable
              key={index}
              onPress={() => Linking.openURL(licenseUrl)}
              style={({ pressed }) => [styles.licenseItem, pressed && buttonPressed]}
            >
              <Text role="title" size="small" color={theme.isLight ? "#1D4ED8" : "#93C5FD"} namespace="not">
                {licenseName}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </ButtonAndModal>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    alignSelf: "center",
    width: "90%",
  },
  licenseItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

// pour obtenir toutes les licences
// npx license-checker --production --relativeLicensePath --json > licenses.json

export default React.memo(ButtonLicenses);
