import { StyleSheet, View } from 'react-native';
import React from 'react';

import { PressableImagesProvider } from '../../utils/PressableImagesContext';
import ElementsSelector from '../../components/elementsSelector/ElementsSelector';

const GaleryScreenContent = () => {
  return (
    <PressableImagesProvider>
      <View style={styles.container}>
        <ElementsSelector situation="galery" galeryCase={true}/>
      </View>
    </PressableImagesProvider>
  );
};

export default GaleryScreenContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    backgroundColor: 'red',
    padding: 8,
    color: 'white'
  },
  categoryContainer: {
    backgroundColor: 'green'
  },
  classContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  elementContainer: {
    backgroundColor: 'blue',
    alignItems: 'center'
  }
});
