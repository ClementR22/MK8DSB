import React, { useEffect, useState } from "react";
import { useCheckUpdate } from "@/hooks/useCheckUpdate";
import Modal from "@/primitiveComponents/Modal";
import Text from "@/primitiveComponents/Text";

const UpdateAvailableModal = () => {
  const { updateAvailable, openDownloadPage } = useCheckUpdate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => setIsModalVisible(updateAvailable), [updateAvailable]);

  const text = "update";

  return (
    <Modal
      modalTitle="updateAvailable"
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      bottomButtonProps={{ text: text, onPress: openDownloadPage, tooltipText: text }}
    >
      <Text role="body" size="large" weight="regular" textAlign="center" style={{ padding: 20 }} namespace="text">
        updateAvailableText
      </Text>
    </Modal>
  );
};

export default UpdateAvailableModal;
