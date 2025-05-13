import { StyleSheet, View } from "react-native";

function FlexContainer({ children, flexDirection, alignItems, justifyContent, gap, style }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: flexDirection ? flexDirection : "column",
      alignItems: alignItems || "center",
      justifyContent: justifyContent || "center",
      gap: gap ? gap : 0,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

export default FlexContainer;