import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';

import { PressableImagesProvider } from '../../utils/PressableImagesContext';
import ElementsSelector from '../../components/elementsSelector/ElementsSelector';

const GaleryScreen = () => {
  const [showPopover, setShowPopover] = useState(false);

  const touchableRef = useRef();

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  console.log(showPopover);
  const openPopover = () => {
    if (!showPopover) {
      setShowPopover(true);
      setTimeout(() => setShowPopover(false), 2000);
    }
  };

  return (<PressableImagesProvider>
      <View style={styles.container}>
        <ElementsSelector situation="galery" galeryCase={true}/>
      </View>
    </PressableImagesProvider>);
};

export default GaleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  }, title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 16, backgroundColor: 'red', padding: 8, color: 'white',
  }, categoryContainer: {
    backgroundColor: 'green',
  }, classContainer: {
    flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center',
  }, elementContainer: {
    backgroundColor: 'blue', alignItems: 'center',
  },
});
