import React from "react";
import { FlatList, Pressable, Text, View, Linking, StyleSheet } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import { licensesLinks } from "@/data/licensesLinks";

const ButtonLicenses = () => {
  return (
    <ButtonAndModal modalTitle="Licenses" triggerButtonText="OpenSourceLicenses">
      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={Object.entries(licensesLinks)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            const [licenseName, licenseUrl] = item;
            return (
              <Pressable onPress={() => Linking.openURL(licenseUrl)} style={{ paddingHorizontal: 20 }}>
                <View style={styles.licenseItem}>
                  <Text style={styles.licenseName}>{licenseName}</Text>
                </View>
              </Pressable>
            );
          }}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </ButtonAndModal>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%", // Cette propriété assure que la FlatList prend toute la largeur disponible
  },
  licenseItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  licenseName: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
});

// pour obtenir toutes les licences
// npx license-checker --production --json > licenses-summary.json

export default React.memo(ButtonLicenses);
