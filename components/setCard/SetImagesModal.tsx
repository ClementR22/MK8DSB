import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Modal from "@/primitiveComponents/Modal";
import SetImagesContainer from "./SetImagesContainer";

interface SetImagesModalProps {
  setToShowClassIds: number[];
  isCollapsed: boolean;
}

const SetImagesModal: React.FC<SetImagesModalProps> = ({ setToShowClassIds, isCollapsed }) => {
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
        <SetImagesContainer
          setToShowClassIds={setToShowClassIds}
          mode="icon"
          isCollapsed={isCollapsed}
          onPress={openModal}
        />
      </Pressable>

      <Modal
        modalTitle={null}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        onClose={closeModal}
      >
        <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="modal" />
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
