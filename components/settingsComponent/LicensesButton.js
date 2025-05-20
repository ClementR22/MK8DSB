import React, { useState } from "react";
import { FlatList, Pressable, Text, View, Linking, StyleSheet } from "react-native";
import { translate } from "@/translations/translations";
import Button from "@/components/Button";
import { Modal } from "react-native-paper";

const LicensesButton = () => {
  const [isLicensesModalVisible, setIsLicensesModalVisible] = useState(false);

  return (
    <Button onPress={() => setIsLicensesModalVisible(true)}>
      <Text>{translate("OpenSourceLicenses")}</Text>
      <Modal
        modalTitle="Licenses"
        isModalVisible={isLicensesModalVisible}
        setIsModalVisible={setIsLicensesModalVisible}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={Object.entries(licensesLinks)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              const [licenseName, licenseUrl] = item;
              return (
                <Pressable onPress={() => Linking.openURL(licenseUrl)}>
                  <View style={styles.licenseItem}>
                    <Text style={styles.licenseName}>{licenseName}</Text>
                  </View>
                </Pressable>
              );
            }}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </Modal>
    </Button>
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

const licensesLinks = {
  "0BSD": "https://opensource.org/licenses/0BSD",
  "Apache-2.0": "https://opensource.org/licenses/Apache-2.0",
  "BSD-2-Clause": "https://opensource.org/licenses/BSD-2-Clause",
  "BSD-3-Clause": "https://opensource.org/licenses/BSD-3-Clause",
  "BlueOak-1.0.0": "https://blueoakcouncil.org/license/1.0.0/",
  "CC-BY-3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC-BY-4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC0-1.0": "https://creativecommons.org/publicdomain/zero/1.0/",
  ISC: "https://opensource.org/licenses/ISC",
  MIT: "https://opensource.org/licenses/MIT",
  "MPL-2.0": "https://opensource.org/licenses/MPL-2.0",
  "Python-2.0": "https://opensource.org/licenses/Python-2.0",
  Unlicense: "https://unlicense.org/",
};

// pour obtenir toutes les licences
// npx license-checker --production --json > licenses-summary.json

export default LicensesButton;
