import React, { ReactElement, useCallback, useState } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import Modal from "@/primitiveComponents/Modal";
import Button from "../../primitiveComponents/Button";
import { translate } from "@/translations/translations";

interface ButtonAndModalProps {
  // Le contenu principal du modal. Peut être un composant, du texte, etc.
  children: React.ReactNode;
  // Permet de passer un titre en dur (string) ou de ne pas avoir de titre (null).
  modalTitle?: string | null;
  // Si fournie, la modale est contrôlée de l'extérieur
  isModalVisibleProp?: boolean;
  // Setter pour le contrôle externe
  setIsModalVisibleProp?: (visible: boolean) => void;
  // Un élément React personnalisé qui servira de déclencheur pour ouvrir le modal.
  customTrigger?: React.ReactElement<{ onPress?: (event: GestureResponderEvent) => void } & Record<string, any>>;
  // Sinon on utilisera un Button avec le texte donné en props
  triggerButtonText?: string;
  // Possibilité changer le texte du bouton fermer.
  closeButtonText?: string;
  // can give a componenent
  secondButton?: ReactElement;
  // or props to make it here
  secondButtonProps?: { text: string; onPress: () => void; tooltipText: string };
  closeAfterSecondButton?: boolean;
  secondButtonPosition: "left" | "right";
}

const ButtonAndModal: React.FC<ButtonAndModalProps> = React.memo(
  ({
    children,
    modalTitle = undefined, // Initialisé à undefined pour ne pas passer null par défaut
    isModalVisibleProp, // option
    setIsModalVisibleProp, // option
    customTrigger, // give a component OR
    triggerButtonText, // give just the text
    closeButtonText = undefined,
    secondButton,
    secondButtonProps,
    closeAfterSecondButton,
    secondButtonPosition = "left",
  }) => {
    // État interne pour gérer la visibilité si les props externes ne sont pas fournies
    const [internalIsModalVisible, setInternalIsModalVisible] = useState(false);

    // Détermine la visibilité actuelle de la modale :
    // Si isModalVisibleProp est défini, utilisez-le. Sinon, utilisez l'état interne.
    const currentIsModalVisible = isModalVisibleProp !== undefined ? isModalVisibleProp : internalIsModalVisible;

    // Détermine la fonction de mise à jour de la visibilité :
    // Si setIsModalVisibleProp est défini, utilisez-le. Sinon, utilisez le setter interne.
    const currentSetIsModalVisible =
      setIsModalVisibleProp !== undefined ? setIsModalVisibleProp : setInternalIsModalVisible;

    // Fonction pour ouvrir le modal
    const openModal = useCallback(() => {
      currentSetIsModalVisible(true);
    }, [currentSetIsModalVisible]);

    // Fonction pour fermer le modal
    const closeModal = useCallback(() => {
      currentSetIsModalVisible(false);
    }, [currentSetIsModalVisible]);

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
          isModalVisible={currentIsModalVisible}
          setIsModalVisible={currentSetIsModalVisible}
          closeButtonText={closeButtonText}
          onClose={closeModal} // Assurez-vous que onClose utilise aussi le setter approprié
          secondButton={secondButton}
          secondButtonProps={secondButtonProps}
          closeAfterSecondButton={closeAfterSecondButton}
          secondButtonPosition={secondButtonPosition}
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
