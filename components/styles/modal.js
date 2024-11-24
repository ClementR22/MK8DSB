import { StyleSheet } from "react-native";
import { button } from "./button";
import th, { vh, vw } from "./theme";
import PressableStat from "../PressableStat";

export const modal = StyleSheet.create({
  background: {
    cursor: "auto",
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    maxHeight: 700,
    zIndex: 10,
    cursor: "auto",
    //alignSelf: "center",
    minWidth: 280,
    maxWidth: 0.9 * vw,
    borderRadius: 28,
    paddingVertical: 24,
    backgroundColor: th.surface_container_high,
  },
  content: {
    flex: 1,
    marginBottom: 0,
    maxHeight: vh * 0.5,
    paddingVertical: 10,
    borderTopColor: th.outline,
    borderTopWidth: 1,
    borderBottomColor: th.outline,
    borderBottomWidth: 1,
  },
  title: {
    color: th.on_surface,
    paddingHorizontal: 24,
    fontSize: 24,
    marginBottom: 16,
  },
  title_center: {
    color: th.on_surface,
    alignSelf: "center",
    paddingHorizontal: 24,
    fontSize: 24,
    marginBottom: 0,
  },
  close_button_center: {
    alignSelf: "center",
    width: 100,
  },
  close_button_right: {
    flexGrow: 1,
    alignSelf: "flex-end",
    width: 100,
    marginRight: 24,
  },
  pressableStat: {
    marginBottom: 2,
    marginHorizontal: 24,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 24,
  },
});
