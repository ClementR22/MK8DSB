import React, { useState } from "react";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "../helpComponents/HelpModal";

interface ButtonAndHelpmodalProps {
  slides: React.JSX.Element[];
}

const ButtonAndHelpmodal = ({ slides }: ButtonAndHelpmodalProps) => {
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

  return (
    <>
      <ButtonIcon
        tooltipText="Help"
        toolTipPlacement="bottom"
        iconName="help-circle"
        iconType={IconType.Feather}
        onPress={() => setIsHelpModalVisible(true)}
      />

      <Modal visible={isHelpModalVisible} navigationBarTranslucent={true} statusBarTranslucent={true}>
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
          <HelpModal slides={slides} setIsHelpModalVisible={setIsHelpModalVisible} />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ButtonAndHelpmodal;
