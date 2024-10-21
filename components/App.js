import React from "react";
import { View, Button } from "react-native";
import Toast from "react-native-toast-message";

const App = () => {
  const showToast = () => {
    Toast.show({
      text1: "Hello",
      text2: "This is some text",
    });
  };

  return (
    <View>
      <Button title="Show Toast" onPress={showToast} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default App;
