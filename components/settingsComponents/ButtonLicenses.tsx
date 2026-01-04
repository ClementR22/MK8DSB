import React from "react";
import { StyleSheet, View } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";
import useThemeStore from "@/stores/useThemeStore";
import licenses from "@/assets/licenses.cleaned.json";
import { ScrollView } from "react-native-gesture-handler";
import { vh } from "../styles/theme";
import Text from "@/primitiveComponents/Text";
import Separator from "../Separator";
import { PADDING_BOX_CONTAINER } from "@/utils/designTokens";

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
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
        {Object.entries(licenses).map(([packageName, data]: any) => (
          <>
            <Text role="label" size="large" namespace="not">
              {packageName}
            </Text>
            <Text role="body" size="large" namespace="not">
              {data.licenseText}
            </Text>

            <Separator direction="horizontal" wrapperStyle={{ marginVertical: 10 }} />
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
