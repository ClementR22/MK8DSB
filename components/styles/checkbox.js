import { StyleSheet } from "react-native";

const checkbox = (theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 24,
    },
    text: {
      color: theme.on_surface,
      fontSize: 18,
      marginVertical: 10,
    },
  });

export default checkbox;
