import React from "react";
import { StyleSheet, TextInput } from "react-native";

const MyTextInput = ({ value, onChangeText, onBlur, bluron }) => {
  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      submitBehavior="submit"
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "grey",
  },
});

export default MyTextInput;
