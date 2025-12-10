import React, { memo, ReactElement, useCallback, useState } from "react";
import { GestureResponderEvent } from "react-native";
import Modal from "@/primitiveComponents/Modal";
import Button from "../../primitiveComponents/Button";
import { IconProps } from "@/types";

interface ButtonAndModalProps {
  // Le contenu principal du modal. Peut être un composant, du texte, etc.
  children: React.ReactNode;
  // Couleur du bouton
  buttonColor?: string | null;
  // Couleur du text du bouton
  buttonTextColor?: string | null;
  // Permet de passer un titre en dur (string) ou de ne pas avoir de titre (null).
  modalTitle?: string | null;
  // Si fournie, la modale est contrôlée de l'extérieur
  isModalVisibleProp?: boolean;
  // Setter pour le contrôle externe
  setIsModalVisibleProp?: (visible: boolean) => void;
  // Un élément React personnalisé qui servira de déclencheur pour ouvrir le modal.
  triggerComponent: React.ReactElement<{ onPress?: (event: GestureResponderEvent) => void } & Record<string, any>>;
  // Possibilité changer le texte du bouton fermer.
  closeButtonText?: string;
  // Composant pour le deuxieme bouton
  secondButton?: ReactElement;
  // Type de confirmation demandée
  secondButtonType?: "danger" | null;
  // ou juste ses prps
  secondButtonProps?: {
    text: string;
    onPress: () => void;
    tooltipText: string;
    buttonColor?: string;
    buttonTextColor?: string;
  };
  closeAfterSecondButton?: boolean;
  secondButtonPosition?: "left" | "right";
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

const ButtonAndModal: React.FC<ButtonAndModalProps> = ({
  children,
  buttonColor,
  buttonTextColor,
  modalTitle = undefined, // Initialisé à undefined pour ne pas passer null par défaut
  isModalVisibleProp, // option
  setIsModalVisibleProp, // option
  triggerComponent, // give a component OR
  closeButtonText = undefined,
  secondButton,
  secondButtonProps,
  closeAfterSecondButton,
  secondButtonPosition = "left",
  onModalOpen,
  onModalClose,
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
    onModalOpen && onModalOpen();
    currentSetIsModalVisible(true);
  }, [currentSetIsModalVisible, onModalOpen]);

  // Fonction pour fermer le modal
  const closeModal = useCallback(() => {
    onModalClose && onModalClose();
    currentSetIsModalVisible(false);
  }, [currentSetIsModalVisible, onModalClose]);

  // Clonez le trigger pour injecter la prop onPress
  const triggerComponent_ = React.cloneElement(triggerComponent, { onPress: openModal });

  return (
    <>
      {triggerComponent_}

      <Modal
        key={"Modal-ButtonAndModal"}
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
};

export default memo(ButtonAndModal);
