import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import { translateToLanguage } from "@/translations/translations";
import { bodyTypeNames } from "@/data/data";
import ElementsView from "./ElementsView";
import { useLanguageStore } from "@/stores/useLanguageStore";

const BodyTabContent = ({ bodyElementsByBodyType, handlePress, isGalleryMode, sectionRefs, handleScrollToSection }) => {
  const language = useLanguageStore((state) => state.language);

  return (
    <>
      <View style={styles.bodyTypeBookmarksContainer}>
        {bodyTypeNames.map((bodyTypeName) => (
          <Button key={bodyTypeName} onPress={() => handleScrollToSection(bodyTypeName)}>
            <Text>{translateToLanguage(bodyTypeName, language)}</Text>
          </Button>
        ))}
      </View>

      {Object.entries(bodyElementsByBodyType).map(([bodyTypeName, bodyTypeElements]) => {
        return (
          <View key={bodyTypeName} ref={(el) => (sectionRefs.current[bodyTypeName] = el)}>
            <Text style={styles.bodyTypeTitle}>{translateToLanguage(bodyTypeName, language)}</Text>
            <ElementsView elements={bodyTypeElements} handlePress={handlePress} isGalleryMode={isGalleryMode} />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  bodyTypeBookmarksContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  bodyTypeTitle: { flex: 1, backgroundColor: "white" },
});

export default React.memo(BodyTabContent);
