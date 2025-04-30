import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { category4Names, elementsAllInfosList } from '../../data/data';
import { translate } from '../../i18n/translations';
import TooltipWrapper from '../TooltipWrapper3';
import MyPopover from '../MyPopover';

const SetImagesContainer = ({setToShowClassIds, mode, displaySetImages}) => {
  const data = category4Names.map((category, index) => {
    return {
      category: translate(category),
      elements: elementsAllInfosList
        .filter(({classId}) => classId === setToShowClassIds[index])
        .map((element) => ({name: element.name, image: element.image})),
    };
  });

  const imageSize = mode === 'icon' ? 40 : 80;

  return (
    <View contentContainerStyle={styles.container}>
      {data.map((item, idx) => (
        <View key={item.category} style={styles.row}>
          <View style={styles.imagesContainer}>
            {item.elements.map(({name, image}, index) =>
              mode === 'icon' ? (
                <TooltipWrapper
                  key={index}
                  tooltipText={name}
                  onPress={() => displaySetImages()}
                >
                  <Image
                    source={image}
                    style={{width: imageSize, height: imageSize}}
                    resizeMode="contain"
                  />
                </TooltipWrapper>
              ) : (
                <MyPopover key={index} popoverText="Saluuuuuuuuuuuuuut">
                  <Image
                    source={image}
                    style={{width: imageSize, height: imageSize}}
                    resizeMode="contain"
                  />
                </MyPopover>
              ),
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default SetImagesContainer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  row: {
    alignItems: 'center',
    padding: 10,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
