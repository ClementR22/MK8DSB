import { StyleSheet, View } from "react-native";

export default ({ children, flexDirection, gap }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: flexDirection ? flexDirection : "column",
      gap: gap ? gap : 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
  });

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}