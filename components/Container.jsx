import React from "react";
import { StyleSheet, View } from "react-native";

class Container extends React.Component {
  th = this.props.theme;

  containerBackgroundColor =
    this.props?.containerBackgroundColor ?? "transparent";
  contentBackgroundColor =
    this.props?.contentBackgroundColor ?? this.th.surface;
  justifyContent = this.props?.justifyContent ?? "center";
  flexDirection = this.props?.flexDirection ?? "column";
  alignItems = this.props?.alignItems ?? "center";
  gap = this.props?.gap ?? 10;

  inputStyles = this.props?.styles;

  styles = StyleSheet.create({
    container: {
      fontFamily: "inherit",
      backgroundColor: this.containerBackgroundColor,
      width: "100%",
      margin: "auto",
      justifyContent: "center",
    },
    content: {
      backgroundColor: this.contentBackgroundColor,
      justifyContent: this.justifyContent,
      maxWidth: 400,
      margin: 16,
      padding: 10,
      borderRadius: 12,
      gap: this.gap,
      flexDirection: this.flexDirection,
      alignItems: this.alignItems,
      ...this.inputStyles,
    },
  });

  render() {
    return (
      <View style={this.styles.container} id={"ContainerBox"}>
        <View style={this.styles.content} id={"ContainerContent"}>{this.props.children}</View>
      </View>
    );
  }
}

export default Container;
