import React from "react";
import { StyleSheet } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";
import licenses from "@/assets/licenses.json";
import { ScrollView } from "react-native-gesture-handler";
import { vh } from "../styles/theme";
import Text from "@/primitiveComponents/Text";
import Separator from "../Separator";
import { PADDING_BOX_CONTAINER } from "@/utils/designTokens";

const ButtonLicenses = () => {
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
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
        {Object.entries(licenses).map(([packageName, data]: any) => (
          <>
            <Text role="label" size="large" namespace="not">
              {packageName}
            </Text>
            <Text role="body" size="large" namespace="not">
              {data.licenseText}
            </Text>

            <Separator direction="horizontal" wrapperStyle={styles.separatorWrapper} />
          </>
        ))}
      </ScrollView>
    </ButtonAndModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    padding: PADDING_BOX_CONTAINER,
    paddingTop: 20,
    gap: PADDING_BOX_CONTAINER,
    width: "100%",
  },
  scrollView: {
    maxHeight: vh * 0.75,
  },
  separatorWrapper: { marginVertical: 10 },
});

// pour mettre à jour la liste des licences
// npm run generate:licenses

export default React.memo(ButtonLicenses);
