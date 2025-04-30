import React, { cloneElement, isValidElement, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TooltipWrapper = ({tooltipText, children, style}) => {
  const [visible, setVisible] = useState(false);
  const tooltipTimeout = useRef(null);
  const tooltipShown = useRef(false);

  const handleTouchStart = () => {
    tooltipShown.current = false;
    tooltipTimeout.current = setTimeout(() => {
      tooltipShown.current = true;
      setVisible(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    if (tooltipShown.current) {
      setTimeout(() => setVisible(false), 1500);
    }
  };

  const handlePress = (originalPress) => {
    if (!tooltipShown.current && originalPress) {
      originalPress();
    }
  };

  const wrappedChild = isValidElement(children)
    ? cloneElement(children, {
      onPress: children.props?.onPress
        ? () => handlePress(children.props.onPress)
        : undefined,
    })
    : null;

  return (
    <View
      style={[styles.wrapper, style]}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {wrappedChild}

      {visible && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{tooltipText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    marginBottom: 8,
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    maxWidth: 200,
    zIndex: 9999, // met un gros zIndex
    elevation: 10, // pour Android
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
});

export default TooltipWrapper;
