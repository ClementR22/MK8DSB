import { Component } from "react";
import { StyleSheet, View } from "react-native";

class FlexContainer extends Component {
  theme = this.props.theme;
  styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      backgroundColor: this.theme.surface,
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        {this.props.children}
      </View>
    );
  }
}

export default FlexContainer;