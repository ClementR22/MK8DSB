import { StyleSheet } from "react-native";
import { button } from "./button";
import { vh, vw } from "./light_theme";

export const modal = StyleSheet.create({
    background: {
        cursor: "auto",
        zIndex: -1,
        position: "absolute",
        width: vw,
        height: vh,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        zIndex: 10,
        cursor: "auto",
        alignSelf: "center",
        minWidth: 280,
        maxWidth: 0.90*vw,
        borderRadius: 28,
        paddingVertical: 24,
        backgroundColor: "#ECE6F0",
    },
    content: {
        marginBottom: 20,
        maxHeight: 300,
        overflow: "scroll",
        alignItems: "flex-start",
        paddingHorizontal: 24,
        borderTopColor: "#000",
        borderTopWidth: 1,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
    },
    title: {
        paddingHorizontal: 24,
        fontSize: 24,
        marginBottom: 16,
    },
    title_center: {
        alignSelf: "center",
        paddingHorizontal: 24,
        fontSize: 24,
        marginBottom: 16,
    },
    close_button_center: {
        flexGrow: 1,
        alignSelf: "center",
        width: 100,
    },
    close_button_right: {
        flexGrow: 1,
        alignSelf: "flex-end",
        width: 100,
        marginRight: 24
    }
})
