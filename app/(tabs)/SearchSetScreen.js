import SearchSetScreenContent from "../SearchSetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { SearchSetScreenProvider } from "../../utils/SearchSetScreenContext";

const SearchSetScreen = () => {
  return (
    <SearchSetScreenProvider>
      <PressableImagesProvider>
        <SearchSetScreenContent />
      </PressableImagesProvider>
    </SearchSetScreenProvider>
  );
};

export default SearchSetScreen;
