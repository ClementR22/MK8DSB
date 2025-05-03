import { StyleSheet } from "react-native";

const checkbox = (theme) =>
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
      backgroundColor: theme.primary,
      margin: 15,
      borderColor: theme.on_surface_variant,
    },
    text: {
      color: theme.on_surface,
      fontSize: 18,
      marginVertical: 10,
    },
  });

export default checkbox;
