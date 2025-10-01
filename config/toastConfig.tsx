/**
 * Configuration personnalisée pour react-native-toast-message
 * Style snackbar grise simple
 */

import { Text, View, StyleSheet } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <View style={styles.snackbar}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),
  error: (props: any) => (
    <View style={styles.snackbar}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),
  info: (props: any) => (
    <View style={styles.snackbar}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  snackbar: {
    width: "90%",
    backgroundColor: "#323232",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
  },
});
