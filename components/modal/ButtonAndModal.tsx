import React, { useState, useCallback } from "react";
import { GestureResponderEvent, StyleSheet, Text } from "react-native";
import Modal from "@/components/Modal";
import Button from "../Button";
import { translate } from "@/translations/translations";

interface ButtonAndModalProps {
  // Le contenu principal du modal. Peut être un composant, du texte, etc.
  children: React.ReactNode;
  // Permet de passer un titre en dur (string) ou de ne pas avoir de titre (null).
  modalTitle?: string | null;
  // Un élément React personnalisé qui servira de déclencheur pour ouvrir le modal.
  customTrigger?: React.ReactElement<{ onPress?: (event: GestureResponderEvent) => void } & Record<string, any>>;
  // Sinon on utilisera un Button avec le texte donné en props
  triggerButtonText?: string;
  // Fonction à exécuter lorsque le bouton de confirmation du modal est pressé.
  // Utile pour les actions comme la suppression.
  onConfirm?: () => void;
  // Possibilité d'ajouter un bouton supplémentaire dans le modal.
  confirmButtonText?: string;
  // Possibilité changer le texte du bouton fermer.
  closeButtonText?: string;
  // Possibilité d'ajouter un left button
  leftButton?: React.ReactElement;
}

const ButtonAndModal: React.FC<ButtonAndModalProps> = React.memo(
  ({
    children,
    modalTitle = undefined, // Initialisé à undefined pour ne pas passer null par défaut
    customTrigger = undefined,
    triggerButtonText = undefined,
    onConfirm,
    confirmButtonText = undefined,
    closeButtonText = undefined,
    leftButton = undefined,
  }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fonction pour ouvrir le modal
    const openModal = useCallback(() => {
      setIsModalVisible(true);
    }, []);

    // Fonction pour fermer le modal
    const closeModal = useCallback(() => {
      setIsModalVisible(false);
    }, []);

    // Gère l'action de confirmation, si un bouton de confirmation est présent
    const handleConfirm = useCallback(() => {
      if (onConfirm) {
        onConfirm();
      }
      closeModal(); // Ferme le modal après confirmation
    }, [onConfirm, closeModal]);

    const leftButtonForModal = leftButton ? (
      leftButton
    ) : confirmButtonText ? (
      <Button onPress={handleConfirm} tooltipText={undefined}>
        <Text> {translate(confirmButtonText)}</Text>
      </Button>
    ) : undefined;

    // Clonez le customTrigger pour injecter la prop onPress
    const triggerElement = customTrigger ? (
      React.cloneElement(customTrigger, { onPress: openModal })
    ) : (
      <Button onPress={openModal} tooltipText={undefined}>
        {translate(triggerButtonText)}
      </Button>
    );

    return (
      <>
        {triggerElement}

        <Modal
          modalTitle={modalTitle}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          closeButtonText={closeButtonText}
          leftButton={leftButtonForModal}
          onClose={closeModal}
        >
          {children}
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  previewContainer: {
    // Styles partagés si nécessaire
  },
});

export default ButtonAndModal;
