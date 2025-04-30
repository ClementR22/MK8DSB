import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSetsList } from '../utils/SetsListContext';

const MyTextInput = ({setToShowName, setCardIndex, situation}) => {
  const defaultName = `Set ${setCardIndex + 1}`;
  const [localName, setLocalName] = useState(setToShowName ?? defaultName);

  const {renameSet} = useSetsList();

  useEffect(() => {
    setLocalName(setToShowName ?? defaultName);
  }, [setToShowName]);

  const handleEndEditing = () => {
    if (!localName.trim()) {
      setLocalName(defaultName); // Évite de mettre un nom vide
      renameSet(null, situation, setCardIndex);
    } else {
      renameSet(localName, situation, setCardIndex);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        value={localName}
        onChangeText={(text) => {
          setLocalName(text);
        }}
        onBlur={() => handleEndEditing()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'grey',
  },
});

export default MyTextInput;
