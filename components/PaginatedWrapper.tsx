import React, { useEffect, useRef } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import PagesNavigator from "./elementCompactSelector/PagesNavigator";

interface PaginatedWrapperProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  pageWidth: number;
  renderItem: any;
  totalPages: number;
  flatlistRefProps?: any;
}

const PaginatedWrapper: React.FC<PaginatedWrapperProps> = ({
  currentPage,
  setCurrentPage,
  data,
  pageWidth,
  renderItem,
  totalPages,
  flatlistRefProps,
}) => {
  const flatlistRefAct = flatlistRefProps ?? useRef<FlatList>(null);
  const scrollInProgress = useRef(false);

  useEffect(() => {
    scrollInProgress.current = true;

    flatlistRefAct.current?.scrollToIndex({
      index: currentPage,
      animated: true,
    });
  }, [currentPage]);

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // quand le scroll se finit
    const pageIndex = e.nativeEvent.contentOffset.x / pageWidth;
    // si on est bien arrivé sur une nouvelle page
    if (Number.isInteger(pageIndex)) {
      // on met à jour currentPage
      if (pageIndex != currentPage) setCurrentPage(pageIndex);
    }
  };

  return (
    <>
      <FlatList
        ref={flatlistRefAct}
        data={data}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}`}
        renderItem={renderItem}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        /*     getItemLayout={(data, index) => ({
          length: pageWidth,
          offset: pageWidth * index,
          index,
        })} */
      />

      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  );
};

export default PaginatedWrapper;
