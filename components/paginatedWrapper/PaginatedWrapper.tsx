import React, { useEffect, useRef, useCallback, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View, ViewStyle } from "react-native";
import PagesNavigator from "./PagesNavigator";
import useGeneralStore from "@/stores/useGeneralStore";

interface PaginatedWrapperProps {
  data: any[];
  pageWidth: number;
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  moreDots?: React.ReactElement[];
  numberOfPages?: number;
  containerStyle?: ViewStyle;
}

const PaginatedWrapper: React.FC<PaginatedWrapperProps> = ({
  data,
  pageWidth,
  renderItem,
  moreDots,
  numberOfPages,
  containerStyle = null,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatlistRef = useRef<FlatList>(null);

  // Reset à la première page quand les données changent
  useEffect(() => {
    if (currentPage !== 0) {
      flatlistRef.current?.scrollToIndex({ index: 0, animated: true });
      setCurrentPage(0);
    }
  }, [data]);

  // Scroll programmatique vers la page courante
  useEffect(() => {
    flatlistRef.current?.scrollToIndex({ index: currentPage, animated: true });
  }, [flatlistRef, currentPage]);

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const pageIndex = e.nativeEvent.contentOffset.x / pageWidth;
      if (Number.isInteger(pageIndex)) {
        // si on est bien arrivé pile sur une page alors on peut mettre à jour la page
        if (pageIndex != currentPage) {
          setCurrentPage(pageIndex);
        }
      }
    },
    [currentPage]
  );

  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  return (
    <View style={containerStyle}>
      <FlatList
        ref={flatlistRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={isScrollEnable}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        // onScroll={handleScroll}
        // Optimisations de performance
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: pageWidth,
          offset: pageWidth * index,
          index,
        })}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews={true}
        // Performance de scroll
        scrollEventThrottle={16}
        decelerationRate="normal"
      />
      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} />
    </View>
  );
};

export default React.memo(PaginatedWrapper);
