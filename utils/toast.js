import Toast from "react-native-toast-message";

const showToast = (text1 = "Hello", text2 = "Ceci est une alerte temporaire 👋", type = "success") => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    position: "bottom", // Ou 'bottom'
    visibilityTime: 3000, // 3 secondes
  });
};

export default showToast;
