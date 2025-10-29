import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Modal from "@/primitiveComponents/Modal";
import BuildImagesContainer from "./BuildImagesContainer";

interface BuildImagesModalProps {
  classIds: number[];
  isCollapsed: boolean;
}

const BuildImagesModal: React.FC<BuildImagesModalProps> = ({ classIds, isCollapsed }) => {
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
        <BuildImagesContainer classIds={classIds} mode="icon" isCollapsed={isCollapsed} onPress={openModal} />
      </Pressable>

      <Modal
        modalTitle={null}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        onClose={closeModal}
      >
        <BuildImagesContainer classIds={classIds} mode="modal" />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
});

export default React.memo(BuildImagesModal);
