import React from "react";
import { FlatList, Pressable, View, Linking, StyleSheet } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import { licensesLinks } from "@/data/licensesLinks";
import Text from "@/primitiveComponents/Text";
import { vh } from "../styles/theme";

const ButtonLicenses = () => {
  return (
    <ButtonAndModal modalTitle="Licenses" triggerButtonText="OpenSourceLicenses">
      <FlatList
        data={Object.entries(licensesLinks)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const [licenseName, licenseUrl] = item;
          return (
            <Pressable onPress={() => Linking.openURL(licenseUrl)} style={styles.licenseItem}>
              <Text role="title" size="small" color="blue">
                {licenseName}
              </Text>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.flatListContainer}
        style={{
          marginVertical: 10,
        }}
      />
    </ButtonAndModal>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    alignSelf: "center",
    width: "90%", // Cette propriété assure que la FlatList prend toute la largeur disponible
    height: vh * 0.5,
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
