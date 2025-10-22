import React from "react";
import { Pressable, Linking, StyleSheet, ScrollView } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import { licensesLinks } from "@/data/licensesLinks";
import Text from "@/primitiveComponents/Text";
import { vh } from "../styles/theme";

const ButtonLicenses = () => {
  return (
    <ButtonAndModal modalTitle="licenses" triggerButtonText="openSourceLicenses">
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
            <Pressable key={index} onPress={() => Linking.openURL(licenseUrl)} style={styles.licenseItem}>
              <Text role="title" size="small" color="blue" namespace="not">
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
// npx license-checker --production --json > licenses-summary.json

export default React.memo(ButtonLicenses);
