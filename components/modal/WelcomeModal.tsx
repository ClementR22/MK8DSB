// WelcomeModal.tsx
import React, { useEffect, useState } from "react";
import Modal from "@/primitiveComponents/Modal";
import Text from "@/primitiveComponents/Text";
import useGeneralStore from "@/stores/useGeneralStore";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

const WelcomeModal = () => {
  const { ready } = useTranslation();
  const isWelcome = useGeneralStore((state) => state.isWelcome);
  const welcomeMessage = useGeneralStore((state) => state.welcomeMessage);
  const hideWelcome = useGeneralStore((state) => state.hideWelcome);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => setIsModalVisible(isWelcome && ready), [isWelcome, ready]);

  if (!ready) {
    return null;
  }

  return (
    <Modal
      modalTitle="welcome"
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      onClose={hideWelcome}
    >
      <View style={styles.container}>
        <Text role="body" size="large" textAlign="center" namespace="text">
          {welcomeMessage || "welcomeText"}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, padding: 10, alignItems: "center" },
});

export default WelcomeModal;
