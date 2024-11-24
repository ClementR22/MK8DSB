import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const SlideUpPage = () => {
  const [visible, setVisible] = useState(false);
  const translateY = new Animated.Value(Dimensions.get("screen").height); // Position initiale

  const openModal = () => {
    setVisible(true);
    Animated.timing(translateY, {
      toValue: 0, // Arriver à la position finale (en haut)
      duration: 300, // Durée de l'animation
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: Dimensions.get("screen").height, // Retour en bas
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false)); // Ferme le Modal une fois l'animation terminée
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Ouvrir la page</Text>
      </Pressable>

      <Modal transparent visible={visible} animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY }] }]}
          >
            <Text style={styles.modalText}>Ceci est une page qui glisse !</Text>
            <Pressable style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Fermer</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: "40%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

export default SlideUpPage;
