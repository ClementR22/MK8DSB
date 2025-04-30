import { StyleSheet } from 'react-native';

export const card = (th) =>
  StyleSheet.create({
    container: {
      backgroundColor: th.surface_container_low,
      borderRadius: 12,
      padding: 16,
    },
    text: {
      color: th.on_surface,
    },
  });
