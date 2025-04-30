import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { modal } from './styles/modal'; // Vérifie si modal.background est bien défini ici
import { useTheme } from '../utils/ThemeContext';
import ButtonMultiStateToggle from './ButtonMultiStateToggle';

const MyBottomSheetModal = ({
                              modalTitle,
                              ModalContentsList,
                              contentPropsList,
                              bottomSheetModalRef,
                              setCardActiveIndex = null,
                            }) => {
  const th = useTheme();

  const snapPoints = useMemo(() => ['90%'], []);

  const [orderNumber, setOrderNumber] = useState(0);
  const imagesOrderIconsNames = [
    'sort-numeric-ascending',
    'sort-alphabetical-ascending',
    'sort-alphabetical-descending',
    'graphql',
  ];

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      ref={bottomSheetModalRef}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={modal(th).title_center}>{modalTitle}</Text>
        <ButtonMultiStateToggle
          number={orderNumber}
          setNumber={setOrderNumber}
          iconsNames={imagesOrderIconsNames}
        />
        <View style={{flex: 1, marginBottom: 80}}>
          {ModalContentsList.map((ModalContent, index) => (
            <ModalContent
              key={index}
              {...contentPropsList[index]}
              orderNumber={orderNumber}
            />
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end', // Place le contenu en bas
  },
  contentContainer: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: 'blue', // Changer la couleur pour que le texte se distingue
  },
});

export default MyBottomSheetModal;
