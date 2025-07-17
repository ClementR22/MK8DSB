import React, { useEffect, useRef, useCallback, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View, ViewStyle, ViewToken } from "react-native";
import PagesNavigator from "./elementCompactSelector/PagesNavigator";

interface PaginatedWrapperProps {
  data: any[];
  pageWidth: number;
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  totalPages: number;
  containerStyle?: ViewStyle;
}

const PaginatedWrapper: React.FC<PaginatedWrapperProps> = ({
  data,
  pageWidth,
  renderItem,
  totalPages,
  containerStyle = null,
}) => {
  // Mémoïsation de la fonction de rendu pour éviter des recréations inutiles
  const memoizedRenderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => renderItem({ item, index }),
    [renderItem]
  );

  const [currentPage, setCurrentPage] = useState(0);

  const flatlistRef = useRef<FlatList>(null);

  // Reset page si la catégorie change
  useEffect(() => {
    flatlistRef.current?.scrollToIndex({
      index: 0,
      animated: false,
    });
    setCurrentPage(0);
  }, [data]);

  // Gestion du scroll vers la page courante
  useEffect(() => {
    flatlistRef.current?.scrollToIndex({
      index: currentPage,
      animated: true,
    });
  }, [currentPage]);

  // Gestion de la fin du scroll
  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const pageIndex = e.nativeEvent.contentOffset.x / pageWidth;
      // si on est bien arrivé sur une nouvelle page
      if (Number.isInteger(pageIndex)) {
        // on met à jour currentPage
        if (pageIndex != currentPage) setCurrentPage(pageIndex);
      }
    },
    [currentPage, pageWidth, setCurrentPage]
  );

  return (
    <View style={containerStyle}>
      <FlatList
        ref={flatlistRef}
        data={data}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={memoizedRenderItem}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: pageWidth,
          offset: pageWidth * index,
          index,
        })}
      />

      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </View>
  );
};

export default React.memo(PaginatedWrapper);
