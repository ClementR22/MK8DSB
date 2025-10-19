import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Modal from "@/primitiveComponents/Modal";
import SetImagesContainer from "./SetImagesContainer";

interface SetImagesModalProps {
  classIds: number[];
  isCollapsed: boolean;
}

const SetImagesModal: React.FC<SetImagesModalProps> = ({ classIds, isCollapsed }) => {
  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsImagesModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsImagesModalVisible(false);
  }, []);

  return (
    <>
      <Pressable onPress={openModal} style={styles.pressable}>
        <SetImagesContainer classIds={classIds} mode="icon" isCollapsed={isCollapsed} onPress={openModal} />
      </Pressable>

      <Modal
        modalTitle={null}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        onClose={closeModal}
      >
        <SetImagesContainer classIds={classIds} mode="modal" />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
});

export default React.memo(SetImagesModal);
