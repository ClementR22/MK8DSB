import { View, Text, StyleSheet } from "react-native";
import App from "../../components/App";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SettingsScreen</Text>
      <App />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
