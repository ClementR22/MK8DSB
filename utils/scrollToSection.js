export const scrollToSection = (scrollViewRef, sectionRef, animated = true) => {
  sectionRef.current?.measureLayout(
    scrollViewRef.current, // Mesurer par rapport à la ScrollView
    (x, y) => {
      scrollViewRef.current?.scrollTo({ y, animated: animated });
    },
    (error) => {
      console.error("Erreur de mesure :", error);
    }
  );
};
