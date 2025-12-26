import React, { useEffect, useState } from "react";
import Modal from "@/primitiveComponents/Modal";
import Text from "@/primitiveComponents/Text";
import useGeneralStore from "@/stores/useGeneralStore";
import { StyleSheet, View } from "react-native";
import Button from "@/primitiveComponents/Button";

const IntroModal = () => {
  const isIntro = useGeneralStore((state) => state.isIntro);
  const hideIntro = useGeneralStore((state) => state.hideIntro);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => setIsModalVisible(isIntro), [isIntro]);

  return (
    <Modal modalTitle="welcome" isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
      <View style={styles.container}>
        <Text role="body" size="large" textAlign="center" namespace="text">
          introText
        </Text>

        <Button tooltipText="thisIsAnExample">longPress</Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, padding: 10 },
});

export default IntroModal;
