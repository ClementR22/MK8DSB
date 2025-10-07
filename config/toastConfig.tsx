import Text from "@/primitiveComponents/Text";
import { View, StyleSheet } from "react-native";

export const toastConfig = {
  info: (props: any) => (
    <View style={styles.toast}>
      <Text role="body" size="medium" inverse>
        {props.text1}
      </Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    width: "90%",
    backgroundColor: "#323232",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 4,
    bottom: 25,
  },
});
