import { StyleSheet } from "react-native";
import th from "./theme";

export default checkbox = (th) =>
  StyleSheet.create({
    container: {
      marginBottom: 2,
      alignItems: "center",
      flexDirection: "row",
      borderRadius: 24,
    },
    square: {
      width: 18,
      height: 18,
      backgroundColor: th.primary,
      margin: 15,
      borderColor: th.on_surface_variant,
    },
    text: {
      color: th.on_surface,
      fontSize: 18,
      marginVertical: 10,
    },
  });
