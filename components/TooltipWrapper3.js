import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

const TooltipWrapper = ({
                          tooltipText,
                          style,
                          onPress,
                          placement = 'top',
                          children,
                        }) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    <View style={style ? style : {}}>
      <Tooltip
        isVisible={toolTipVisible}
        content={
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text numberOfLines={1}>{tooltipText}</Text>
            </View>
          </View>
        }
        placement={placement}
        onClose={() => setToolTipVisible(false)}
        backgroundColor="rgba(0,0,0,0)"
        disableShadow={true}
        showChildInTooltip={false}
      >
        <Pressable
          onPress={onPress}
          onLongPress={() => {
            setToolTipVisible(true);
          }}
        >
          {children}
        </Pressable>
      </Tooltip>
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
