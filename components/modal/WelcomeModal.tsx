// components/modal/WelcomeModal.tsx
import React, { useEffect, useState } from "react";
import Modal from "@/primitiveComponents/Modal";
import Text from "@/primitiveComponents/Text";
import useGeneralStore from "@/stores/useGeneralStore";
import { Image, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import Button from "@/primitiveComponents/Button";
import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import StatGaugeBar from "../statGauge/StatGaugeBar";
import { useGameData } from "@/hooks/useGameData";
import { BUTTON_SIZE } from "@/utils/designTokens";
import Tooltip from "../Tooltip";
import { elementsNamespaceByGame, statsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";

const WelcomeModal = () => {
  const game = useGameStore((state) => state.game);
  const { elementsData, statNames, statNamesCompact } = useGameData();
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
    <Modal modalTitle="welcome" isModalVisible={true} setIsModalVisible={setIsModalVisible} onClose={hideWelcome}>
      <View style={styles.container}>
        <Text role="body" size="large" textAlign="center" namespace="text">
          {welcomeMessage || "welcomeText"}
        </Text>

        <Text role="body" size="large" textAlign="center" namespace="text">
          longPress
        </Text>
      </View>

      <View style={styles.row}>
        <Button tooltipText="thisIsAnExample">button</Button>

        <Tooltip tooltipText={elementsData[0].name} namespace={elementsNamespaceByGame[game]}>
          <Image source={elementsData[0].imageUrl} style={styles.image} resizeMode="contain" />
        </Tooltip>

        <Tooltip tooltipText={statNames[0]} namespace={statsNamespaceByGame[game]}>
          <Text
            role="label"
            size="large"
            style={styles.abbreviation}
            namespace={statsNamespaceByGame[game]}
            textAlign="center"
          >
            {statNamesCompact[statNames[0]]}
          </Text>
        </Tooltip>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, padding: 10, alignItems: "center" },
  row: { flexDirection: "row", width: "100%", justifyContent: "space-evenly", alignItems: "center" },
  image: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE * 0.8,
  },
  abbreviation: { width: 45, marginLeft: 3, marginRight: 8 },
});

export default WelcomeModal;
