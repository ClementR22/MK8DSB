import React, { useEffect, useRef, useCallback, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View, ViewStyle } from "react-native";
import PagesNavigator, { ButtonName } from "./PagesNavigator";
import useGeneralStore from "@/stores/useGeneralStore";

interface PaginatedWrapperProps {
  data: any[];
  pageWidth: number;
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  dotsNamesList?: ButtonName[];
  moreDots?: React.ReactElement[];
  numberOfPages?: number;
  containerStyle?: ViewStyle;
}

const PaginatedWrapper: React.FC<PaginatedWrapperProps> = ({
  data,
  pageWidth,
  renderItem,
  dotsNamesList,
  moreDots,
  numberOfPages,
  containerStyle = null,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatlistRef = useRef<FlatList>(null);
  const scrollStartX = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);
  const isManualScroll = useRef(false);

  // Reset à la première page quand les données changent
  useEffect(() => {
    if (currentPage !== 0) {
      flatlistRef.current?.scrollToIndex({ index: 0, animated: false });
      setCurrentPage(0);
    }
  }, [data]);

  // Scroll programmatique vers la page courante
  useEffect(() => {
    if (!isManualScroll.current) {
      flatlistRef.current?.scrollToIndex({ index: currentPage, animated: true });
    }
  }, [currentPage]);

  // Début du scroll manuel
  const handleScrollBeginDrag = useCallback(() => {
    isManualScroll.current = true;
  }, []);

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / pageWidth);

    if (e.nativeEvent.contentOffset.x / pageWidth === pageIndex) {
      isScrolling.current = false;
      isManualScroll.current = false;

      if (pageIndex != currentPage) {
        setCurrentPage(pageIndex);
      }
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isScrolling.current) {
      isScrolling.current = true;
      scrollStartX.current = e.nativeEvent.contentOffset.x;
    }

    const currentX = e.nativeEvent.contentOffset.x;
    const distanceDiff = currentX - scrollStartX.current;

    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / pageWidth);

    if (Math.abs(distanceDiff) > pageWidth / 2) {
      if (pageIndex != currentPage && isManualScroll.current) {
        setCurrentPage(pageIndex);
      }
    }
  };

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
        onScrollBeginDrag={handleScrollBeginDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={handleScroll}
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
      <PagesNavigator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dotsNamesList={dotsNamesList}
        moreDots={moreDots}
        numberOfPages={numberOfPages}
      />
    </View>
  );
};

export default React.memo(PaginatedWrapper);
