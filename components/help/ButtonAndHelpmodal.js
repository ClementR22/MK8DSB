import React, { useState } from "react";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { Modal, SafeAreaView } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";

const ButtonAndHelpmodal = ({ slides }) => {
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

  return (
    <>
      <ButtonIcon
        tooltipText="Help"
        toolTipPlacement="bottom"
        iconName="help-circle"
        iconType={IconType.Feather}
        onPress={() => setIsHelpModalVisible(true)}
        // style={{ backgroundColor: null }}
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
