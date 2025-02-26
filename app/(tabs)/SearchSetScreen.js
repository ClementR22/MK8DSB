import SearchSetScreenContent from "../SearchSetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { SetsListProvider } from "../../utils/SetsListContext";

const SearchSetScreen = () => {
  return (
    <PressableImagesProvider>
      <SetsListProvider>
        <SearchSetScreenContent />
      </SetsListProvider>
    </PressableImagesProvider>
  );
};

export default SearchSetScreen;
