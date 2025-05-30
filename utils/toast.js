import Snackbar from "./SnackbarManager";

const showToast = (text1 = "Hello", text2 = "Ceci est une alerte temporaire 👋", type = "success") => {
  Snackbar.show("coucou");
  //   {
  //   type: type,
  //   text1: text1,
  //   text2: text2,
  //   position: "bottom", // Ou 'bottom'
  //   visibilityTime: 3000, // 3 secondes
  // });
};

export default showToast;
