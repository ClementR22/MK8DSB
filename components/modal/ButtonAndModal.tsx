import React, { memo, useCallback, useState } from "react";
import { GestureResponderEvent } from "react-native";
import Modal, { ModalButtonProps } from "@/primitiveComponents/Modal";

interface ButtonAndModalProps {
  // Permet de passer un titre en dur (string) ou de ne pas avoir de titre (null).
  modalTitle: string | null;
  // Un élément React personnalisé qui servira de déclencheur pour ouvrir le modal.
  triggerComponent: React.ReactElement<{ onPress?: (event: GestureResponderEvent) => void } & Record<string, any>>;
  // Props pour un bouton en bas
  bottomButtonProps?: ModalButtonProps;
  horizontalScroll?: boolean;
  // Le contenu principal du modal. Peut être un composant, du texte, etc.
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

const ButtonAndModal: React.FC<ButtonAndModalProps> = ({
  modalTitle,
  triggerComponent, // give a component OR
  bottomButtonProps,
  horizontalScroll = false,
  children,
  onOpen,
  onClose,
}) => {
  // État interne pour gérer la visibilité si les props externes ne sont pas fournies
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fonction pour ouvrir le modal
  const openModal = useCallback(() => {
    onOpen && onOpen();
    setIsModalVisible(true);
  }, [setIsModalVisible, onOpen]);

  // Clonez le trigger pour injecter la prop onPress
  const triggerComponent_ = React.cloneElement(triggerComponent, { onPress: openModal });

  return (
    <>
      {triggerComponent_}

      <Modal
        key={"Modal-ButtonAndModal"}
        modalTitle={modalTitle}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onClose={onClose}
        bottomButtonProps={bottomButtonProps}
        horizontalScroll={horizontalScroll}
      >
        {children}
      </Modal>
    </>
  );
};

export default memo(ButtonAndModal);
