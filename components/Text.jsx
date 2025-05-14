import { StyleSheet, Text as NativeText } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

function Text({ children, style }) {
  const { theme } = useTheme();

  const styles = StyleSheet.flatten([
    {
      color: theme.on_surface,
    },
    style,
  ]);

  return (
    <NativeText style={styles}>{children}</NativeText>
  );
}

export default Text;