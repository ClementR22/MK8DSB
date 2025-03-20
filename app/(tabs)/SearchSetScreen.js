import SearchSetScreenContent from "../SearchSetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { SetsListProvider } from "../../utils/SetsListContext";
import { SavedSetModalProvider } from "../../utils/SavedSetModalContext";

const SearchSetScreen = () => {
  return (
    <PressableImagesProvider>
      <SetsListProvider>
        <SavedSetModalProvider>
          <SearchSetScreenContent />
        </SavedSetModalProvider>
      </SetsListProvider>
    </PressableImagesProvider>
  );
};

export default SearchSetScreen;
