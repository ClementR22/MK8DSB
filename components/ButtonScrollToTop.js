import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ButtonScrollToTop = ({ scrollToTopWithScrollViewRef }) => {
  const th = useTheme();

  return (
    <Pressable
      style={styles.floatingButton}
      onPress={() => scrollToTopWithScrollViewRef()}
    >
      <MaterialCommunityIcons
        name="chevron-up"
        size={24}
        color={th.on_primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    borderRadius: 50,
    elevation: 5, // Pour l'effet d'ombre sur Android
  },
});

export default ButtonScrollToTop;
