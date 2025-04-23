import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';

type TooltipWrapperProps = {
  tooltipText: string;
  children: React.ReactNode;
  style?: ViewStyle; // pour styliser le wrapper si besoin
};

const TooltipWrapper = ({ tooltipText, children, style }: TooltipWrapperProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
      >
        {children}
      </Pressable>

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
    zIndex: 1000,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
});

export default TooltipWrapper;
