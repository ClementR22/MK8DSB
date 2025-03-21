import SearchSetScreenContent from "../SearchSetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";

const SearchSetScreen = () => {
  return (
    <PressableImagesProvider>
      <SearchSetScreenContent />
    </PressableImagesProvider>
  );
};

export default SearchSetScreen;
