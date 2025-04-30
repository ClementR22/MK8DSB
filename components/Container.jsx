import React from 'react';
import { StyleSheet } from 'react-native';


class Container extends React.Component {
  th = this.props.theme;

  // Custom properties
  containerBackgroundColor = this.props?.containerBackgroundColor ?? 'transparent';
  contentBackgroundColor = this.props?.contentBackgroundColor ?? this.th.surface;
  justifyContent = this.props?.justifyContent ?? 'center';
  flexDirection = this.props?.flexDirection ?? 'column';
  alignItems = this.props?.alignItems ?? 'center';

  inputStyles = this.props?.styles;

  styles = StyleSheet.create({
    container: {
      fontFamily: 'inherit',
      backgroundColor: this.containerBackgroundColor,
      width: '100%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center'
    },
    content: {
      backgroundColor: this.contentBackgroundColor,
      display: 'flex',
      justifyContent: this.justifyContent,
      width: '100%',
      maxWidth: 400,
      margin: 16,
      padding: 10,
      borderRadius: 12,
      gap: 10,
      flexDirection: this.flexDirection,
      alignItems: this.alignItems,
      ...this.inputStyles
    }
  });


  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;