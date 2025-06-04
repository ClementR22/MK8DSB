import React from "react";
import ButtonIcon from "../ButtonIcon";
import { Modal, SafeAreaView } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonAndModalForHelp = ({ isHelpModalVisible, setIsHelpModalVisible, children }) => {
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

      <Modal visible={isHelpModalVisible}>
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
          {children}
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ButtonAndModalForHelp;
